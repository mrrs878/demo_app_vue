import Vue from 'vue'

export default {
  update (state, { target, data }) {
    for (let name in data) {
      Vue.set(target, name, data[name])
    }
  }
}
