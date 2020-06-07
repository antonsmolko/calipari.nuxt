<template lang="pug">
    .tm-filter
        TopBar(title="Фильтр")
            .uk-navbar-item(class="uk-visible@l")
                button.uk-button.uk-button-small.uk-button-primary.uk-margin-small-right(
                    :disabled="!isSelectedDiff"
                    @click.prevent="apply") Применить
                button.uk-button.uk-button-small.uk-button-danger(
                    :disabled="!selectedQty"
                    @click.prevent="reset") Сбросить
            SlideYDownTransition
                .uk-navbar-item
                    span.tm-topbar__control.uk-icon-link(data-uk-icon="close" @click.prevent="close")
        ul(data-uk-scrollspy="cls: uk-animation-slide-bottom-small; delay: 250"
            data-uk-accordion="content: .uk-accordion-content; toggle: .uk-accordion-title")
            ImageFilterSection(
                title="По формату"
                field="formats"
                @toggle="handleFieldToggle")
                template(v-if="fields.formats.length")
                    ImageFilterItem(
                        v-for="format in fields.formats"
                        :key="format.id"
                        :value="format.id"
                        :filter="format"
                        filterField="formats"
                        type="icon"
                        @toggle="filterFieldToggle({ field: 'formats', value: $event })")
            ImageFilterSection(
                title="По тэгам"
                field="tags"
                css="tm-filter__section-muted"
                @toggle="handleFieldToggle")
                template(v-if="fields.tags.length")
                    ImageFilterItem(
                        v-for="tag in fields.tags"
                        :key="tag.id"
                        :value="tag.id"
                        :filter="tag"
                        filterField="tags"
                        @toggle="filterFieldToggle({ field: 'tags', value: $event })")
                //span.uk-text-lead(v-else) —
            ImageFilterSection(
                title="По темам"
                field="topics"
                @toggle="handleFieldToggle")
                template(v-if="fields.topics.length")
                    ImageFilterItem(
                        v-for="topic in fields.topics"
                        :key="topic.id"
                        :value="topic.id"
                        :filter="topic"
                        filterField="topics"
                        type="image"
                        @toggle="filterFieldToggle({ field: 'topics', value: $event })")
                //span.uk-text-lead(v-else) —
            ImageFilterSection(
                title="По цветам"
                field="colors"
                css="tm-filter__section-muted"
                @toggle="handleFieldToggle")
                template(v-if="fields.colors.length")
                    ImageFilterItem(
                        v-for="color in fields.colors"
                        :key="color.id"
                        :value="color.id"
                        :filter="color"
                        filterField="colors"
                        type="color"
                        @toggle="filterFieldToggle({ field: 'colors', value: $event })")
                //span.uk-text-lead(v-else) —
            ImageFilterSection(
                title="По интерьерам"
                field="interiors"
                @toggle="handleFieldToggle")
                template(v-if="fields.interiors.length")
                    ImageFilterItem(
                        v-for="interior in fields.interiors"
                        :key="interior.id"
                        :value="interior.id"
                        :filter="interior"
                        filterField="interiors"
                        type="image"
                        @toggle="filterFieldToggle({ field: 'interiors', value: $event })")
                //span.uk-text-lead(v-else) —
        SlideYDownTransition(mode="out-in" v-show="!bottomBar")
            ServiceBottomBar
                .uk-navbar-center
                    .uk-navbar-item(v-if="isSelectedDiff")
                        button.uk-button.uk-button-small.uk-button-primary(
                            @click.prevent="apply") Применить
                    .uk-navbar-item(v-if="selectedQty")
                        button.uk-button.uk-button-small.uk-button-danger(
                            @click.prevent="reset") Сбросить
                .uk-navbar-center(v-if="!selectedQty && !isSelectedDiff")
                    .uk-navbar-item
                        button.uk-button.uk-button-small.uk-button-default(
                            @click.prevent="close") Закрыть
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ImageFilterSection from './ImageFilterSection'
import ImageFilterItem from './ImageFilterItem'
import TopBar from '~/components/layout/TopBar'
import ServiceBottomBar from '~/components/layout/ServiceBottomBar'

export default {
  name: 'Filters',
  components: {
    ServiceBottomBar,
    ImageFilterSection,
    ImageFilterItem,
    TopBar
  },
  scrollToTop: true,
  props: {
    mode: {
      type: String,
      default: 'category'
    },
    keyValue: {
      type: [Number, Array],
      default: () => null
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    responseData: false,
    activeField: null
  }),
  computed: {
    ...mapState('filter', {
      fields: state => state.fields
    }),
    ...mapGetters('filter', [
      'isSelectedDiff',
      'selectedQty'
    ]),
    filterRestrictiveElement () {
      return this.mode === 'imageKeys'
        ? { restrictive_keys: this.keyValue }
        : { [`restrictive_${this.mode}`]: this.keyValue }
    },
    url () {
      if (!this.backgroundPath) {
        return ''
      }

      return `${process.env.baseUrl}/image/grayscale/${this.backgroundPath}`
    }
  },
  async created () {
    this.setFieldsAction({ footer: false })
    await this.syncSelectedFiltersAction()
    this.responseData = true
  },
  methods: {
    ...mapActions('filter', {
      getFiltersAction: 'getFilters',
      toggleSelectedAction: 'toggleSelected',
      clearSelectedAction: 'clearSelected',
      syncSelectedFiltersAction: 'syncSelected',
      syncCurrentsFiltersAction: 'syncCurrents'
    }),
    apply () {
      this.syncCurrentsFiltersAction()
      this.$emit('filter')
    },
    reset () {
      this.clearSelectedAction()
      if (this.activeField) {
        this.getFilters(this.activeField)
      }
    },
    close () {
      this.$emit('close')
    },
    filterFieldToggle ({ field, value }) {
      this.toggleSelectedAction({ field, value })
    },
    getFilters (condition) {
      this.getFiltersAction({
        restrictiveElement: this.filterRestrictiveElement,
        condition
      })
    },
    handleFieldToggle (field) {
      if (this.activeField !== field) {
        this.activeField = field
        this.getFilters(field)
      }
    }
  }
}
</script>

<style lang="scss">
.tm-filter {
    .uk-accordion > :nth-child(n+2) {
        margin-top: 0;
    }
}
.tm-filter {
    & + .tm-category__background {
        background: rgba(#000, .08);
        width: 100%;
        animation: width-squeeze-0 .25s ease-in-out forwards;
        @include media-mob($m) {
            width: 100%;
            animation: width-squeeze .25s ease-in-out forwards;
        }
    }
}
@keyframes width-squeeze {
    from {
        width: 100%;
    }
    to {
        width: calc(50% - #{$global-medium-margin});
    }
}
@keyframes width-squeeze-0 {
    from {
        width: 100%;
    }
    to {
        width: 0;
    }
}
//&::before {
//    content: '';
//    position: fixed;
//    display: block;
//    height: 100vh;
//    width: calc(50vw - #{$global-medium-margin});
//    top: 0;
//    bottom: 0;
//    left: 0;
//    right: 0;
//    z-index: 0;
//    will-change: background;
//    background-image: url('/img/bg/bg-megapolice.jpg');
//    background-repeat: no-repeat;
//    background-position: 40%;
//    background-size: cover;
//    opacity: 0;
//    animation: fade-in 1.5s ease forwards;
//}
@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: .2;
    }
}
</style>
