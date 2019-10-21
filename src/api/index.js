import ajax from '../utils/ajax.js'

const BASE_URL = '/api'
const RECOMMEND_URL = `${ BASE_URL }/recommend`
const PERSONALIZED_URL = `${ BASE_URL }/personalized`

const APIS = {
  getBanners: () => ajax.get(`${ BASE_URL }/banner?type=2`),
  getRecommendResource: () => ajax.get(`${ PERSONALIZED_URL }`),
  getRecommendSong: () => ajax.get(`${ PERSONALIZED_URL }/newsong`),
  getRecommendResourceLogin: () => ajax.get(`${ RECOMMEND_URL }/resource`),
  getRecommendSongLogin: () => ajax.get(`${ RECOMMEND_URL }/songs`)
}

export function request (name, params) {
  return APIS[name](params).then(res => res).catch(err => console.log(err))
}
