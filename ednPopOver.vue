<template>
  <div class="popOver pa-5" v-html="msg"></div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: () => '',
    },
  },
}
</script>

<style lang="stylus">
div.popOver
  min-height 150px
  min-width 100px
  background-color red
  border-radius 7px
  position absolute
  left 0
  z-index 10
</style>