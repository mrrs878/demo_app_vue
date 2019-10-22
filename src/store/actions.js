export default {
  updateTrack (store, data) {
    store.commit('update', { target: store.state.track, data })
  }
}
