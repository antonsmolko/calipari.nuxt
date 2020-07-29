<template lang="pug">
    Page
        template(#main)
            main.uk-position-relative
                section.uk-section
                    .uk-container
                        .uk-position-cover.uk-flex.uk-flex-middle
                            .uk-margin-auto.uk-text-muted(data-uk-spinner="ratio: 3")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Page from '~/components/layout/Page.vue'

export default {
  components: { Page },
  middleware ({ route, redirect }) {
    const token = route.query.token
    const id = route.query.id

    if (!token || !id) {
      redirect('/notfound')
    }
  },
  async fetch () {
    const routeQuery = this.$route.query

    await this.$store.dispatch('payment/confirmation', routeQuery.token)
    await this.$store.dispatch('payment/getPaymentRespond', routeQuery.id)
      .then((response) => {
        if (response.status === 'canceled') {
          this.dialogOpen(response)
        }
      })
  },
  computed: {
    ...mapState({
      orderNumber: state => state.payment.orderNumber
    })
  },
  watch: {
    async orderNumber () {
      if (this.orderNumber) {
        this.setPaymentFieldAction({ field: 'orderNumber', value: null })
        await this.$router.push({ name: 'index' })
      }
    }
  },
  methods: {
    ...mapActions({
      addNotificationAction: 'notifications/addItem',
      setPaymentFieldAction: 'payment/setField'
    }),
    dialogOpen (response) {
      const modal = this.$uikit.modal
      const content = `
        <h2 class="uk-modal-title uk-text-danger">${response.title}</h2>
        <span class="tm-text-medium uk-text-danger">${response.content}</span>
        `

      modal.labels = {
        ok: 'Повторить',
        cancel: 'Отменить'
      }

      modal.confirm(content)
        .then(() => this.$router.push(`/payment?hash=${response.hash}`))
    }
  }
}
</script>
