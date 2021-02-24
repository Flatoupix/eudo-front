<template>
  <div class="d-flex justify-start edn-mimic">
    <v-text-field
      :disabled="$attrs.rdonly === ''"
      :filled="$attrs.rdonly === ''"
      :id="$attrs.id"
      ref="txtField"
      v-if="!linkMode"
      :label="$attrs.label"
      :rdonly="$attrs.rdonly"
      :prepend-inner-icon="getPrepIcon"
      :append-icon="getAppendedIcon"
      type="text"
      @update:error="isReady($event)"
      v-model="content"
      v-bind="$attrs"
      v-on="$listeners"
      :rules="rules"
      :clearable="!$attrs.rdonly === ''"
      :class="[$attrs.rdonly === '' ? 'text--disabled' : '','iris-mimic']"
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
      <template v-slot:editable>
        {{ content }}
      </template>
    </edn-goto>
    <slot name="outer-icon"></slot>
  </div>
</template>

<script>
import { ednRequired } from './mixins/ednRequired'
import { ednVModel } from './mixins/ednVModel'
import { ednRegex } from './mixins/ednRegex'
import { ednSocialIcon } from './mixins/ednSocialIcon'

export default {
  name: 'ednMimic',
  inheritAttrs: false,
  mixins: [ednRequired, ednVModel, ednRegex, ednSocialIcon],
  props: {
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
      invalidMsgs: '',
      invalidMsg:'',
      oInvalidMsg: {
        mail: 'Vous devez entrer une adresse mail valide. ',
        url: 'Vous devez entrer une url valide.',
        phone: 'Vous devez entrer un numéro de téléphone valide.',
      },
    }
  },
  mounted() {
    this.invalidMsg = this.oInvalidMsg[this.type]
  },
  computed: {
    outerIconAdded() {
      return this.$slots['outer-icon']?.length > 0
    },
    getAppendedIcon(){
      return this.$attrs.rdonly === ''? 'mdi-lock': ''
    }
  },
  watch: {
    content() {
      this.valid = this.pattern.test(this.content)
    },
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
      this.linkMode = bVal && this.content?.length > 0 && this.readyToConvert
      if (this.arrSocial.find(x => this.content?.includes(x)))
        this.socialIcon = 'mdi-' + this.arrSocial?.find(x => this.content?.includes(x))
      else this.socialIcon = ''
    },
  },
}
</script>
<style lang="stylus">
div.v-input--is-rdonly {
  pointer-events: none;
  user-select: none;
}

div.edn-mimic > div {
  flex-grow:1;
}
</style>
