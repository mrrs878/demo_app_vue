<template>
  <div>
    <m-header :title="track.name" :custom-style="customStyle" />
    <div class="bg" :style="{ backgroundImage: `url(${ track.coverImg })` }"></div>
    <div class="cover-img" :style="{ backgroundImage: `url(${ track.coverImg })`, animationPlayState: player.status ? 'running' : 'paused' }"></div>
    <div class="control" @click="handleControlClick">
      <m-icon icon-class="previousAudio" fill-color="#d44439" :size="40" />
      <m-icon :icon-class="player.status === true ? 'pauseAudio' : 'startAudio'" fill-color="#d44439" :size="40" />
      <m-icon icon-class="nextAudio" fill-color="#d44439" :size="40" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ResourceDetail from '@/views/recommend/ResourceDetail'

const controlStrategy = {
  previousAudio: function () {
    let { index } = this.player
    if (index === 0) {
      this.toast('当前已是第一首歌曲')
      return
    }
    this.player.updateInfo({ index: index - 1 })
    console.log(ResourceDetail)
    ResourceDetail.handleSongClick.call(this, this.player[index])
  },
  pauseAudio: function () {
    this.player.updateInfo({ status: false })
    document.getElementById('player').pause()
  },
  startAudio: function () {
    this.player.updateInfo({ status: true })
    document.getElementById('player').play()
  },
  nextAudio: function () {
    let { index, playList } = this.player
    if (index === playList.length - 1) {
      this.toast('当前已是最后一首歌曲')
      return
    }
    this.player.updateInfo({ index: index + 1 })
    console.log(playList[index])
    ResourceDetail.methods.handleSongClick.call(this, playList[index])
  }
}

export default {
  name: 'player',
  data () {
    return {
      songDetail: {},
      customStyle: {
        bgColor: '#00000000'
      }
    }
  },
  methods: {
    handleControlClick (e) {
      if (e.target.nodeName.toLowerCase() === 'div' || !e.target.childNodes[0]) return
      controlStrategy[e.target.childNodes[0].href.baseVal.split('-')[1]].apply(this)
    }
  },
  created () {
    console.log(this.player)
  },
  computed: {
    ...mapState(['track', 'player'])
  }
}
</script>

<style scoped lang="less">
  @import '~@/assets/less/mainStyle.less';
  .bg {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    background-size: 100% 100%;
    filter: @filter;
  }
  .cover-img {
    height: 60vw;
    width: 60vw;
    margin: 0 auto;
    border-radius: 50%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    animation: rotation 20s linear infinite;
    @keyframes rotation {
      to {
        transform: rotate(0deg);
      }
      from {
        transform: rotate(360deg);
      }
    }
  }
  .control {
    position: fixed;
    bottom: 1rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
  }
</style>
