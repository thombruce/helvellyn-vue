import Vue from 'vue'

import { gun, user } from '../gun'

const store = Vue.observable({
  alias: null,
  authenticated: false,
  errors: {}
})

store.signUp = function (alias, pass) {
  gun.get('~@' + alias).once((data) => {
    if (!data) {
      user.create(alias, pass, (ack) => {
        if (!ack.err) {
          this.login(alias, pass)
        } else {
          this.addError('username', ack.err)
        }
      })
    } else {
      this.addError('username', 'User already exists.')
    }
  })
}

store.login = function (alias, pass) {
  user.auth(alias, pass, (ack) => {
    if (!ack.err) {
      this.afterAuth()
    } else {
      this.addError('username', ack.err)
    }
  })
}

// TODO: onAuth callback
// dispatch('graph/init', null, { root: true })
// dispatch('local/sync', null, { root: true })
store.afterAuth = function () {
  gun.get(user._.soul).once((user) => {
    Vue.set(this, 'alias', user.alias)
    Vue.set(this, 'authenticated', true)
  })
}

store.changePassword = function (alias, pass, newPass) {
  user.auth(alias, pass, (ack) => {
    if (ack.err) this.addError('password', ack.err)
  }, { change: newPass })
}

store.logout = function () {
  user.leave()
  Vue.set(this, 'alias', null)
  Vue.set(this, 'authenticated', false)
}

store.addError = function (key, error) {
  const arr = this.errors[key] || []
  arr.push(error)
  Vue.set(this, 'errors', { [key]: arr })
}

store.clearErrors = function () {
  Vue.set(this, 'errors', {})
}

export default store
