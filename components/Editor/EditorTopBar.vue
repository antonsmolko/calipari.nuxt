<template lang="pug">
  .tm-editor__top-bar.tm-navbar(data-uk-sticky)
    .tm-navbar__background
    .uk-navbar-container.uk-light.uk-navbar-transparent
      .uk-container.uk-container-expand
        nav(data-uk-navbar)
          .uk-navbar-left
            .uk-navbar-item
              i.tm-logo.uk-logo.uk-icon.uk-margin-small-right(data-uk-icon="calipari")
              h1.uk-h4.uk-margin-remove.uk-text-muted Редактор
          .uk-navbar-right
            .uk-navbar-item
              button.uk-close(type='button', data-uk-icon="icon: close; ratio: 1.1", @click='onClose')
</template>

<script>
export default {
  name: 'EditorTopBar',
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.tm-editor__top-bar {
  &.tm-navbar {
    z-index: 2;
  }
  .tm-logo {
    width: 72px;
    height: 24px;
    margin-top: 4px;
  }
}
</style>
