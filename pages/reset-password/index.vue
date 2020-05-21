<template lang="pug">
    main(:class="{ 'uk-light': darkPeriod }")
        section.uk-section.uk-section-large.tm-section-lines(data-uk-height-viewport='offset-top: true')
            .uk-position-center.uk-flex.uk-flex-column.uk-flex-middle.uk-padding.uk-text-center(v-if="loaded")
                span.uk-text-large Письмо отправляется...
                .uk-margin-top(data-uk-spinner="ratio: 3")
            .uk-container(v-else)
                .uk-flex.uk-flex-center
                    .uk-width-1-1(class="uk-width-xlarge@s")
                        .tm-login__header
                            h1.uk-heading-small.uk-margin-remove Сброс пароля
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
                                    :vDelay="true"
                                )
                            .uk-inline.uk-margin.uk-margin-medium-top.uk-width-1-1
                                .uk-text-center(class="uk-text-left@s")
                                    button.uk-button.uk-button-primary(
                                        type="submit"
                                        :disabled="$v.$invalid"
                                    ) Отправить
                        .tm-login__footer.uk-inline.uk-margin
                            span.uk-link.tm-text-medium.uk-display-block(@click.prevent="onBack")
                                span.uk-icon(data-uk-icon="chevron-left")
                                | Назад
</template>
<script>

import { required, email } from 'vuelidate/lib/validators'

import form from '~/components/mixins/form'

import VInput from '~/components/form/VInput'
import setLayout from '~/components/mixins/setLayout'

export default {
  components: { VInput },
  mixins: [form, setLayout],
  metaInfo () {
    return {
      title: 'Запрос на сброс пароля'
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
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.loaded = true
        await this.$axios.post('/auth/reset-password', { email: this.form.email })
        await this.$router.push({ name: 'index' })
      } catch (e) {
        this.loaded = false
        return e
      }
    },
    onBack () {
      this.$router.go(-1) ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
