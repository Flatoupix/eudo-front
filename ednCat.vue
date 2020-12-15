<template>
  <v-combobox
    v-if="this.$attrs.autocomplete === true || this.$attrs.autocomplete === ''"
    :rules="rules"
    type="text"
    v-bind="$attrs"
  >
    <template v-slot:append-outer-icon v-if="tooltip">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" style="cursor: pointer">mdi-help-circle-outline</v-icon>
        </template>
        {{ tooltip }}
      </v-tooltip>
    </template>
  </v-combobox>
  <v-select v-else v-model="content" :rules="rules" type="text" v-bind="$attrs">
    <template v-slot:append-outer-icon v-if="tooltip">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" style="cursor: pointer">mdi-help-circle-outline</v-icon>
        </template>
        {{ tooltip }}
      </v-tooltip>
    </template>
  </v-select>
</template>

<script>
import { ednRequired } from './mixins/ednRequired'
import { ednVModel } from './mixins/ednVModel'

export default {
  mixins: [ednRequired, ednVModel],
  inheritAttrs: false,
  props: {
    tooltip: String,
  },
}
</script>
