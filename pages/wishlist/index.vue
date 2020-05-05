<template lang="pug">
    main(:class="{ 'uk-light': darkPeriod }")
        GalleryLayout(
            v-if="items.length"
            mode="wishList"
            title="Избранное"
            :keyValue="items"
        )
        template(v-else)
            TopBar(title="Избранное")
                .uk-navbar-item
                    button.uk-close.tm-topbar__control(type="button", data-uk-close, @click="onClose")
            .uk-section.uk-section-xlarge
                .uk-text-center
                    span.uk-heading-small Список пуст
                    p.tm-text-medium Воспользуйтесь каталогом, чтобы добавить изображения
                    nuxt-link.uk-button.uk-button-primary.uk-margin-medium-top(to="/catalog") В каталог
</template>

<script>
import { mapState, mapActions } from 'vuex'

import GalleryLayout from '~/components/Gallery/GalleryLayout'
import TopBar from '~/components/layout/TopBar'
import setLayout from '~/components/mixins/setLayout'
import scrollToTop from '~/components/mixins/scrollToTop'

export default {
  name: 'WishList',
  scrollToTop: true,
  components: {
    TopBar,
    GalleryLayout
  },
  mixins: [setLayout, scrollToTop],
  computed: {
    ...mapState('wishList', {
      items: state => state.items
    })
  },
  created () {
    if (this.items.length) {
      this.getTagsAction(this.items)
    }
    this.setFieldsAction({ pageTitle: 'Избранное' })
  },
  methods: {
    ...mapActions('tags', {
      getTagsAction: 'getItemsByImageKeys'
    }),
    onClose () {
      this.$router.go(-1) ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
