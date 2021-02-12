<template>
  <div >
    <v-input v-if="$slots.editable" class="v-text-field ml-0">
      <label v-bind="$attrs" class="v-label v-label--active theme--light p-absolute">{{ $attrs.label }}</label>
      <a class="linkIris input py-1" :href="goTo"  style="cursor: pointer; color:var(--v-link-base)">
          <slot name="editable"></slot>
      </a>
      <v-spacer></v-spacer>
      <v-icon @click.stop="$emit('edit', false)">mdi-pencil</v-icon>
    </v-input>
    <a v-else class="linkIris " :href="goTo" style="cursor: pointer; color:var(--v-link-base)"> 
      <slot ></slot>

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
        case 'phone': return 'tel:'+this.$slots.editable[0].text

        case 'mail': return "mailto:"+this.$slots.editable[0].text
        case 'social': //Future feature
        case 'url': return "mailto:"+this.$slots.editable[0].text
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
