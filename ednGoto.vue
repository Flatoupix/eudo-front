<template>
  <div>
    <v-input
      @click="$emit('clickAction', false)"
      v-if="!$attrs.independant"
      class="v-text-field ml-0"
    >
      <label v-bind="$attrs" :class="getLabelMargins" class="v-label v-label--active theme--light p-absolute">{{ $attrs.label }}</label>
      <v-icon>{{prepIcon}}</v-icon>
      <a target="_blank" :class="getLinkMargins" class="linkIris input py-1" :href="goTo" style="cursor: pointer; color:var(--v-link-base)">
        <slot></slot>
      </a>
      <v-spacer></v-spacer>
      <v-icon @click.stop="$emit('edit', false)">mdi-pencil</v-icon>
    </v-input>
    <a v-else class="linkIris " :href="goTo" style="cursor: pointer; color:var(--v-link-base)">
      <slot></slot>
    </a>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    linkMode: {
      type: String,
      default: () => '',
    },
    prepIcon: {
      type: [String,Object],
      default: () => '',
    },
  },
  computed: {
    goTo() {
      switch (this.linkMode) {
        case 'phone':
          return 'tel:' + this.$slots.default[0].text

        case 'mail':
          return 'mailto:' + this.$slots.default[0].text
        case 'social': //Future feature
        case 'url':
          return 'http://' + this.$slots.default[0].text.trim()
      }
    },
    getLabelMargins(){
      return this.prepIcon ? 'ml-7' : ''
    },
    getLinkMargins(){
      return this.prepIcon ? 'px-1' : ''
    }
  },
  destroyed(){
    this.$emit('focused',true)
  }
}
</script>

<style lang="stylus">
a.linkIris
  label
    position absolute

  text-decoration underline
  color #1CA6FD
  cursor pointer
</style>
