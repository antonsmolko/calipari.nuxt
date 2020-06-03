<template lang="pug">
    Page
        template(#main)
            main(:class="{ 'uk-light': darkPeriod }")
                section.uk-section.uk-section-large.tm-section-lines(data-uk-height-viewport='offset-top: true')
                    .uk-position-center.uk-flex.uk-flex-column.uk-flex-middle.uk-padding.uk-text-center(v-if="loaded")
                        span.uk-text-large Выполняется регистрация...
                        .uk-margin-top.uk-text-muted(data-uk-spinner="ratio: 3")
                    .uk-container(v-else)
                        .uk-flex.uk-flex-center
                            .uk-width-1-1(class="uk-width-xlarge@s")
                                .tm-login__header
                                    h1.uk-heading-small.uk-margin-remove Регистрация
                                    .uk-divider-small
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
                                            :vField="$v.form.name"
                                            :vRules="{ required: true, minLength: true }"
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
                                        .tm-form__buttons
                                            button.uk-button.uk-button-primary(
                                                type="submit"
                                                :disabled="$v.$invalid"
                                            ) Зарегистрироваться
                                            SocialsColor(@submit="loaded = true")
                                .tm-login__footer.uk-inline.uk-margin
                                    nuxt-link.uk-link.tm-text-medium.uk-display-block(to="/login")
                                        | Уже есть аккаунт?
</template>
<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

import SocialsColor from '~/components/SocialsColor.vue'
import form from '~/components/mixins/form'
import Page from '~/components/layout/Page.vue'
import VInput from '~/components/form/VInput'
import setLayout from '~/components/mixins/setLayout'

export default {
  components: {
    Page,
    SocialsColor,
    VInput
  },
  mixins: [form, setLayout],
  metaInfo () {
    return {
      title: 'Регистрация'
    }
  },
  data () {
    return {
      loaded: false
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
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.loaded = true
        await this.$axios.post('/auth/register', this.form)
        await this.$router.push({ name: 'index' })
      } catch (e) {
        this.loaded = false
        return e
      }
    }
  }
}
</script>
