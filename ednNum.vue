<template>
  <div>
    <v-text-field
      autocomplete="false"
      type="text"
      ref="input"
      @keyup="textFilter($event)"
      v-model="content"
      v-bind="$attrs"
      :rules="rules"
      :append-icon="getAppendedIcon"
      @click:append="focusOnInput"
      :disabled="getIrisRdonlyMode"
      :filled="getIrisRdonlyMode"
    >
      <template v-slot:[getSlotName] v-if="$attrs.tooltip">
        <edn-tooltip> {{ $attrs.tooltip }}</edn-tooltip>
      </template>
    </v-text-field>
  </div>
</template>

<script>
import Vue from 'vue'

import { ednRequired } from './mixins/ednRequired'
import ednMimic from './ednMimic'
import { ednMimicMix } from './mixins/ednMimicMix'
import ednTooltip from './ednTooltip'

export default {
  components: {
    ednMimic,
    ednTooltip,
  },
  mixins: [ednMimicMix],
  props: {
    mask: {
      type: String,
      default: () => '##:##',
    },
    pattern: {
      type: RegExp,
      default: () => /[^.\d ]/gu,
    },
    value: null,
  },
  data() {
    return {
      content: this.value,
      preValue: null,
      filteredValue: null,
    }
  },
  inheritAttrs: false,
  mixins: [ednRequired, ednMimicMix],
  methods: {
    textFilter(e) {
      if (this.content[0] === '-' || this.content[0] === '+') {
        this.content = this.content[0] + this.content.slice(1).replaceAll(this.pattern, '')
        if (this.content.includes(',')) {
        }
        this.$emit('input', this.content)
      } else {
        // debugger
        this.content = this.content.replaceAll(this.pattern, '')
      }
      this.$emit('input', this.content)
    },
  },

  watch: {
    value() {
      if (this.value != this.content) {
        this.content = this.value
      }
    },
  },
}
</script>
