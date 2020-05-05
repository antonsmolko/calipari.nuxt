<template lang="pug">
    main(:class="{ 'uk-light': darkPeriod }")
        section.uk-section.uk-section-large
            .uk-container
                .uk-flex.uk-flex-center
                    .uk-width-1-1(class="uk-width-xlarge@s")
                        .tm-login__header
                            h1.uk-heading-small.uk-margin-remove Поиск изображений
                            .uk-divider-small
                        .tm-form.uk-margin-medium-top
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
        GalleryImageSection(
            v-if="images.length"
            :images="images"
            @paginate="paginate"
        )
        .uk-width-1-1.uk-flex.uk-flex-center.uk-margin-large-top(
            v-else-if="imagesLoading")
            .uk-spinner(data-uk-spinner ratio="3")
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import VSelect from '~/components/form/Select/VSelect'
import GalleryImageSection from '~/components/Gallery/GalleryImageSection'
import setLayout from '~/components/mixins/setLayout'
import scrollToTop from '~/components/mixins/scrollToTop'
export default {
  components: {
    VSelect,
    GalleryImageSection
  },
  mixins: [setLayout, scrollToTop],
  metaInfo () {
    return {
      title: 'Поиск изображений'
    }
  },
  computed: {
    ...mapState({
      searched: state => state.tags.items,
      selected: state => state.tags.item,
      loading: state => state.tags.loading,
      images: state => state.images.items,
      imagesLoading: state => state.images.loading,
      lastPreview: state => state.images.lastPreview
    }),
    ...mapGetters({
      paginateEnd: 'images/paginateEnd',
      filterQty: 'filter/currentQty'
    })
  },
  created () {
    if (!this.lastPreview) {
      this.clearImagePaginationState()
      this.setTagFieldsAction({
        items: [],
        item: null
      })
    }
  },
  methods: {
    ...mapActions({
      getSearchedItemsAction: 'tags/getSearchedItems',
      setTagFieldAction: 'tags/setField',
      setTagFieldsAction: 'tags/setFields',
      getImages: 'images/getItems',
      resetPaginationAction: 'images/resetPagination',
      setImagesFieldAction: 'images/setField'
    }),
    onSelect (tag) {
      this.setTagFieldAction({ field: 'item', value: tag })
      this.clearImagePaginationState()
      this.getItems()
    },
    clearImagePaginationState () {
      this.resetPaginationAction()
      this.setImagesFieldAction({ field: 'items', value: [] })
    },
    onSearch (query) {
      if (query) {
        this.getSearchedItemsAction(query.trim())
      }
    },
    getItems (increasePage = false) {
      const filterElement = { tags: [this.selected.id] }
      return this.getImages({ filterElement, increasePage })
    },
    paginate () {
      this.getItems(true)
    }
  }
}
</script>
