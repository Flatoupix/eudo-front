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
    :class="getIrisCssClass"
  >
    <template v-slot:selection="{ item }">
      <v-chip :small="getIrisMode" :outlined="!getIrisMode" :text-color="getIrisChipTxtColor" :close="!getIrisRdonlyMode" :color="getIrisChipColor" label :input-value="item.selected" @click:close="remove(item)">
        {{ typeof item === 'object' ? item.text : item }}
      </v-chip>
    </template>
    <template v-slot:append-outer v-if="tooltip">
      <edn-tooltip> {{ tooltip }}</edn-tooltip>
    </template>
    <template v-slot:append v-if="getIrisRdonlyMode">
      <v-icon class="v-icon--disabled">mdi-menu-down</v-icon>
      <v-icon class="v-icon--disabled">mdi-lock</v-icon>
    </template>
  </v-autocomplete>
  <v-select
    :disabled="getIrisRdonlyMode"
    :filled="getIrisRdonlyMode"
    v-else
    :rules="rules"
    type="text"
    v-bind="$attrs"
    v-model="content"
    :items="$attrs.items"
  >
    <template v-slot:append-outer v-if="tooltip">
      <edn-tooltip> {{ tooltip }}</edn-tooltip>
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
import ednTooltip from './ednTooltip'

export default {
  mixins: [ednRequired, ednVModel, ednMimicMix],
  components: {
    ednTooltip,
  },
  inheritAttrs: false,
  props: {
    tooltip: String,
  },
  computed: {
    getIrisChipColor(){
      return this.getIrisRdonlyMode ? 'grey lighten-2': this.getIrisMode ? 'grey lighten-1':''
    },
    getIrisChipTxtColor(){
      return this.getIrisRdonlyMode ? 'grey darken-2': this.getIrisMode ? 'grey darken-3':''
    }
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
<style lang='stylus' >
.v-input.iris-mimic .v-label.v-label--active
    line-height: 5px;
    overflow: visible;
 
</style>
