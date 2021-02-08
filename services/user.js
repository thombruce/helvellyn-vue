import Vue from 'vue'

import gun from './gun'

const proto = gun.user()

const user = Vue.observable(Object.create(proto))

Vue.set(user, 'alias', null)
Vue.set(user, 'authenticated', false)
Vue.set(user, 'errors', {})

// TODO: onAuth callback
// dispatch('graph/init', null, { root: true })
// dispatch('local/sync', null, { root: true })

user.signUp = function (alias, pass) {
  gun.get('~@' + alias).once((data) => {
    if (!data) {
      this.create(alias, pass, (ack) => {
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

user.login = function (alias, pass) {
  this.auth(alias, pass, (ack) => {
    if (!ack.err) {
      this.afterAuth()
    } else {
      this.addError('username', ack.err)
    }
  })
}

user.afterAuth = function () {
  gun.get(this._.soul).once((user) => {
    Vue.set(this, 'alias', user.alias)
    Vue.set(this, 'authenticated', true)
  })
}

user.changePassword = function (alias, pass, newPass) {
  this.auth(alias, pass, (ack) => {
    if (ack.err) this.addError('password', ack.err)
  }, { change: newPass })
}

user.logout = function () {
  this.leave()
  Vue.set(this, 'alias', null)
  Vue.set(this, 'authenticated', false)
}

user.addError = function (key, error) {
  const arr = this.errors[key] || []
  arr.push(error)
  Vue.set(this, 'errors', { [key]: arr })
}

user.clearErrors = function () {
  Vue.set(this, 'errors', {})
}

const recalled = user.recall({ sessionStorage: true }, function () {
  user.afterAuth()
})

export default recalled
