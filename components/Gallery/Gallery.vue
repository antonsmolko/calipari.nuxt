<template lang="pug">
    .div
        TopBar(:title="title")
            .uk-navbar-item(v-if="images.length")
                span.tm-topbar__control.uk-icon-link(data-uk-icon="settings" @click.prevent="filterClick")
                    span.uk-badge(v-if="filterQty") {{ filterQty }}
        slot(name="hero")
        template(v-if="enabled")
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

import GalleryImage from './GalleryImage'
import GalleryImageSection from './GalleryImageSection'
import TopBar from '~/components/layout/TopBar.vue'
import Observer from '~/components/Observer'

export default {
  name: 'Gallery',
  components: {
    GalleryImageSection,
    TopBar,
    Observer,
    GalleryImage
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    images: {
      type: Array,
      required: true
    },
    enabled: {
      type: Boolean,
      default: true
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
    }
  }
}
</script>
