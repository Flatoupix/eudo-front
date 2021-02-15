<template>
  <div>
    <v-input @click="$emit('edit', false)" v-if="$slots.editable" class="v-text-field ml-0">
      <label v-bind="$attrs" class="v-label v-label--active theme--light p-absolute">{{ $attrs.label }}</label>
      <v-icon>{{ prepIcon }}</v-icon>
      <a
        :class="getLinkMargins"
        target="getOpeningMode"
        class="linkIris input py-1"
        :href="goTo"
        style="cursor: pointer; color: var(--v-link-base)"
      >
        <slot name="editable"></slot>
      </a>
      <v-spacer></v-spacer>
      <v-icon @click.stop="$emit('edit', false)">mdi-pencil</v-icon>
    </v-input>
    <a v-else target="_blank" class="linkIris" :href="goTo" style="cursor: pointer; color: var(--v-link-base)">
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
      type: String,
      default: () => '',
    },
    oType: {
      type: Object,
      default:function () {
        return {
          phone: 'tel:',
          mail: 'mailto:',
          url: 'http://'
        }
      }
    },
  },
  computed: {
    goTo() {
      if(Object.values(this.$slots)?.length > 0) 
        return this.oType[this.linkMode] + Object.values(this.$slots)?.flat(1)[0]?.text.trim()
    },
    getLabelMargins() {
      return this.prepIcon ? 'ml-7' : ''
    },
    getLinkMargins() {
      return this.prepIcon ? 'px-1' : ''
    },
    getOpeningMode() {
      return this.linkMode == 'url' ? '_blank' : '_self'
    },
  },
  destroyed() {
    this.$emit('focused', true)
  },
}
</script>

<style lang="stylus">
a.linkIris {
  label {
    position: absolute;
  }

  text-decoration: underline;
  color: #1CA6FD;
  cursor: pointer;
}
</style>
