<template lang="pug">
    Page
        template(#main)
            main(:class="{ 'uk-light': darkPeriod }")
                section.uk-section.uk-section-large.tm-section-lines(data-uk-height-viewport='offset-top: true')
                    .uk-position-center.uk-flex.uk-flex-column.uk-flex-middle.uk-padding.uk-text-center(v-if="loaded")
                        span.uk-text-large Подождите...
                        .uk-margin-top.uk-text-muted(data-uk-spinner="ratio: 3")
                    .uk-container(v-else)
                        .uk-flex.uk-flex-center
                            .uk-width-1-1(class="uk-width-xlarge@s")
                                .tm-login__header
                                    h1.uk-heading-small.uk-margin-remove Смена пароля
                                    .uk-divider-small
                                form.tm-form(@submit.prevent="onSubmit")
                                    .tm-form__items
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
                                            :min="6"
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
                                                :disabled="$v.$invalid") Изменить пароль
</template>
<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

import form from '~/components/mixins/form'
import Page from '~/components/layout/Page.vue'
import VInput from '~/components/form/VInput'
import setLayout from '~/components/mixins/setLayout'

export default {
  middleware: 'guest',
  components: { Page, VInput },
  mixins: [form, setLayout],
  metaInfo () {
    return {
      title: 'Сброс пароля'
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
        touch: false,
        minLength: minLength(6)
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.loaded = true
        await this.$axios.post('/auth/reset/password', {
          token: this.$route.params.token,
          ...this.form
        })
      } catch (e) {
        return e
      }
      await this.$router.push({ name: 'login' })
    }
  }
}
</script>
