<template lang="pug">
    .tm-editor__info.tm-editor__panel
        h5.uk-h5.uk-margin-bottom Параметры заказа
        .tm-editor__info-item.uk-flex.uk-flex-between
            span.tm-editor__info-title.uk-text-muted Артикул
            span.tm-editor__info-value {{ article }}
        .tm-editor__info-item.uk-flex.uk-flex-between
            span.tm-editor__info-title.uk-text-muted Ширина
            span.tm-editor__info-value {{ width }} см
        .tm-editor__info-item.uk-flex.uk-flex-between
            span.tm-editor__info-title.uk-text-muted Высота
            span.tm-editor__info-value {{ height }} см
        .tm-editor__info-item.uk-flex.uk-flex-between
            span.tm-editor__info-title.uk-text-muted Отражение
            span.tm-editor__info-value {{ flip ? 'Да' : '-'}}
        .tm-editor__info-item.uk-flex.uk-flex-between
            span.tm-editor__info-title.uk-text-muted Эффекты
            span.tm-editor__info-value {{ colorEffect }}
        .tm-editor__info-item.uk-flex.uk-flex-between
            span.tm-editor__info-title.uk-text-muted Фактура
            span.tm-editor__info-value {{ texture }}
</template>

<script>
export default {
  name: 'EditorInfo',
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
    flip: {
      type: Boolean,
      default: false
    },
    colorEffect: {
      type: String,
      default: ''
    },
    texture: {
      type: String,
      default: ''
    }
  }
}
</script>
