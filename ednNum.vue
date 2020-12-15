<template>
  <v-text-field
    autocomplete="false"
    type="text"
    ref="input"
    @keyup="textFilter($event)"
    v-model="content"
    v-bind="$attrs"
    :rules="rules"
  >
    <template v-slot:append v-if="$attrs.tooltip">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" style="cursor: pointer">mdi-help-circle-outline</v-icon>
        </template>
        {{ $attrs.tooltip }}
      </v-tooltip>
    </template>
  </v-text-field>
</template>

<script>
import Vue from 'vue'

import { ednRequired } from './mixins/ednRequired'

export default {
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
  mixins: [ednRequired],
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
