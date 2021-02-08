<template lang="pug">
  VDialog(v-model="dialog" width="500")
    template(v-slot:activator="{ on, attrs }")
      VBtn(
        icon
        v-bind="attrs"
        v-on="on"
      )
        VIcon(v-if="$user.authenticated") mdi-account
        VIcon(v-else) mdi-account-off

    VAccountMenu(v-on:close-dialog="dialog = false")
</template>

<script>
import VAccountMenu from './VAccountDialog/VAccountMenu'

export default {
  components: {
    VAccountMenu
  },

  data () {
    return {
      dialog: false
    }
  }
}

// TODO: Child component(s) should emit 'close-dialog'
//       on certain events such as:
//       - Successful login
//       - Successful sign up
//       - Successful change password
//       Failed events should NOT 'close-dialog'.
</script>
