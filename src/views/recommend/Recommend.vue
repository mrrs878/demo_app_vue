<template>
  <div>
    <m-header :title-position="false" left-icon="menu" title="云音乐" :custom-style="customStyle">
      <m-icon icon-class="search" fill-color="#fff" />
    </m-header>
    <m-scroll style="height: calc(100vh - 1rem)">
      <div>
        <div class="swipe-container">
          <div class="after"></div>
          <van-swipe indicator-color="white" style="height: 200px" :loop="false" @change="handleSwipeChange">
            <van-swipe-item v-for="(image, index) in banners" class="swipe-item" :class="{'active' : index === currentSwipeIndex}" :style="{ backgroundImage: `url(${ image.pic })` }" :key="index"></van-swipe-item>
          </van-swipe>
        </div>
        <div class="resource-container">
          <div class="resource-item" :class="{ center: index % 3 === 1 }" v-for="(item, index) in resource" :key="index">
            <div class="img" :style="{ backgroundImage:  `url(${ item.picUrl})`}"></div>
            <m-icon class="icon" icon-class="erji" />
            <p class="text">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </m-scroll>
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
    .after {
      position: absolute;
      top: -10rem;
      left: 0;
      right: 0;
      height: 13rem;
      background-color: @mainColor;
      border-bottom-left-radius: @borderRadius;
      border-bottom-right-radius: @borderRadius;
    }
    .swipe-item {
      height: 4rem!important;
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
      height: 4rem;
      width: 32%;
      display: inline-block;
      font-size: 0.24rem;
      position: relative;
      .img {
        height: 3rem;
        background-size: 100% 100%;
      }
      .icon {
        position: absolute;
        right: 0.1rem;
        top: 0.2rem;
      }
      .text {
        height: 0.5rem;
        padding: 0 0.1rem;
      }
      &.center {
        margin: 0 2%;
      }
    }
  }
</style>
