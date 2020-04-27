<template lang="pug">
    .tm-filter
        TopBar(title="Фильтр")
            .uk-navbar-item(class="uk-visible@l")
                SlideYDownTransition(v-show="isSelectionDifference")
                    button.uk-button.uk-button-small.uk-button-primary.uk-margin-small-right(
                        @click.prevent="apply") Применить
                //SlideYDownTransition(v-show="isSelected")
                button.uk-button.uk-button-small.uk-button-danger(
                    :disabled="!isSelected"
                    @click.prevent="reset") Сбросить
            SlideYDownTransition
                .uk-navbar-item
                    span.tm-topbar__control.uk-icon-link(data-uk-icon="close" @click.prevent="close")
        SlideYDownTransition(v-show="responseData")
            div
                ImageFilterSection(v-if="tags.length" title="По тэгам" css="tm-filter__section-muted")
                    ImageFilterItem(
                        v-for="tag in tags"
                        :key="tag.id"
                        v-model="selected.tags"
                        :value="tag.id"
                        :filter="tag")
                ImageFilterSection(v-if="topics.length" title="По темам")
                    ImageFilterItem(
                        v-for="topic in topics"
                        :key="topic.id"
                        v-model="selected.categories"
                        :value="topic.id"
                        :filter="topic"
                        type="image")
                ImageFilterSection(v-if="colors.length" title="По цветам" css="tm-filter__section-muted")
                    ImageFilterItem(
                        v-for="color in colors"
                        :key="color.id"
                        v-model="selected.categories"
                        :value="color.id"
                        :filter="color"
                        type="color")
                ImageFilterSection(v-if="interiors.length" title="По интерьерам")
                    ImageFilterItem(
                        v-for="interior in interiors"
                        :key="interior.id"
                        v-model="selected.categories"
                        :value="interior.id"
                        :filter="interior"
                        type="image")
        SlideYDownTransition(mode="out-in" v-show="!bottomBar")
            ServiceBottomBar
                .uk-navbar-center
                    .uk-navbar-item(v-if="isSelectionDifference")
                        button.uk-button.uk-button-small.uk-button-primary(
                            @click.prevent="apply") Применить
                    .uk-navbar-item(v-if="isSelected")
                        button.uk-button.uk-button-small.uk-button-danger(
                            @click.prevent="reset") Сбросить
                .uk-navbar-center(v-if="!isSelected && !isSelectionDifference")
                    .uk-navbar-item
                        button.uk-button.uk-button-small.uk-button-default(
                            @click.prevent="close") Закрыть
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { cloneDeep } from 'lodash'
import ImageFilterSection from './ImageFilterSection'
import ImageFilterItem from './ImageFilterItem'
import TopBar from '~/components/layout/TopBar'
import ServiceBottomBar from '~/components/layout/ServiceBottomBar'
import { isDifference } from '~/components/helpers'

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
      required: true
    },
    open: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: () => {
        return {
          tags: [],
          categories: []
        }
      }
    }
  },
  data: () => ({
    responseData: false,
    selected: {
      tags: [],
      categories: []
    },
    prevSelect: {
      tags: [],
      categories: []
    }
  }),
  computed: {
    ...mapState('filter', {
      topics: state => state.topics,
      colors: state => state.colors,
      interiors: state => state.interiors,
      tags: state => state.tags
    }),
    isSelected () {
      return [...this.selected.tags, ...this.selected.categories].length
    },
    isSelectionDifference () {
      const isDiffTags = isDifference(this.selected.tags, this.prevSelect.tags)
      const isDiffCategories = isDifference(this.selected.categories, this.prevSelect.categories)

      return isDiffTags || isDiffCategories
    }
  },
  async created () {
    this.clearFilterAction()
    this.setFieldsAction({ footer: false })

    this.mode === 'wishList'
      ? await this.getFiltersByImagesAction(this.keyValue)
      : await this.getFiltersByCategoryAction(this.keyValue)

    this.selected = cloneDeep(this.value)
    this.prevSelect = cloneDeep(this.value)
    this.responseData = true
  },
  methods: {
    ...mapActions('filter', {
      getFiltersByCategoryAction: 'getFiltersByCategory',
      getFiltersByImagesAction: 'getFiltersByImages',
      clearFilterAction: 'clearFilter'
    }),
    apply () {
      this.$emit('filter', this.selected)
    },
    reset () {
      this.selected = {
        tags: [],
        categories: []
      }
      this.$emit('reset', this.selected)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
