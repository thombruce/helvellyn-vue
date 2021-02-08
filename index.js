import gun from './services/gun'
import db from './services/db'
import user from './services/user'
import userDb from './services/userDb'

import {
  VConfirmBtn,
  VDarkmodeToggle,
  VFullscreenToggle,
  VAccountDialog,
  VAccountMenu,
  VAccountForm,
  VLoginForm,
  VSignupForm
} from './components'

export { gun, db, user, userDb }

export default {
  install: function (Vue) {
    Vue.component('VConfirmBtn', VConfirmBtn)
    Vue.component('VDarkmodeToggle', VDarkmodeToggle)
    Vue.component('VFullscreenToggle', VFullscreenToggle)
    Vue.component('VAccountDialog', VAccountDialog)
    Vue.component('VAccountMenu', VAccountMenu)
    Vue.component('VAccountForm', VAccountForm)
    Vue.component('VLoginForm', VLoginForm)
    Vue.component('VSignupForm', VSignupForm)

    Vue.prototype.$gun = gun
    Vue.prototype.$db = db
    Vue.prototype.$user = user
    Vue.prototype.$userDb = userDb
  }
}
