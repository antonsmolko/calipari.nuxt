<template lang="pug">
    div
        slot(name="main")
        Footer(v-if="footer")
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Page',
  computed: {
    ...mapState({
      footer: state => state.footer
    })
  },
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
