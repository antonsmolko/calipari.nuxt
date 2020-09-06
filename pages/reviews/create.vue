<template lang="pug">
  Page
    template(#main)
      main
        TopBar(:title="pageTitle")
          .uk-navbar-item
            button.uk-close(type="button", data-uk-close, @click="close")
        SlideYDownTransition
          section.uk-section(
            v-if="!$fetchState.pending"
            :class="{ 'uk-light': darkPeriod }")
            .uk-container
              .uk-flex.uk-flex-center
                .uk-position-center.uk-flex.uk-flex-column.uk-flex-middle.uk-padding.uk-text-center(v-if="sending")
                  span.uk-text-large Подождите<br>Отзыв отправляется...
                  .uk-margin-top.uk-tex-muted(data-uk-spinner="ratio: 3")
                .uk-width-1-1(v-else class="uk-width-xlarge@s")
                  .uk-margin-bottom
                    h1.uk-heading-small.uk-margin-remove Ваш отзыв
                    span.uk-text-lead Заказ № {{ order.number }}
                    .uk-divider-small
                  .uk-position-relative.uk-flex-center
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
                        star-rating(
                          title="Оценка за качество"
                          name="qualityRate"
                          idPrefix="quality-rate"
                          @input="rateQuality")
                      div(class="uk-width-1-2@m")
                        star-rating(
                          title="Оценка за сервис"
                          name="serviceRate"
                          idPrefix="service-rate"
                          @input="rateService")
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
import Page from '@/components/layout/Page'
import VTextarea from '@/components/form/VTextarea'
import StarRating from '@/components/form/Input/StarRating'
import TopBar from '@/components/layout/TopBar'
import scrollToTop from '@/components/mixins/scrollToTop'

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
    StarRating
  },
  mixins: [scrollToTop],
  fetch () {
    this.setFieldAction({ field: 'pageTitle', value: 'Отзыв о заказе' })
    this.setReviewItemFieldAction({ field: 'hash', value: this.$route.query.hash })
  },
  data: () => ({
    sending: false
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
      serviceRate: state => state.reviews.fields.service_rate
    })
  },
  methods: {
    ...mapActions({
      getOrderByHash: 'orders/getItemByHash',
      setReviewItemFieldAction: 'reviews/setItemField',
      sendAction: 'reviews/send'
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
          service_rate: Number(this.serviceRate)
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
}
</style>
