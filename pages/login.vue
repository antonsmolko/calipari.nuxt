<template lang="pug">
  Page
    template(#main)
      main(:class="{ 'uk-light': darkPeriod }")
        section.uk-section.uk-section-large.tm-section-lines(data-uk-height-viewport='offset-top: true')
          .uk-position-center.uk-flex.uk-flex-column.uk-flex-middle.uk-padding.uk-text-center(v-if="loaded")
            span.uk-text-large Выполняется вход...
            .uk-margin-top.uk-tex-muted(data-uk-spinner="ratio: 3")
          .uk-container(v-else)
            .uk-flex.uk-flex-center
              .uk-width-1-1(class="uk-width-xlarge@s")
                .tm-login__header
                  h1.uk-heading-small.uk-margin-remove Вход
                  .uk-divider-small
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
                      :vDelay="true"
                      dispatchName="setFormField")
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
                      :vDelay="true"
                      dispatchName="setFormField")
                  .uk-inline.uk-margin.uk-margin-medium-top.uk-width-1-1
                    .tm-form__buttons
                      button.uk-button.uk-button-primary(
                        type="submit"
                        :disabled="$v.$invalid") Войти
                      SocialsColor(@submit="loaded = true")
                .tm-login__footer.uk-inline.uk-margin
                  nuxt-link.uk-link.tm-text-medium.uk-display-block.uk-margin-small-bottom(
                    to="/reset-password")
                    | Забыли пароль?
                  nuxt-link.uk-link.tm-text-medium.uk-display-block(to="/registration")
                    | Еще нет аккаунта?
</template>
<script>
import { mapActions } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'

import Page from '@/components/layout/Page.vue'
import SocialsColor from '@/components/SocialsColor.vue'
import form from '@/components/mixins/form'
import routerParams from '@/components/mixins/routerParams'
import VInput from '@/components/form/VInput'
import setLayout from '@/components/mixins/setLayout'
import syncProfile from '@/components/mixins/syncProfile'

export default {
  middleware: 'guest',
  components: {
    Page,
    SocialsColor,
    VInput
  },
  mixins: [form, routerParams, setLayout, syncProfile],
  metaInfo () {
    return {
      title: 'Вход'
    }
  },
  data () {
    return {
      loaded: false
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
  methods: {
    ...mapActions({
      syncCartAction: 'cart/syncItems',
      syncWishListAction: 'wishList/sync',
      syncCardsAction: 'checkout/syncCards',
      addNotificationAction: 'notifications/addItem'
    }),
    async onSubmit () {
      try {
        this.loaded = true
        await this.$auth.loginWith('laravelJWT', {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
        this.syncProfile() // @mixin: "syncProfile"
      } catch (e) {
        this.loaded = false
        return e
      }
    }
  }
}
</script>
