import ajax from '../utils/ajax.js'

const BASE_URL = '/api'
const RECOMMEND_URL = `${ BASE_URL }/recommend`
const PERSONALIZED_URL = `${ BASE_URL }/personalized`
const ARTIST_URL = `${ BASE_URL }/artist`
const TOP_URL = `${ BASE_URL }/top`
const RESOURCE_URL = `${ BASE_URL }/playlist`
const SONG_URL = `${ BASE_URL }/song`

const APIS = {
  getBanners: () => ajax.get(`${ BASE_URL }/banner?type=2`),
  getRecommendResource: () => ajax.get(`${ PERSONALIZED_URL }`),
  getRecommendResourceDetail: params => ajax.get(`${ RESOURCE_URL }/detail?id=${ params.id }`),
  getRecommendSong: () => ajax.get(`${ PERSONALIZED_URL }/newsong`),
  getRecommendResourceLogin: () => ajax.get(`${ RECOMMEND_URL }/resource`),
  getRecommendSongLogin: () => ajax.get(`${ RECOMMEND_URL }/songs`),
  getArtistList: params => ajax.get(`${ ARTIST_URL }/list?cat=${ params.cat }`),
  getTopArtist: params => ajax.get(`${ TOP_URL }/artists?offset=${ params.offset }`),
  getSongUrl: params => ajax.get(`${ SONG_URL }/url?id=${ params.id }`)
}

export function request (name, params) {
  return APIS[name](params).then(res => res).catch(err => console.log(err))
}
