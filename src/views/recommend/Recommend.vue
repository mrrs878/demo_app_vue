<template>
  <div class="container">
    <m-header :title-position="false" left-icon="menu" title="云音乐" :custom-style="customStyle">
      <m-icon icon-class="search" fill-color="#fff" />
    </m-header>
    <van-tabs class="tabs-container" background="#d44439" title-active-color="#fff" title-inactive-color="#fff" :animated="true" v-model="activeTab">
      <van-tab title="推荐">
        <m-scroll class="recommend-scroll">
          <div class="recommend">
            <div class="swipe-container">
              <div class="before"></div>
              <van-swipe indicator-color="white" :loop="false" @change="handleSwipeChange">
                <van-swipe-item v-for="(image, index) in banners" class="swipe-item" :class="{'active' : index === currentSwipeIndex}" :style="{ backgroundImage: `url(${ image.pic })` }" :key="index"></van-swipe-item>
              </van-swipe>
            </div>
            <div class="resource-container">
              <div class="resource-item" :class="{ center: index % 3 === 1 }" @click="handlerResourceClick(item.id)" v-for="(item, index) in resource" :key="index">
                <div class="img" :style="{ backgroundImage:  `url(${ item.picUrl})`}"></div>
                <m-icon class="icon" icon-class="erji" :size="14" :title="`${ Math.floor(item.playCount / 10000) }万`" />
                <p class="text">{{ item.name }}</p>
              </div>
            </div>
            <div class="after"></div>
          </div>
        </m-scroll>
      </van-tab>
      <van-tab title="歌手">
        <div class="artist-cat">
          <span class="title">分类(默认热门):</span>
          <m-scroll :scroll-x="true" class="artist-scroll">
            <div class="artist">
              <span class="artist-category" @click="selectCategory = index" :class="{active : index === selectCategory}" v-for="(item, index) in categoryTypes" :key="index">{{ item.name }}</span>
            </div>
          </m-scroll>
        </div>
        <div class="artist-cat">
          <span class="title">首字母:</span>
          <m-scroll :scroll-x="true" class="artist-scroll">
            <div class="artist">
              <span class="artist-category" @click="selectAlpha = index" :class="{ active : index === selectAlpha }" v-for="(item, index) in 26" :key="item">{{ String.fromCharCode(64 + item) }}</span>
            </div>
          </m-scroll>
        </div>
        <div class="artist-container padding">
          <m-scroll class="artist-container-scroll" :pull-up="true" @pullUp="handleArtistsPullUp">
            <div>
              <div class="artist" v-for="(item, index) in artists" :key="index">
                <div class="img" :style="{ backgroundImage:  `url(${ item.picUrl })`}"></div>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </m-scroll>
        </div>
      </van-tab>
      <van-tab title="排行榜">
        <m-scroll :scroll-x="true">
          <div>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
          </div>
        </m-scroll>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { AjaxError } from '@/utils/tool'

const categoryTypes = [
  {
    name: '华语男',
    key: '1001'
  },
  {
    name: '华语女',
    key: '1002'
  },
  {
    name: '华语组合',
    key: '1003'
  },
  {
    name: '欧美男',
    key: '2001'
  },
  {
    name: '欧美女',
    key: '2002'
  },
  {
    name: '欧美组合',
    key: '2003'
  },
  {
    name: '日本男',
    key: '6001'
  },
  {
    name: '日本女',
    key: '6002'
  },
  {
    name: '日本组合',
    key: '6003'
  },
  {
    name: '韩国男',
    key: '7001'
  },
  {
    name: '韩国女',
    key: '7002'
  },
  {
    name: '韩国组合',
    key: '7003'
  },
  {
    name: '其他男歌手',
    key: '4001'
  },
  {
    name: '其他女歌手',
    key: '4002'
  },
  {
    name: '其他组合',
    key: '4003'
  }
]

const tabStrategy = {
  recommend: function () {},
  artists: function () {
    if (this.artists.length !== 0) return
    this.getTopArtist()
  },
  charts: function () {
    if (this.charts.length !== 0) return
    this.getCharts()
  }
}

export default {
  name: 'recommend',
  data: () => {
    return {
      customStyle: {
        titleColor: '#fff'
      },
      categoryTypes,
      tabs: [ 'recommend', 'artists', 'charts' ],
      activeTab: 0,
      currentSwipeIndex: 0,
      banners: [],
      resource: [],
      artists: [],
      selectCategory: -1,
      selectAlpha: -1
    }
  },
  methods: {
    handleSwipeChange (index) {
      this.currentSwipeIndex = index
    },
    handleArtistsPullUp () {
      this.getTopArtist()
    },
    handlerResourceClick (id) {
      this.$router.push(`/resourceDetail/${ id }`)
    },
    async getTopArtist () {
      try {
        let res = await this.request('getTopArtist', { offset: this.artists.length })
        if (res.code !== 200) throw new AjaxError('获取热门歌手失败')
        this.artists = this.artists.concat(res.artists)
      } catch (e) {
        if (e instanceof AjaxError) this.toast(e.msg)
      }
    },
    async getCharts () {}
  },
  async mounted () {
    try {
      let res = await this.request('getBanners')
      if (res.code !== 200) throw new AjaxError('获取banner失败')
      this.banners = res.banners
      res = await this.request('getRecommendResource')
      if (res.code !== 200) throw new AjaxError('获取每日推荐歌单失败')
      this.resource = res.result
    } catch (e) {
      if (e instanceof AjaxError) console.log(e)
    }
  },
  watch: {
    activeTab: {
      handler (newVal) {
        tabStrategy[this.tabs[newVal]].apply(this)
      },
      deep: true
    }
  }
}
</script>
<style scoped lang="less">
  @import '~@/assets/less/mainStyle.less';
  .recommend-scroll {
    height: calc(100vh - 1.9rem);
    .recommend {
      position: relative;
      min-height: calc(100vh);
    }
    .swipe-container {
      position: relative;
      .before {
        position: absolute;
        top: -10rem;
        left: 0;
        right: 0;
        height: 12rem;
        background-color: @mainColor;
        border-bottom-left-radius: @borderRadius;
        border-bottom-right-radius: @borderRadius;
      }
      .van-swipe {
        height: 3rem!important;
      }
      .swipe-item {
        height: 3rem!important;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        box-sizing: border-box;
        margin: 0 auto;
        transform: scale(0.75)!important;
        &.active {
          transform: scale(0.95)!important;
          transition: scale ease 2s;
        }
      }
    }
    .resource-container {
      margin-top: 0.1rem;
      display: flex;
      flex-wrap: wrap;
      .resource-item {
        height: 3.3rem;
        width: 32%;
        display: inline-block;
        font-size: 0.24rem;
        position: relative;
        .img {
          height: 2.5rem;
          background-size: 100% 100%;
        }
        .icon {
          position: absolute;
          right: 0.1rem;
          top: 0.1rem;
        }
        .text {
          padding: 0 0.1rem;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &.center {
          margin: 0 2%;
        }
      }
    }
    .after {
      position: absolute;
      bottom: -5.1rem;
      left: 0;
      right: 0;
      height: 5rem;
      background-color: @mainColor;
    }
  }
  .artist-cat {
    display: flex;
    width: 100vw;
    height: 0.7rem;
    line-height: 0.7rem;
    .title {
      margin: 0 0.1rem 0;
      white-space: nowrap;
    }
    .artist-scroll {
      /*width: calc(100vw);*/
      .artist {
        width: max-content;
        .artist-category {
          border-radius: 5px;
          padding: 0.05rem;
          margin: 0.05rem 0.1rem;
          &.active {
            border: 1px solid @mainColor;
          }
        }
      }
    }
  }
  .artist-container {
    .artist-container-scroll {
      height: calc(100vh - 3.3rem);
      .artist {
        display: flex;
        height: 1rem;
        line-height: 1rem;
        margin-bottom: 0.2rem;
        .img {
          width: 1rem;
          background-size: 100% 100%;
          margin-right: 0.5rem;
        }
      }
    }
  }
</style>
