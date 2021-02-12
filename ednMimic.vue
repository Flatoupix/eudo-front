<template>
  <div class="d-flex justify-start edn-mimic">
    <!-- <v-row align-content="center" class="d-flex justify-center">
    <v-col :cols="getCols"> -->
    <v-text-field
      :id="$attrs.id"
      ref="txtField"
      v-if="!linkMode"
      :label="$attrs.label"
      :readonly="$attrs.readonly"
      :prepend-inner-icon="getPrepIcon"
      type="text"
      @update:error="isReady($event)"
      v-model="content"
      v-bind="$attrs"
      v-on="$listeners"
      :rules="rules"
      :clearable="!$attrs.readonly === ''"
      :outlined="$attrs.readonly === ''"
      :class="$attrs.readonly === '' ? 'text--disabled' : ''"
      class="flex-grow-1"
      autocomplete="off"
      @blur="isMimic()"
    >
      <template v-slot:append v-if="$attrs.tooltip">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" style="cursor:pointer;">mdi-help-circle-outline</v-icon>
          </template>
          {{ $attrs.tooltip }}
        </v-tooltip>
      </template>
    </v-text-field>
    <edn-goto
      @focused="focusOnInput($event)"
      @clickAction="isMimic(false)"
      :prepIcon="getPrepIcon"
      v-else
      @edit="isMimic(false)"
      :linkMode="type"
      :label="$attrs.label"
    >
      {{ content }}
    </edn-goto>
    <!-- </v-col> -->
    <!-- <v-col
      v-if="outerIconAdded"
      cols="2"
      :align-self="$attrs.readonly == '' ? 'start' : 'center'"
      :class="['text-center', $attrs.readonly == '' ? 'mt-4' : '']"
    > -->
    <slot name="outer-icon"></slot>
    <!-- </v-col>
  </v-row> -->
  </div>
</template>

<script>
import { ednRequired } from './mixins/ednRequired'
import { ednVModel } from './mixins/ednVModel'
import { ednRegex } from './mixins/ednRegex'

export default {
  name: 'ednMimic',
  inheritAttrs: false,
  mixins: [ednRequired, ednVModel, ednRegex],
  props: {
    wrongUrlMsg: {
      type: String,
      default: () => 'Vous devez entrer une url valide.',
    },
    // placeHolder: {
    //   type: String,
    //   default: () => 'http://',
    // },
    // regex: {
    //   type: RegExp,
    //   default: () =>
    //     /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    // },
    // linkMode: {
    //   type: Boolean,
    //   default: false,
    // },
    // focused: {
    //   type: Boolean,
    //   default: false,
    // },
    type: {
      type: String,
      default: () => 'url',
    },
  },
  data() {
    return {
      valid: null,
      readyToConvert: true,
      linkMode: false,
      focused: false,
      arrSocial: ['twitter', 'linkedin', 'facebook'],
      invalidMsgs: '',
      socialIcon:null
    }
  },
  mounted() {
    // this.rules.push(content => this.regex.test(content) || this.wrongUrlMsg)
    // this.valid = this.regex.test(this.content)
    this.invalidMsgs = this.oInvalidMsg[this.type];
  },
  computed: {
    // getCols() {
    //   return this.$slots['outer-icon']?.length > 0 ? '10' : '12'
    // },
    getPrepIcon: {
      // return this.prepIcon ? this.prepIcon
      //   : this.arrSocial.find(x => this.content.includes(x))
      //   && this.linkMode
      //   ? 'mdi-'+ this.arrSocial.find(x => this.content.includes(x))
      //   : ''
      get: function() {
        return this.socialIcon ? this.socialIcon  : ''
      },
      set: function(newValue) {
        this.socialIcon = newValue
      },
    },
    outerIconAdded() {
      return this.$slots['outer-icon']?.length > 0
    },
  },
  watch: {
    content() {
      this.valid = this.pattern.test(this.content)
    },
    // async focused() {
    //   await this.$nextTick();
    //   if(this.focused)
    //     this.$refs?.txtField?.focus()
    // },
  },
  methods: {
    isReady(e) {
      this.readyToConvert = !e
    },
    focusOnInput() {
      this.$refs?.txtField?.focus()
    },
    changeToLink() {
      this.linkContent = this.content
    },
    isMimic(bVal = true) {
      this.linkMode = bVal && this.content.length > 0 && this.readyToConvert
      if(this.linkMode && this.arrSocial.find(x => this.content.includes(x)))
        this.socialIcon = 'mdi-'+ this.arrSocial.find(x => this.content.includes(x))
      else
        this.socialIcon = ''
    },
  },
}
</script>
<style lang="stylus">
div.v-input--is-readonly {
  pointer-events: none;
  user-select: none;
}

div.edn-mimic > div {
  flex-grow:1;
}
</style>
