<template lang="pug">
  svg.icon__svg
    use(xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="`/img/svg/sprite/${module}.svg#i-${name}`")
</template>

<script>
export default {
  name: 'SvgStaticSprite',
  props: {
    name: {
      type: String,
      required: true
    },
    module: {
      type: String,
      default: 'icons'
    }
  }
}
</script>
