<template lang="pug">
  .tm-socials.tm-socials-large
    button.uk-icon-button(@click="socialLogin('google')" data-uk-icon="google")
    button.uk-icon-button(@click="socialLogin('facebook')" data-uk-icon="facebook")
    button.uk-icon-button(@click="socialLogin('vk')" data-uk-icon="vk")
    button.uk-icon-button(@click="socialLogin('yandex')" data-uk-icon="yandex")
</template>

<script>
export default {
  methods: {
    socialLogin (service) {
      window.location.href = `${process.env.baseApiUrl}auth/login/${service}`
    }
  }
}
</script>

<style lang="scss">
.tm-socials {
    font-size: $global-small-font-size;
    font-weight: 300;
    > a, > button {
        &:not(:last-child) {
            margin-right: $global-small-margin;
        }
    }

    &.tm-socials-large {
        > a, > button {
            width: $global-control-height;
            height: $global-control-height;
        }
    }
}
</style>
