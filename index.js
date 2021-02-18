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

export default {
  install: function (Vue, options = {}) {
    Vue.component('VConfirmBtn', VConfirmBtn)
    Vue.component('VDarkmodeToggle', VDarkmodeToggle)
    Vue.component('VFullscreenToggle', VFullscreenToggle)
    Vue.component('VAccountDialog', VAccountDialog)
    Vue.component('VAccountMenu', VAccountMenu)
    Vue.component('VAccountForm', VAccountForm)
    Vue.component('VLoginForm', VLoginForm)
    Vue.component('VSignupForm', VSignupForm)
  }
}
