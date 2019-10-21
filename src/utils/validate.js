export default class Validate {
  constructor () {
    this.ERROR_MSG = '校验失败'
    this.errorMsgS = new Map([
      ['userName', '用户名输入有误，请确认'],
      ['phone', '手机号输入有误，请确认'],
      ['password', '密码输入有误，请确认'],
      ['cfmPassword', '两次输入的密码不一致，请确认'],
      ['email', '邮箱输入有误，请确认'],
      ['code', '验证码输入有误，请确认']
    ])
    this.rules = new Map([
      ['userName', /^1[356789]\d{9}$/],
      ['phone', /^1[356789]\d{9}$/],
      [
        'password',
        /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{6,16}$/
      ],
      ['email', /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/],
      ['code', /^\d{4}$/]
    ])
  }
  validate (key, val, others = {}) {
    return new Promise((resolve, reject) => {
      let res = false
      if (Reflect.has(others, 'exp')) res = new RegExp(others.exp).test(val)
      else res = this.rules.get(key).test(val)
      if (res) resolve(true)
      else {
        uni.showToast({
					title: others.errorMsg ||
            this.errorMsgS.get(key) ||
            `${key}${this.ERROR_MSG}`,
					icon:"none"
				})
        reject(this.ERROR_MSG)
      }
    })
  }
}
