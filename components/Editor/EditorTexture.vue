<template lang="pug">
    .tm-editor__texture.tm-editor__panel.uk-light
        editor-panel-heading(title="Фактуры")
        .tm-editor__left-bar-slider.uk-position-relative.uk-visible-toggle.uk-light(
            tabindex="-1"
            data-uk-slider="finite: true"
            data-uk-scrollspy="cls: uk-animation-slide-right-medium; delay: 500")
            ul.uk-grid.uk-grid-small.uk-slider-items(data-uk-grid)
                editor-texture-item(
                    v-for="item in items"
                    :key="item.id"
                    :item="item"
                    v-model="activeItem"
                    @click="onClick")
            //ul.uk-slider-nav.uk-dotnav.uk-flex-center.uk-margin
</template>

<script>
import EditorPanelHeading from './EditorPanelHeading'
import EditorTextureItem from './EditorTextureItem'
export default {
  name: 'EditorTexture',
  components: {
    EditorPanelHeading,
    EditorTextureItem
  },
  model: {
    prop: 'model',
    event: 'click'
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    model: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    activeItem: null
  }),
  created () {
    this.activeItem = this.model
  },
  methods: {
    onClick () {
      this.$emit('click', this.activeItem)
    }
  }
}
</script>

<style lang="scss">
.tm-editor {

/* Texture
========================================================================== */

    &__texture {
        flex-grow: 1;
        padding-right: 0 !important;

        &-item {
            cursor: pointer;
            width: 25%;
            @include media_mob($s) {
                width: 70px;
            }
            @include media_mob($xxl) {
                width: 90px;
            }

            > .active, &:hover {
                opacity: 1;

                .tm-editor__texture-thumb {
                    opacity: 1;
                }

                .tm-editor__texture-title {
                    color: #fff;
                }
            }
        }

        &-thumb {
            display: block;
            width: 100%;
            height: auto;
            opacity: .5;
            transition: opacity .25s ease;
        }

        &-title {
            display: block;
            transition: color .25s ease;
            font-size: $global-small-font-size;
            margin-top: 5px;
        }
    }
}
</style>
