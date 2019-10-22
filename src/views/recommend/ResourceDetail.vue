<template>
  <div>
    <m-header title="歌单" :custom-style="customStyle"></m-header>
    <div class="resource-info padding">
      <div class="bg" :style="{ backgroundImage: `url(${ resourceDetail.coverImgUrl })`, transform: `scale(${ bgScale })` }"></div>
      <div class="img" :style="{ backgroundImage: `url(${ resourceDetail.coverImgUrl })` }">{{ resourceDetail.name }}</div>
    </div>
    <m-scroll class="resource-scroll padding" :probe-type="3" :touch-end="true" @scroll="handleResourceScroll" >
      <div>
        <div class="item" v-for="(item, index) in resourceDetail.tracks" :key="index" @click="handleSongClick(item)">
          <p class="index">{{ index + 1 }}</p>
          <div class="info">
            <p class="p">{{ item.name }}</p>
            <p class="p">{{ item.ar[0].name }}</p>
          </div>
          <m-icon class="icon" icon-class="right" fill-color="#c4c4c4"></m-icon>
        </div>
      </div>
    </m-scroll>
    <div class="play-all">
      <m-icon icon-class="yplay" fill-color="#d44439" :size="30" @click="handlePlayAllClick" />
      <span class="text">播放全部 <span class="total">(共{{ resourceDetail.tracks.length }}首)</span>  </span>
      <div class="collection">
        <m-icon icon-class="add" :size="22" :title="`收藏${ Math.floor(resourceDetail.subscribedCount / 10000) }万`"></m-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { AjaxError } from '@/utils/tool'
import { mapState } from 'vuex'

export default {
  name: 'recommendResource',
  data () {
    return {
      resourceDetail: { tracks: [], subscribedCount: 0 },
      bgScale: 1,
      customStyle: {
        bgColor: '#00000000',
        titleColor: '#fff'
      }
    }
  },
  methods: {
    handleResourceScroll (e) {
      let y = e.y + 10 / 10
      this.bgScale = y < 0 ? 1 : (y / 100 + 1)
    },
    handlePlayAllClick () {
      this.player.updateInfo({ playList: this.resourceDetail.tracks, index: 0 })
      this.handleSongClick(this.resourceDetail.tracks[0])
    },
    async handleSongClick (item) {
      this.track.updateInfo({ name: item.name, artist: item.ar[0].name, coverImg: item.al.picUrl })
      try {
        let res = await this.request('getSongUrl', { id: item.id })
        if (res.code !== 200) throw new AjaxError('获取歌曲链接失败')
        this.track.updateInfo(res.data[0])
        this.player.updateInfo({ src: res.data[0].url })
        await this.$router.push(`/player/${item.id}`)
      } catch (e) {
        if (e instanceof AjaxError) this.toast(e.msg)
      }
    },
    async getRecommendResourceDetail () {
      try {
        let res = await this.request('getRecommendResourceDetail', { id: this.$route.params.id })
        if (res.code !== 200) throw new AjaxError('获取歌单详情失败')
        this.resourceDetail = res.playlist
      } catch (e) {
        if (e instanceof AjaxError) this.toast(e.msg)
      }
    }
  },
  created () {
    this.getRecommendResourceDetail()
  },
  computed: {
    ...mapState(['track', 'player'])
  }
}
</script>

<style scoped lang="less">
  @import '~@/assets/less/mainStyle.less';
  .resource-info {
    position: relative;
    display: flex;
    height: 3rem;
    .bg {
      height: 4rem;
      background-size: 100% 100%;
      filter: @filter;
      position: absolute;
      top: -1rem;
      left: 0;
      right: 0;
      z-index: -1;
    }
    .img {
      height: 2rem;
      line-height: 1rem;
      width: 100%;
      background-size: 2rem 2rem;
      background-repeat: no-repeat;
      padding-left: 2.2rem;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .resource-scroll {
    height: calc(100vh - 4rem);
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.2rem;
      .index {
        width: 1rem;
        margin: 0;
      }
      .info {
        flex: 1;
        .p {
          margin: 0.1rem 0;
          &:nth-child(2) {
            color: @textGrayColor;
            font-size: 0.24rem;
          }
        }
      }
    }
  }
  .play-all {
    height: 1rem;
    line-height: 1rem;
    position: fixed;
    bottom: 0;
    left: 0.2rem;
    right: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    .text {
      margin-left: 0.2rem;
      .total {
        color: @textGrayColor;
        font-size: 0.28rem;
      }
      flex: 1;
    }
    .collection {
      height: 1rem;
      width: 2.1rem;
      background-color: @mainColor;
      border-top-left-radius: @borderRadius;
      border-bottom-left-radius: @borderRadius;
    }
  }
</style>
