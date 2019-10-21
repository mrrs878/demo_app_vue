class EventEmit {
  constructor () {
    this.events = []
    this.maxHandlers = 10
  }

  on (_type, _handler) {
    if (this.events[_type]) {
      if (this.events[_type].length >= this.maxHandlers) {
        console.error(`${_type} handlers out of maxHandlers`)
        return
      }
      this.events[_type].push(_handler)
    } else {
      this.events[_type] = [ _handler ]
    }
  }
  addEventListener (_type, _handler) {
    this.on(_type, _handler)
  }
  once (_type, _handler) {
    let wrapper = (..._rest) => {
      _handler.apply(this, _rest)
      this.removeHandler(_type, wrapper)
    }
    this.on(_type, wrapper)
  }
  removeHandler (_type, _handler) {
    if (this.events[_type]) {
      this.events[_type] = this.events[_type].filter(h => h !== _handler)
    }
  }
  removeAllHandler (_type) {
    if (this.events[_type] && Reflect.deleteProperty(this.events, _type)) {
      console.log(`${_type} handlers had all removed`)
    } else {
      console.err(`error when remove all handlers on ${_type}`)
    }
  }
  setMaxHandlers (_maxHandlers) {
    this.maxHandlers = _maxHandlers
  }
  emit (_type, ..._rest) {
    this.events[_type] && this.events[_type].forEach(_handler => _handler.apply(this, _rest))
  }
}

export default EventEmit
