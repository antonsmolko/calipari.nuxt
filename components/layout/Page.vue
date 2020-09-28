<template lang="pug">
  div
    slot(name="main")
    slide-y-down-transition(mode="out-in")
      slot(name="bottom-bar" v-if="bottomBar")
        bottom-bar
    Footer(v-if="footer")
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Page',
  beforeDestroy () {
    this.clearItemFieldsAction()
  },
  methods: {
    ...mapActions('pages', {
      clearItemFieldsAction: 'clearItemFields'
    })
  }
}
</script>
