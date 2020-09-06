<template lang="pug">
    Page
        template(#main)
            CheckoutLayout(
                title="Приглашение войти"
                :price="totalPrice"
                @confirm="onNext")
                template(#content)
                    SlideYDownTransition(v-show="pageTitle")
                        .uk-grid.uk-grid-divider.uk-flex-center(data-uk-grid)
                            div(class="uk-width-xlarge@s uk-width-1-2@m")
                                .uk-flex.uk-flex-column.uk-flex-middle.uk-padding(v-if="loaded")
                                    span.uk-text-large Выполняется вход...
                                    .uk-margin-top(data-uk-spinner="ratio: 3")
                                div(v-else)
                                    .tm-checkout__header
                                        span.uk-h2.uk-margin-remove {{ sectionTitle }}
                                        .uk-divider-small
                                    .tm-checkout__content
                                        p Для оформления заказа Вам будет необходимо ввести персональные данные.
                                    .uk-flex.uk-flex-column.uk-flex-center.uk-margin-medium-top
                                        form.tm-form(@submit.prevent="onSubmit")
                                            .tm-form__items
                                                VInput(
                                                    class="uk-margin"
                                                    title="Email"
                                                    :label="true"
                                                    icon="mail"
                                                    name="email"
                                                    module="login"
                                                    :vField="$v.form.email"
                                                    :vRules="{ required: true, email: true }"
                                                    :vDelay="true")
                                                VInput(
                                                    class="uk-margin"
                                                    title="Пароль"
                                                    :label="true"
                                                    icon="lock"
                                                    name="password"
                                                    type="password"
                                                    module="login"
                                                    :min="6"
                                                    :vField="$v.form.password"
                                                    :vRules="{ required: true, minLength: true }"
                                                    :vDelay="true")
                                            .uk-inline.uk-margin.uk-margin-medium-top.uk-width-1-1
                                                .uk-flex.uk-flex-between
                                                    button.uk-button.uk-button-primary(
                                                        type="submit"
                                                        :disabled="$v.$invalid") Войти
                                                    SocialsColor(@submit="loaded = true")
                                        .uk-inline.uk-margin
                                            nuxt-link.uk-link.tm-text-medium.uk-display-block.uk-margin-small-bottom(
                                                to="/reset-password")
                                                | Забыли пароль?
                                            nuxt-link.uk-link.tm-text-medium.uk-display-block(
                                                to="/registration")
                                                | Еще нет аккаунта?
                            div(class="uk-width-xlarge@s uk-width-1-2@m")
                                .tm-checkout__header
                                    span.uk-h2.uk-margin-remove Продолжить как гость
                                    .uk-divider-small
                                .tm-checkout__content
                                    p Для оформления заказа Вам будет необходимо ввести персональные данные.
                                    .uk-margin.uk-width-1-1.uk-margin-medium-top.uk-flex.uk-flex-between(
                                        class="uk-visible@l")
                                        button.uk-button.uk-button-danger.uk-margin-right(
                                            @click.prevent="onPrev") Назад
                                        button.uk-button.uk-button-primary(
                                            @click.prevent="onNext") Далее
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
import Page from '@/components/layout/Page.vue'
import SocialsColor from '@/components/SocialsColor.vue'
import form from '@/components/mixins/form'
import routerParams from '@/components/mixins/routerParams'
import VInput from '@/components/form/VInput'
import setLayout from '@/components/mixins/setLayout'
import CheckoutLayout from '@/components/Checkout/CheckoutLayout'

export default {
  name: 'Invite',
  middleware: ['guest'],
  components: {
    Page,
    CheckoutLayout,
    SocialsColor,
    VInput
  },
  mixins: [form, routerParams, setLayout],
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  data () {
    return {
      loaded: false,
      sectionTitle: 'Войти'
    }
  },
  validations: {
    form: {
      email: {
        required,
        email,
        touch: false
      },
      password: {
        required,
        minLength: minLength(6),
        touch: false
      }
    }
  },
  computed: {
    ...mapGetters({
      totalPrice: 'cart/totalPrice'
    })
  },
  created () {
    this.setFieldsAction({ pageTitle: 'Оформление заказа. Приглашение войти' })
    this.setCheckoutFieldAction({ field: 'invalid', value: false })
  },
  methods: {
    ...mapActions({
      setCheckoutFieldAction: 'checkout/setField'
    }),
    async onSubmit () {
      try {
        this.loaded = true
        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
      } catch (e) {
        this.loaded = false
        return e
      }
    },
    onPrev () {
      this.$router.push('/cart')
    },
    onNext () {
      this.$router.push('/checkout/personal')
    }
  }
}
</script>
