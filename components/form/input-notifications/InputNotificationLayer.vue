<template lang="pug">
    slide-y-down-transition
        span.text-danger
            slot В поле «{{ name }}» содержатся ошибки
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.text-danger {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: block;
    font-size: 11px;
    line-height: 1;
    color: tomato;
    margin-top: 1px;
    text-align: left;
    @include media-mob($s) {
        font-size: 12px;
        margin-top: 1px;
    }
}
</style>
