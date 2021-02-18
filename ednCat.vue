<template>
  <v-autocomplete
    v-if="this.$attrs.multiple === true || this.$attrs.multiple === ''"
    autocomplete="off"
    :rules="rules"
    type="text"
    v-bind="$attrs"
    v-model="content"
    :items="$attrs.items"
    :disabled="getIrisRdonlyMode"
    :filled="getIrisRdonlyMode"
  >
    <template v-slot:selection="{ item }">
      <v-chip outlined close label :input-value="item.selected" @click:close="remove(item)">
        {{ typeof item === 'object' ? item.text : item }}
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
  <v-select :disabled="getIrisRdonlyMode" :filled="getIrisRdonlyMode" v-else :rules="rules" type="text" v-bind="$attrs" v-model="content" :items="$attrs.items">
    <template v-slot:append-outer v-if="tooltip">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon class="evt-auto" v-on="on" style="cursor: pointer">mdi-help-circle-outline</v-icon>
        </template>
        {{ tooltip }}
      </v-tooltip>
    </template>
    <template v-slot:append v-if="getIrisRdonlyMode">
      <v-icon class="v-icon--disabled">mdi-menu-down</v-icon>
      <v-icon class="v-icon--disabled">mdi-lock</v-icon>
    </template>
  </v-select>
</template>

<script>
import { ednRequired } from './mixins/ednRequiredMulti'
import { ednVModel } from './mixins/ednVModel'
import { ednMimicMix } from './mixins/ednMimicMix'

export default {
  mixins: [ednRequired, ednVModel,ednMimicMix],
  inheritAttrs: false,
  props: {
    tooltip: String,
  },
  methods: {
    remove(item) {
      console.log('delete')
      let index = 0

      if (typeof item === 'object') {
        index = this.content.indexOf(item.value)
      } else {
        index = this.content.indexOf(item)
      }

      if (index >= 0) this.content.splice(index, 1)
    },
  },
}
</script>
