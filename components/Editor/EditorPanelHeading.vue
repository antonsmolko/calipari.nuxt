<template lang="pug">
    h6.uk-h6.uk-margin-small-bottom {{ title }}
</template>

<script>
export default {
  name: 'EditorPanelHeading',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
