<template>
  <div>
    <m-header :title-position="false" left-icon="menu" title="云音乐" :custom-style="customStyle">
      <m-icon icon-class="search" fill-color="#fff" />
    </m-header>
    <van-tabs background="#d44439" title-active-color="#fff" title-inactive-color="#fff" :animated="true" v-model="activeTab">
      <van-tab title="推荐">
        <m-scroll style="height: calc(100vh - 1rem);">
          <div style="position: relative; min-height: calc(100vh);">
            <div class="swipe-container">
              <div class="before"></div>
              <van-swipe indicator-color="white" style="height: 200px" :loop="false" @change="handleSwipeChange">
                <van-swipe-item v-for="(image, index) in banners" class="swipe-item" :class="{'active' : index === currentSwipeIndex}" :style="{ backgroundImage: `url(${ image.pic })` }" :key="index"></van-swipe-item>
              </van-swipe>
            </div>
            <div class="resource-container">
              <div class="resource-item" :class="{ center: index % 3 === 1 }" v-for="(item, index) in resource" :key="index">
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
        <m-scroll :scroll-x="true" style="width: calc(100vw - 1rem)">
          <div>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
            <span>1111111111111111111</span>
          </div>
        </m-scroll>
      </van-tab>
      <van-tab title="排行榜">
        <m-scroll :scroll-x="true">
          <div>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
            <p>1111111111111111111</p>
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

export default {
  name: 'recommend',
  data: () => {
    return {
      customStyle: {
        titleColor: '#fff'
      },
      activeTab: 0,
      currentSwipeIndex: 0,
      banners: [],
      resource: []
    }
  },
  methods: {
    handleSwipeChange (index) {
      this.currentSwipeIndex = index
    }
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
  }
}
</script>
<style scoped lang="less">
  @import '~@/assets/less/mainStyle.less';
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
</style>
