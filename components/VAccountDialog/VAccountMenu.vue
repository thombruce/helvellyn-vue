<template lang="pug">
  VCard
    component(:is="layout" v-on:switch-view="switchView()")
</template>

<script>
import VAccountForm from './VAccountMenu/VAccountForm'
import VLoginForm from './VAccountMenu/VLoginForm'
import VSignupForm from './VAccountMenu/VSignupForm'

export default {
  components: {
    VAccountForm,
    VLoginForm,
    VSignupForm
  },

  data () {
    return {
      loggedOutView: 'login'
    }
  },

  computed: {
    layout () {
      return 'v-' + this.view + '-form'
    },

    view () {
      return this.$user.authenticated ? 'account' : this.loggedOutView
    }
  },

  methods: {
    switchView () {
      this.loggedOutView = this.loggedOutView === 'login' ? 'signup' : 'login'
    }
  }
}
</script>
