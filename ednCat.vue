<template>
  <v-autocomplete
    auto-complete="false"
    v-if="this.$attrs.autocomplete === true || this.$attrs.autocomplete === ''"
    :rules="rules"
    type="text"
    v-bind="$attrs"
    v-model="content"
    :items="$attrs.items"
  >
    <template v-slot:selection="{ item }">
      <v-chip outlined close label :input-value="item.selected" @click:close="remove(item)">
        {{ item }}
      </v-chip>
    </template>
    <template v-slot:append-outer-icon v-if="tooltip">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" style="cursor: pointer">mdi-help-circle-outline</v-icon>
        </template>
        {{ tooltip }}
      </v-tooltip>
    </template>
  </v-autocomplete>
  <v-select v-else :rules="rules" type="text" v-bind="$attrs" v-model="content" :items="$attrs.items">
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
  methods: {
    remove(item) {
      const index = this.content.indexOf(item)
      if (index >= 0) this.content.splice(index, 1)
    },
  },
}
</script>
