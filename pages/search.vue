<template lang="pug">
  Page
    template(#main)
      main(:class="{ 'uk-light': darkPeriod }")
        GalleryLayout(
          :title="pageTitle"
          :mode="mode"
          :backgroundPath="imagePath"
          :keyValue="key")
          template(#search)
            .tm-search__form.uk-margin-medium-top.uk-position-relative.uk-position-z-index(
              data-uk-scrollspy="cls: uk-animation-slide-bottom-small")
              .uk-fieldset
                VSelect(
                  class="uk-margin"
                  name="search"
                  icon="search"
                  @input="onSelect"
                  @search="onSearch"
                  :isLoading="loading"
                  label="title"
                  :value="selected"
                  :placeholder="selected ? '' : 'Введите запрос'"
                  :options="searched")
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import throttle from 'lodash/throttle'
import Page from '@/components/layout/Page.vue'
import VSelect from '@/components/form/Select/VSelect'
import GalleryLayout from '@/components/Gallery/GalleryLayout'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'

const _throttle = throttle(f => f(), 300)
export default {
  components: {
    Page,
    VSelect,
    GalleryLayout
  },
  mixins: [setLayout, scrollToTop],
  metaInfo () {
    return {
      title: 'Поиск изображений'
    }
  },
  data: () => ({
    query: ''
  }),
  computed: {
    ...mapState({
      searched: state => state.search.searched,
      selected: state => state.search.selected,
      loading: state => state.tags.loading,
      images: state => state.images.items,
      tags: state => state.tags.items,
      lastPreview: state => state.images.lastPreview
    }),
    ...mapGetters({
      paginateEnd: 'images/paginateEnd',
      filterQty: 'filter/currentQty',
      activeTag: 'filter/activeTag',
      imagePath: 'search/imagePath',
      key: 'search/key',
      mode: 'search/mode'
    })
  },
  created () {
    this.setFieldsAction({ pageTitle: 'Поиск' })
    if (!this.lastPreview) {
      this.clearImagePaginationState()
      this.clearTags()
    }
  },
  methods: {
    ...mapActions({
      getSearchedResultAction: 'search/getSearchedResult',
      setSelectedAction: 'search/setSelected',
      setSearchFieldsAction: 'search/setFields',
      setTagsFieldAction: 'tags/setField',
      getImages: 'images/getItems',
      resetPaginationAction: 'images/resetPagination',
      setImagesFieldAction: 'images/setField',
      getCategoryTagsAction: 'tags/getItemsByCategoryId',
      getCollectionTagsAction: 'tags/getItemsByCollectionId',
      clearFiltersAction: 'filter/clearFilters'
    }),
    onSelect (selected) {
      this.clearTags()
      this.setSelectedAction(selected)
      this.clearImagePaginationState()
      this.clearFiltersAction()
      this.getItems()

      this.selected.type === 'category'
        ? this.getCategoryTagsAction(selected.id)
        : this.clearTags()
    },
    clearImagePaginationState () {
      this.resetPaginationAction()
      this.setImagesFieldAction({
        field: 'items',
        value: []
      })
    },
    onSearch (query) {
      if (query) {
        this.query = query.trim()
        if (this.query) {
          _throttle(this.search)
        }
      }
    },
    search () {
      if (this.query.trim()) {
        this.getSearchedResultAction(this.query)
      }
    },
    getItems (increasePage = false) {
      const restrictiveElement = { [`restrictive_${this.selected.type}`]: [this.selected.id] }
      return this.getImages({
        restrictiveElement,
        increasePage
      })
    },
    paginate () {
      this.getItems(true)
    },
    tagClick (tag) {
      this.$emit('tagging', tag)
    },
    clearTags () {
      this.setTagsFieldAction({
        field: 'items',
        value: []
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'editor-id') {
      this.setSearchFieldsAction({
        searched: [],
        selected: null
      })
      this.clearFiltersAction()
      this.clearTags()
      this.setImagesFieldAction({
        field: 'items',
        value: []
      })
    }
    next()
  }
}
</script>
