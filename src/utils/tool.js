const NOT_COMPARE_PROP = ['__proto__', '__ob__']

export function deepEqual (a = {}, b = {}) {
  if (a === undefined || b === undefined) return false
  let aProps = Object.getOwnPropertyNames(a)
  let bProps = Object.getOwnPropertyNames(b)
  aProps = aProps.filter(prop => !NOT_COMPARE_PROP.includes(prop))
  bProps = bProps.filter(prop => !NOT_COMPARE_PROP.includes(prop))
  if (aProps.length !== bProps.length) return false
  try {
    aProps.forEach(prop => {
      if (a[prop] !== b[prop]) {
        if (typeof a[prop] === 'object') {
          if (!deepEqual(a[prop], b[prop])) throw new Error('not equal')
        } else throw new Error('not equal')
      }
    })
  } catch (error) {
    // console.error(error);
    return false
  }
  return true
}

export function deepCopy (a) {
  return JSON.parse(JSON.stringify(a || ''))
}

export function throttle (cb, delay) {
  let last = 0
  let timer = null
  return function () {
    let context = this
    let args = arguments
    let now = +new Date()
    if (now - last < delay) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        cb.apply(context, args)
      }, delay)
    } else {
      last = now
      cb.apply(context, args)
    }
  }
}

export function subDate (startDate = new Date(), endDate = new Date()) {
  startDate = typeof (startDate) === 'string' ? startDate.replace(/-/g, '/') : startDate
  endDate = typeof (endDate) === 'string' ? endDate.replace(/-/g, '/') : endDate
  let diffTime = new Date(endDate).getTime() - new Date(startDate).getTime()
  let day = Math.floor(diffTime / (24 * 3600 * 1000))
  let hour = Math.floor((diffTime % (24 * 3600 * 1000)) / (3600 * 1000))
  let minute = Math.floor((diffTime % (3600 * 1000)) / (60 * 1000))
  let second = Math.floor((diffTime % (60 * 1000)) / 1000)

  return { day, hour, minute, second }
}

export function scrollBug () {
  let scrollHeight =
    document.documentElement.scrollTop || document.body.scrollTop || 0
  setTimeout(function () {
    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
  }, 150)
}

function getScrollHeight () {
  let bodyScrollHeight = 0
  let documentScrollHeight = 0
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight
  }
  return bodyScrollHeight - documentScrollHeight > 0
    ? bodyScrollHeight
    : documentScrollHeight
}
function getWinHeight () {
  return document.documentElement.clientHeight || document.body.clientHeight
}
function getScrollTop () {
  return document.documentElement.scrollTop || document.body.scrollTop
}

export function scrollResizeEvent (cb) {
  window.onscroll = e => {
    let scrollTop = getScrollTop()
    let scrollToBottom =
      scrollTop >= parseInt(getScrollHeight() - getWinHeight() - 5)
    // eslint-disable-next-line standard/no-callback-literal
    cb({ key: 'scrollStatus', value: scrollTop === 0 ? true : scrollToBottom ? false : undefined })
  }
}

export function jsonp (url, callback) {
  callback = callback || 'callback'
  let result
  return new Promise((resolve, reject) => {
    let overwritten
    let scriptEl = document.createElement('script')
    scriptEl.src = url + '&callback=' + callback
    scriptEl.onload = function () {
      if (overwritten === undefined) {
        delete window[callback]
      } else {
        window[callback] = overwritten
      }
      resolve(result)
    }
    overwritten = window[callback]
    window[callback] = function (data) {
      result = data
    }
    document.head.appendChild(scriptEl)
  })
}

export function isBigScreen () {
  let res = false
  let rate = window.screen.height / window.screen.width
  let limit = window.screen.height === window.screen.availHeight ? 1.8 : 1.65
  if (rate > limit) {
    res = true
  }
  return res
}

export class AjaxError extends Error {
  constructor (msg = '出错啦~') {
    super(msg)
    this.msg = msg
    this.stack = (new Error()).stack
  }
}

export function before (fn) {
  let _self = this
  return function () {
    let res = fn && fn.apply(this, arguments)
    if (!res) return function () {}
    return _self.apply(this, arguments)
  }
}

export function after (fn) {
  let _self = this
  return function () {
    let tmp = _self.apply(this, arguments)
    if (tmp === false) return fn && fn.apply(this, arguments)
    return tmp
  }
}
