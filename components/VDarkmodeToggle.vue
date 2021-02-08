<template lang="pug">
VBtn(@click="toggleDarkMode()" icon)
  VIcon(v-if="system") mdi-theme-light-dark
  VIcon(v-else-if="$vuetify.theme.dark") mdi-weather-night
  VIcon(v-else) mdi-weather-sunny
</template>

<script>
export default {
  data () {
    return {
      system: true
    }
  },

  mounted () {
    this.initDarkMode()
  },

  methods: {
    initDarkMode () {
      const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      darkMediaQuery.addEventListener('change', (e) => {
        if (this.system) {
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        }
      })

      if (darkMediaQuery.matches) {
        this.$vuetify.theme.dark = true
      }
    },

    toggleDarkMode () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.system = false
    }
  }
}
</script>
