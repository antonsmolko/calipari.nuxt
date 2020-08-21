<template lang="pug">
    Page
        template(#main)
            main(:class="{ 'uk-light': darkPeriod }")
                section.uk-section.uk-section-large.tm-section-lines(data-uk-height-viewport='offset-top: true')
                    .uk-position-center.uk-flex.uk-flex-column.uk-flex-middle.uk-padding.uk-text-center(v-if="loaded")
                        span.uk-text-large {{ loadedMessage }}
                        .uk-margin-top.uk-text-muted(data-uk-spinner="ratio: 3")
                    .uk-container(v-else)
                        .uk-flex.uk-flex-center
                            .uk-width-1-1(class="uk-width-xlarge@s")
                                .tm-login__header
                                    h1.uk-margin-remove Уточните свои данные
                                    .uk-divider-small
                                .uk-flex.uk-flex-column.uk-flex-center.uk-margin-medium-top
                                    form.tm-form(@submit.prevent="onSubmit")
                                        .tm-form__items
                                            VInput(
                                                class="uk-margin"
                                                title="Имя"
                                                :label="true"
                                                icon="user"
                                                name="name"
                                                :value="form.name"
                                                module="login"
                                                :trim="false"
                                                :vField="$v.form.name"
                                                :vRules="{ required: true, email: true }"
                                                :vDelay="true")
                                            VInput(
                                                class="uk-margin"
                                                title="Email"
                                                :label="true"
                                                icon="mail"
                                                name="email"
                                                :value="form.email"
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
                                                :value="form.password"
                                                module="login"
                                                :vField="$v.form.password"
                                                :vRules="{ required: true, minLength: true }"
                                                :vDelay="true")
                                            VInput(
                                                class="uk-margin"
                                                title="Подтверждение пароля"
                                                :label="true"
                                                icon="lock"
                                                name="password_confirmation"
                                                type="password"
                                                :value="form.password_confirmation"
                                                module="login"
                                                :vField="$v.form.password_confirmation"
                                                :vRules="{ required: true, sameAsPassword: true }"
                                                :vDelay="true")
                                        .uk-inline.uk-margin.uk-margin-medium-top.uk-width-1-1
                                            .uk-text-center(class="uk-text-left@s")
                                                button.uk-button.uk-button-primary(
                                                    type="submit"
                                                    :disabled="$v.$invalid") Зарегистрироваться
</template>
<script>
import { mapActions } from 'vuex'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

import Page from '@/components/layout/Page.vue'
import form from '@/components/mixins/form'
import routerParams from '@/components/mixins/routerParams'
import VInput from '@/components/form/VInput'
import setLayout from '@/components/mixins/setLayout'
import syncProfile from '@/components/mixins/syncProfile'

export default {
  components: { Page, VInput },
  mixins: [form, routerParams, setLayout, syncProfile],
  metaInfo () {
    return {
      title: 'Уточнение регистрационных данных'
    }
  },
  data () {
    return {
      token: this.$route.query.access_token ? this.$route.query.access_token : null,
      tokenType: this.$route.query.token_type ? this.$route.query.token_type : null,
      expiresIn: this.$route.query.expires_in ? this.$route.query.expires_in : null,
      noVerified: this.$route.query.no_verified,
      loaded: false,
      loadedMessage: '',
      error: this.$route.query.error,
      origin: this.$route.query.origin ? this.$route.query.origin : null
    }
  },
  validations: {
    form: {
      name: {
        required,
        touch: false,
        minLength: minLength(2)
      },
      email: {
        required,
        email,
        touch: false
      },
      password: {
        required,
        touch: false,
        minLength: minLength(6)
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs('password'),
        touch: false
      }
    }
  },
  created () {
    if (this.token) {
      this.loaded = true
      this.loadedMessage = 'Выполняется авторизация...'
      this.$auth.setUserToken(this.token, true)
        .then(() => this.$auth.setStrategy('laravelJWT'))

      this.$auth.fetchUser()
        .then(() => {
          this.$router.push({ name: 'index' })
          this.syncProfile() // @mixin: "syncProfile"
        })
        .catch((e) => {
          this.$auth.logout()
          return this.$router.push(`/${this.origin ? this.origin : 'register'}`)
        })
    } else if (this.noVerified) {
      this.loaded = true
      this.loadedMessage = 'Отказано'
      return this.$router.push({ name: 'login' })
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
      this.loaded = true
      this.loadedMessage = 'Выполняется регистрация...'
      try {
        await this.$axios.post(`/auth/login/${this.form.service}/register`, this.form)
        await this.$router.push({ name: 'index' })
        this.syncProfile() // @mixin: "syncProfile"
      } catch (e) {
        this.loaded = false
        return e
      }
    }
  }
}
</script>
