<template lang="pug">
    .tm-order-details__block
        span.uk-h3(v-if="title") {{ title }}
        .tm-order-details__content

</template>

<script>
export default {
  name: 'OrderDetailsBlock',
  props: {
    title: {
      type: String,
      default: null
    }
  }
}
</script>
