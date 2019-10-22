import store from '@/store/index'

class Track {
  constructor (name = '', url = '', artist = '') {
    this.name = name
    this.url = url
    this.artist = artist
  }

  updateInfo (data) {
    store.dispatch('updateTrack', data).then(r => {})
  }
}

export default Track
