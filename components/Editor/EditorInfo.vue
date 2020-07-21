<template lang="pug">
    .tm-editor__info.tm-editor__panel
        editor-panel-heading(title="Параметры заказа")
        .tm-editor__info-item.uk-flex.uk-flex-between
            span.tm-editor__info-title.uk-text-muted Артикул
            span.tm-editor__info-value.uk-text-right {{ article }}
        .tm-editor__info-item.uk-flex.uk-flex-between
            span.tm-editor__info-title.uk-text-muted Ширина
            span.tm-editor__info-value.uk-text-right {{ width }} см
        .tm-editor__info-item.uk-flex.uk-flex-between
            span.tm-editor__info-title.uk-text-muted Высота
            span.tm-editor__info-value.uk-text-right {{ height }} см
        .tm-editor__info-item.uk-flex.uk-flex-between
            span.tm-editor__info-title.uk-text-muted Отражение
            span.tm-editor__info-value.uk-text-right {{ flipDetails }}
        .tm-editor__info-item.uk-flex.uk-flex-between
            span.tm-editor__info-title.uk-text-muted Эффекты
            span.tm-editor__info-value.uk-text-right {{ colorEffect }}
        .tm-editor__info-item.uk-flex.uk-flex-between
            span.tm-editor__info-title.uk-text-muted Фактура
            span.tm-editor__info-value.uk-text-right {{ texture }}
</template>

<script>
import EditorPanelHeading from './EditorPanelHeading'
export default {
  name: 'EditorInfo',
  components: {
    EditorPanelHeading
  },
  props: {
    article: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    flipH: {
      type: Boolean,
      default: false
    },
    flipV: {
      type: Boolean,
      default: false
    },
    colorEffect: {
      type: String,
      default: '—'
    },
    texture: {
      type: String,
      default: ''
    }
  },
  computed: {
    flipDetails () {
      const flip = []
      if (this.flipH) {
        flip.push(this.$lib.FILTER_FLIP_H)
      }
      if (this.flipV) {
        flip.push(this.$lib.FILTER_FLIP_V)
      }

      return flip.length ? flip.join(', ') : '—'
    }
  }
}
</script>
