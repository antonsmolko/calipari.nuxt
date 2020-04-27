<template lang="pug">
  transition(name="fade" mode="out-in")
    .tm-login.uk-background-cover(style="background-image: url('/img/bg/areas/bg-area-01.jpg')")
      Navbar
      main
        nuxt
      Footer
</template>
<script>
// import { mapState } from 'vuex'

// import notifications from '~/components/mixins/notifications'

export default {
  middleware: ['guest', 'clearValidationErrors']
  // mixins: [notifications]
}
</script>
