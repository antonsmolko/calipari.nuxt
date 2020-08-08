<template lang="pug">
  .tm-editor__texture.tm-editor__panel.uk-light(data-uk-filter="target: .js-filter")
    .tm-editor__texture-header.uk-flex.uk-flex-middle.uk-margin-small-bottom
      h6.uk-h6.uk-margin-remove Фактуры
      .tm-editor__texture-filter-controls.uk-background-secondary.uk-margin-small-left
        .uk-grid-small.uk-grid-divider.uk-child-width-auto.uk-text-small(data-uk-grid)
          div
            ul.uk-subnav(data-uk-margin)
              li.uk-active(data-uk-filter-control="" @click="handleFilter")
                a(href="#") Все
          div
            ul.uk-subnav(data-uk-margin)
              li(data-uk-filter-control="[data-seamless='0']" @click="handleFilter('stripes')")
                a(href="#") Шовные
          div
            ul.uk-subnav(data-uk-margin)
              li(data-uk-filter-control="[data-seamless='1']" @click="handleFilter('seamless')")
                a(href="#") Безшовные
    .tm-editor__left-bar-slider.uk-position-relative.uk-visible-toggle.uk-light(
      id="texture-slider"
      tabindex="-1"
      v-if="!filtering"
      data-uk-slider="finite: true"
      data-uk-scrollspy="cls: uk-animation-slide-right-medium; delay: 500")
      ul.uk-grid.uk-grid-small.uk-slider-items.js-filter(data-uk-grid)
        editor-texture-item(
          v-for="item in filteringItems"
          :key="item.id"
          :item="item"
          v-model="activeItem"
          @click="onClick")
</template>

<script>
import debounce from 'lodash/debounce'
import EditorPanelHeading from './EditorPanelHeading'
import EditorTextureItem from './EditorTextureItem'
const _debounce = debounce(fn => fn(), 1)

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
    activeItem: null,
    filterControl: null,
    slider: null,
    filtering: false
  }),
  computed: {
    filteringItems () {
      switch (this.filterControl) {
        case 'stripes':
          return this.items.filter(item => item.seamless === 0)
        case 'seamless':
          return this.items.filter(item => item.seamless === 1)
        default:
          return this.items
      }
    }
  },
  created () {
    this.activeItem = this.model
  },
  methods: {
    onClick () {
      this.$emit('click', this.activeItem)
    },
    toggleFilter () {
      this.filtering = !this.filtering
    },
    handleFilter (filterControl = null) {
      this.toggleFilter()
      this.filterControl = filterControl
      _debounce(this.toggleFilter)
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
    height: 172px;
    @include media-mob($se) {
      height: 187px;
    }
    @include media-mob($s) {
      height: 167px;
    }
    @include media-mob($l) {
      height: inherit;
    }

    &-filter-controls {
      padding: 2px 10px;
      border-radius: 2px;
    }

    &-item {
      cursor: pointer;
      width: 75px !important;
      @include media_mob($se) {
        width: 90px !important;
      }
      @include media_mob($s) {
        width: 70px !important;
      }
      @include media_mob($xxl) {
        width: 90px !important;
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
