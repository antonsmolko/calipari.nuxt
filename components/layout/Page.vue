<template lang="pug">
    div
        slot(name="main")
        Footer(v-if="footer")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Page',
  computed: {
    ...mapState({
      footer: state => state.footer
    })
  }
}
</script>
