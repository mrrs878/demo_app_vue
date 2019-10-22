import store from '@/store/index'

class Player {
  constructor (src = '') {
    this.src = src
    this.name = ''
    this.status = false
  }
  init (data) {
    store.commit('update', { target: store.state.player, data })
  }
  updateInfo (data) {
    store.commit('update', { target: store.state.player, data })
  }
}

export default Player
