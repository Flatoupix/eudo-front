<template>
  <v-file-input :label="$attrs.label" v-bind="$attrs"> </v-file-input>
</template>

<script>
import { ednRequired } from './mixins/ednRequired'
import { ednVModel } from './mixins/ednVModel'

export default {
  inheritAttrs: false,
  mixins: [ednRequired, ednVModel],
}
</script>

<style lang='stylus' scoped></style>,