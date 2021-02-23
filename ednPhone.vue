<template>
  <div>
    <v-text-field
      ref="edn_phone"
      @update:error="isReady($event)"
      v-model="content"
      @blur="isMimic"
      v-bind="$attrs"
      :rules="rules"
      v-if="!irisMimic"
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
    <edn-mimic :rules="rules" v-bind="$attrs" :pattern="pattern" v-model="content" type="phone" v-else />
  </div>
</template>

<script>
import { ednRequired } from './mixins/ednRequired'
import { ednVModel } from './mixins/ednVModel'
import ednMimic from './ednMimic'

export default {
  components: {
    ednMimic,
  },
  props: {
    irisMimic: {
      type: Boolean,
      default: () => false,
    },
    invalidPhoneMsg: {
      type: String,
      default: () => 'Vous devez entrer un numéro de téléphone valide.',
    },
    pattern: {
      type: RegExp,
      default: () => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    },
  },
  data() {
    return {
      linkContent: '',
      readyToConvert: true,
      linkMode: false,
    }
  },
  mixins: [ednRequired, ednVModel],
  inheritAttrs: false,
  methods: {
    changeToLink() {
      this.linkContent = this.content
    },
    isReady(e) {
      this.readyToConvert = !e
    },
    isMimic() {
      this.linkMode = this.irisMimic && this.content?.length > 0 && this.readyToConvert
    },
    exit(e) {
      this.linkMode = e
    },
  },

  computed: {
    getFocus() {
      return this.linkMode ? '' : setTimeout(() => this.$refs.edn_phone.focus())
    },
  },
  mounted() {
    this.rules.push(v => this.pattern.test(v) || this.invalidPhoneMsg)
  },
}
</script>
