<template lang="pug">
    div
        TopBar(:title="title")
            .uk-navbar-item
                span.tm-topbar__control.uk-icon-link(data-uk-icon="settings" @click.prevent="filterClick")
                    span.uk-badge(v-if="filterQty") {{ filterQty }}
        SlideYDownTransition
            div
                GalleryHero(
                    :title="title"
                    :backgroundPath="backgroundPath"
                    :grayscaleMod="true")
                    template(#tags)
                        .tm-gallery__tags.uk-flex.uk-flex-wrap(
                            data-uk-scrollspy="cls: uk-animation-fade"
                            v-if="tags.length")
                            GalleryTag(
                                :active="!filterQty"
                                @click="tagClick")
                            GalleryTag(
                                v-for="tag in tags"
                                :key="tag.id"
                                :item="tag"
                                :active="activeTag === tag.id"
                                @click="tagClick"
                            )
                GalleryImageSection(
                    v-if="images.length"
                    :images="images"
                    @dislike="dislike"
                    @paginate="paginate"
                )
                .uk-width-1-1.uk-flex.uk-flex-center.uk-margin-large-top(v-else)
                    .uk-spinner(data-uk-spinner ratio="3")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import GalleryHero from './GalleryHero'
import GalleryImage from './GalleryImage'
import GalleryTag from './GalleryTag'
import GalleryImageSection from './GalleryImageSection'
import TopBar from '~/components/layout/TopBar.vue'
import Observer from '~/components/Observer'

export default {
  name: 'Gallery',
  components: {
    GalleryImageSection,
    GalleryHero,
    TopBar,
    Observer,
    GalleryImage,
    GalleryTag
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    backgroundPath: {
      type: String,
      default: ''
    },
    images: {
      type: Array,
      required: true
    },
    tags: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      filterQty: 'filter/currentQty',
      activeTag: 'filter/activeTag'
    })
  },
  created () {
    this.setFieldsAction({ footer: false })
  },
  methods: {
    ...mapActions('images', {
      setImageFieldsAction: 'setFields'
    }),
    paginate () {
      this.$emit('paginate')
    },
    filterClick () {
      this.$emit('filterOpen')
    },
    dislike (id) {
      this.$emit('dislike', id)
    },
    tagClick (tag) {
      this.$emit('tagging', tag)
    }
  }
}
</script>
