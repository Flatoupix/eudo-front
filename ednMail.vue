<template>
  <div>
    <v-text-field
      ref="edn_mail"
      @update:error="isReady($event)"
      v-model="content"
      type="text"
      v-bind="$attrs"
      :rules="rules"
      v-if="!irisMimic"
      :label="$attrs.label"
      append-icon="mdi-close"
      append-outer-icon="mdi-mail"
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
    <!-- <edn-goto v-else @edit="exit($event);getFocus" linkMode="mail" :label="$attrs.label"> {{ content }} </edn-goto> -->
    <edn-mimic v-bind="$attrs" :pattern="pattern" v-model="content" type="mail" v-else />
  </div>
</template>

<script>
import { ednRequired } from './mixins/ednRequired'
import { ednVModel } from './mixins/ednVModel'
import ednMimic from './ednMimic'
import { ednRegex } from './mixins/ednRegex'

export default {
  components: {
    ednMimic,
  },
  props: {
    irisMimic: {
      type: Boolean,
      default: () => false,
    },
    invalidMsg: {
      type: String,
      default: () => 'Vous devez entrer une adresse mail valide.',
    },
    pattern: {
      type: RegExp,
      default: () =>
        /^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/i,
    },
  },
  data() {
    return {
      linkContent: '',
      readyToConvert: null,
      linkMode: false,
    }
  },
  mixins: [ednRequired, ednVModel,ednRegex],
  inheritAttrs: false,
  methods: {
  },
  computed: {
    getFocus() {
      return this.linkMode ? '':setTimeout(()=>this.$refs.edn_mail.focus())
    }
  },
  // mounted() {
  //   this.rules.push((v) => (v && this.pattern.test(v)) || this.invalidMailMsg)
  // },
}
</script>

<style lang="stylus">
div.v-input.v-text-field.linkIris
  div.v-input__slot
    :after
      border none

  input
    text-decoration underline
    color #1CA6FD
    cursor pointer
</style>
