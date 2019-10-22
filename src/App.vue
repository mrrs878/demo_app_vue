<template>
  <div id="app">
    <router-view/>
    <audio ref="audio" id="player" autoplay :src="player.src"></audio>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['track', 'player'])
  },
  methods: {
    audioOnCanPlay () {
      this.player.updateInfo({ status: true })
    }
  },
  mounted () {
    let audio = document.getElementById('player')
    audio.oncanplay = this.audioOnCanPlay
    audio.autoplay = true
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.32rem;
}
</style>
