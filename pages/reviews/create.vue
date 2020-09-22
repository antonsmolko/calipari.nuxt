<template lang="pug">
  page
    template(#main)
      main
        top-bar(:title="pageTitle")
          .uk-navbar-item
            button.uk-close(type="button", data-uk-close, @click="close")
        slide-y-down-transition
          section.uk-section(
            v-if="!$fetchState.pending"
            :class="{ 'uk-light': darkPeriod }")
            .uk-container
              .uk-position-center.uk-flex.uk-flex-column.uk-flex-middle.uk-padding.uk-text-center(v-if="sending")
                span.uk-text-large Подождите<br>Отзыв отправляется...
                span.uk-margin-top.uk-tex-muted(data-uk-spinner="ratio: 3")
              .uk-width-1-1(v-else)
                .uk-margin-bottom
                  h1.uk-heading-small.uk-margin-remove Ваш отзыв
                  span.uk-text-lead Заказ № {{ order.number }}
                  .uk-divider-small
                .uk-grid(data-uk-grid)
                  div(class="uk-width-2-3@m")
                    v-textarea.tm-review__comment(
                      title="Комментарий"
                      :label="true"
                      :trim="false"
                      :min="2"
                      :maxlength="1000"
                      name="comment"
                      :vField="$v.comment"
                      :vRules="{ required: true, minLength: true }"
                      :vDelay="true"
                      module="reviews"
                      dispatchName="setItemField")
                    .uk-grid.uk-margin-medium-top(data-uk-grid)
                      div(class="uk-width-1-2@m")
                        star-rating-form(
                          title="Оценка за качество"
                          name="qualityRate"
                          idPrefix="quality-rate"
                          @input="rateQuality")
                      div(class="uk-width-1-2@m")
                        star-rating-form(
                          title="Оценка за сервис"
                          name="serviceRate"
                          idPrefix="service-rate"
                          @input="rateService")
                  .tm-review__uploads(class="uk-width-1-3@m")
                    .tm-review__uploads-title Изображения
                    .uk-grid.uk-grid-small(data-uk-grid="masonry: true" class="uk-child-width-1-2 uk-child-width-1-4@s uk-child-width-1-2@m")
                      upload-input(
                        v-if="previews.length < maxFilesCount"
                        :max-file-size="15"
                        @failed="handleFailed"
                        @change="handleUpload")
                      .uk-position-relative(v-for="(preview, index) in previews" :key="index")
                        button.tm-review__uploads-close.uk-icon-button.uk-box-shadow-small(
                          data-uk-icon="icon:close; ratio:0.8"
                          @click="remove(preview)")
                        img.uk-box-shadow-medium(:src="preview.content" :alt="`image-${index + 1}`")
                  .tm-review__bottom.uk-margin-medium-top(class="uk-width-2-3@m")
                    button.uk-button.uk-button-primary(@click="send" :disabled="$v.$invalid") Отправить
                    .uk-margin-top
                      span.uk-text-muted.uk-text-small
                        | Нажимая кнопку, вы принимаете&nbsp;
                        nuxt-link.uk-link(to="/policy") условия сервиса
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { numeric, minLength, required } from 'vuelidate/lib/validators'
import some from 'lodash/some'
import Page from '@/components/layout/Page'
import TopBar from '@/components/layout/TopBar'
import VTextarea from '@/components/form/VTextarea'
import StarRatingForm from '@/components/form/Input/StarRatingForm'
import UploadInput from '@/components/Upload/UploadInput'
import scrollToTop from '@/components/mixins/scrollToTop'
import { dataURItoBlob } from '@/helpers'

export default {
  async middleware ({ $auth, route, redirect, store }) {
    const hash = route.query.hash

    if (!hash) {
      redirect('/notfound')
    }

    const response = await store.dispatch('orders/getItemByHash', hash)

    if (response.order.review) {
      $auth.loggedIn
        ? redirect('/profile/orders')
        : redirect('/')
    }
  },
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  components: {
    Page,
    TopBar,
    VTextarea,
    StarRatingForm,
    UploadInput
  },
  mixins: [scrollToTop],
  fetch () {
    this.clearReviewItemFieldsAction()
    this.setFieldAction({ field: 'pageTitle', value: 'Отзыв о заказе' })
    this.setReviewItemFieldAction({ field: 'hash', value: this.$route.query.hash })
  },
  data: () => ({
    sending: false,
    previews: [],
    maxFilesCount: 5,
    file: ''
  }),
  validations: {
    comment: {
      required,
      minLength: minLength(2),
      touch: false
    },
    qualityRate: {
      required,
      numeric,
      touch: false
    },
    serviceRate: {
      required,
      numeric,
      touch: false
    }
  },
  computed: {
    ...mapState({
      order: state => state.orders.item,
      hash: state => state.reviews.fields.hash,
      comment: state => state.reviews.fields.comment,
      qualityRate: state => state.reviews.fields.quality_rate,
      serviceRate: state => state.reviews.fields.service_rate,
      images: state => state.reviews.fields.images
    })
  },
  methods: {
    ...mapActions({
      getOrderByHash: 'orders/getItemByHash',
      setReviewItemFieldAction: 'reviews/setItemField',
      sendAction: 'reviews/send',
      setNotificationAction: 'notifications/addItem',
      addImageAction: 'reviews/addImage',
      removeFileAction: 'reviews/removeFile',
      clearReviewItemFieldsAction: 'reviews/clearItemFields'
    }),
    rateQuality (value) {
      this.setReviewItemFieldAction({ field: 'quality_rate', value })
    },
    rateService (value) {
      this.setReviewItemFieldAction({ field: 'service_rate', value })
    },
    async send () {
      this.sending = true
      try {
        await this.sendAction({
          hash: this.hash,
          comment: this.comment,
          quality_rate: Number(this.qualityRate),
          service_rate: Number(this.serviceRate),
          images: this.images
        })
      } catch (e) {
        this.sending = false
        return e
      }
      await this.close()
    },
    close () {
      const redirectPath = this.$auth.loggedIn ? '/profile/orders' : '/'
      this.$router.push(redirectPath)
    },
    handleUpload ({ preview, file }) {
      if (!some(this.previews, { name: preview.name, size: preview.size })) {
        this.previews.push(preview)

        this.$fileapi.Image(file)
          .resize(1200, 1200, 'max')
          .get((err, img) => {
            if (err) {
              return err
            }
            const dataUri = this.$fileapi.toDataURL(img, 'image/jpeg')
            const image = dataURItoBlob(dataUri)

            this.addImageAction(image)
          })
      }
    },
    remove (preview) {
      this.previews = this.previews.filter(n => n.name !== preview.name && n.size !== preview.size)
      this.removeFileAction(preview)
    },
    handleFailed ({ message }) {
      this.setNotificationAction({
        status: 'danger',
        message
      })
    }
  }
}
</script>

<style lang="scss">
.tm-review {
  &__comment {
    textarea {
      height: 270px;
    }
  }
  &__uploads {
    &-title {
      font-size: 13px;
      line-height: 1.9;
    }
    &-close {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }
  }
}
</style>
