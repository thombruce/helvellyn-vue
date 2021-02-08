<template lang="pug">
  VForm(:model="user" @submit.prevent="changePassword()")
    VCardTitle.headline
      | Account
    VCardText
      VTextField(
        v-model="user.username"
        label="Username"
        readonly
        hint="This can't be changed."
      )
      h3 Change password
      VTextField(
        v-model="user.password"
        label="Password"
        type="password"
        :error-count="(errors.password && errors.password.length) || 0"
        :error-messages="errors.password"
      )
      VTextField(
        v-model="user.newPassword"
        label="New password"
        type="password"
        hint="Remember, you won't be able to recover your account if you forget this."
      )
    VCardActions
      VSpacer
      VBtn(color="primary" type="submit") Update password
      VBtn(color="error" @click="logout()") Logout
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        newPassword: ''
      }
    }
  },

  computed: {
    errors () {
      return this.$user.errors
    }
  },

  created () {
    this.user.username = this.$user.alias
  },

  beforeDestroy () {
    this.$user.clearErrors()
  },

  methods: {
    logout () {
      this.$user.logout()
    },
    changePassword () {
      this.$user.clearErrors()
      this.$user.changePassword(this.user.username, this.user.password, this.user.newPassword)
    }
  }
}
</script>
