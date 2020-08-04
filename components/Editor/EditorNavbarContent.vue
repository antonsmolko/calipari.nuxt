<template lang="pug">
    .uk-container.uk-container-expand
        nav(data-uk-navbar)
            .uk-navbar-left
                .uk-navbar-item
                    span.tm-logo.uk-logo.uk-icon.uk-margin-small-right(data-uk-icon="calipari")
                    h1.uk-h4.uk-margin-remove.uk-text-muted Редактор
            .uk-navbar-right
                .uk-navbar-item
                    button.uk-close(type='button', data-uk-close, @click='onClose')
</template>

<script>
import closeEditorMethods from '~/components/mixins/closeEditorMethods'
export default {
  name: 'EditorNavbarContent',
  mixins: [closeEditorMethods]
}
</script>

<style lang="scss" scoped>
.tm-logo {
  width: 72px;
  height: 24px;
  margin-top: 4px;
  @include media-desk($m) {
    width: 60px;
    height: 20px;
    margin-top: 3px;
  }
}
</style>
