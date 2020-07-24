<template lang="pug">
  .tm-login__socials.tm-socials.tm-socials-large.tm-socials-color
    button.uk-icon-button(type="button" @click="onSubmit('google')" data-uk-icon="google")
    button.uk-icon-button(type="button" @click="onSubmit('facebook')" data-uk-icon="facebook")
    button.uk-icon-button(type="button" @click="onSubmit('vkontakte')" data-uk-icon="vk")
    button.uk-icon-button(type="button" @click="onSubmit('yandex')" data-uk-icon="yandex")
</template>
<script>
export default {
  methods: {
    onSubmit (service) {
      this.$emit('submit')
      window.location.href = `${process.env.baseApiUrl}/api/auth/login/${service}`
    }
  }
}
</script>
<style lang="scss">
.tm-socials.tm-socials-color {
    > a, > button {
        border: none;
        color: $global-inverse-color;
        fill: $global-inverse-color;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        &:not(:last-child) {
            margin-right: $global-small-margin;
        }
        &[data-uk-icon="google"] {
            background: #dd4b39;
        }
        &[data-uk-icon="facebook"] {
            background: #3B5998;
        }
        &[data-uk-icon="vk"] {
            background: #4a76a8;
        }
        &[data-uk-icon="yandex"] {
            background: #ffdb4d;
        }
        &:hover, &:focus {
            &[data-uk-icon="google"] {
                background: darken(#dd4b39, 5%);
            }
            &[data-uk-icon="facebook"] {
                background: darken(#3B5998, 5%);
            }
            &[data-uk-icon="vk"] {
                background: darken(#4a76a8, 5%);
            }
            &[data-uk-icon="yandex"] {
                background: darken(#ffdb4d, 7%);
            }
        }
    }
    .uk-light & {
        > a, > button {
            background: $inverse-button-primary-background;
            color: $global-inverse-color;
            fill: $global-inverse-color;
            &:hover, &:focus {
                background: darken($inverse-button-primary-background, 5%);
                color: $global-inverse-color;
                fill: $global-inverse-color;
            }
            &:active {
                background: darken($inverse-button-primary-background, 10%);
                color: $global-inverse-color;
                fill: $global-inverse-color;
            }
        }
    }
}
</style>
