<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="fade-transition"
    offset-y
    min-width="300px"
    :return-value.sync="content"
    v-if="$attrs.popup == true || $attrs.popup === ''"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :ename="$attrs.ename"
        :id="$attrs.id"
        :disabled="$attrs.disabled"
        :label="$attrs.label"
        v-model="getFormattedDate"
        v-on="on"
        :rules="rules"
        :placeholder="$attrs.placeholder"
      ></v-text-field>
    </template>
    <v-date-picker
      :ename="$attrs.ename"
      :id="$attrs.id"
      :color="colors.primary"
      no-title
      scrollable
      v-bind="$attrs"
      v-model="content"
      :locale="'Fr'"
      :first-day-of-week="1"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Annuler</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(content)">OK</v-btn>
    </v-date-picker>
  </v-menu>
  <v-date-picker
    v-else
    :color="colors.primary"
    no-title
    scrollable
    v-bind="$attrs"
    v-model="content"
    :locale="'Fr'"
    :first-day-of-week="1"
    :class="$attrs.tripStyle"
    @change="$emit('change', $event)"
  ></v-date-picker>
</template>
<script>
import { ednRequired } from './mixins/ednRequired'
import { ednVModel } from './mixins/ednVModel'
import { format as fnsFormat, parseISO as fnsParseISO, isValid as fnsIsValid, parse as fnsParse } from 'date-fns'

export default {
  inheritAttrs: false,
  mixins: [ednRequired, ednVModel],
  props: {
    format: {
      type: String,
      default: () => 'dd-MM-yyyy',
    },
  },
  data() {
    return {
      menu: null,
      colors: {
        primary: this.$vuetify.theme.currentTheme.primary,
        secondary: this.$vuetify.theme.currentTheme.secondary,
      },
    }
  },
  computed: {
    getFormattedDate: {
      get() {
        if (this.content) {
          console.log(fnsFormat(fnsParseISO(this.content), this.format))
          return fnsFormat(fnsParseISO(this.content), this.format)
        }
      },
      set(value) {
        if (value !== '') {
          return value
        } else {
          return ''
        }
      },
    },
  },
  created() {
    this.$vuetify.theme.currentTheme.primary
  },
}
</script>
<style lang="stylus">
div.tripStyle
  div.v-date-picker
    &-header
      background-color #fafafa

    &-table
      th
        color black

      button.v-btn
        &.v-btn--disabled
          background-color transparent
          box-shadow none

        &.v-date-picker-table__current
          border none
          box-shadow 0 1px 0 0 var(--v-primary-lighten1), inset 0 -1px 0 0 var(--v-primary-base)

        &:hover
          &::before
            opacity 0

          margin-top -1px
          box-shadow 0 1px 0 0 #c5c5ca, inset 0 -1px 0 0 #4e4e56

        background-color white
        transition all 0.3s
        box-shadow 0 1px 0 0 #c5c5ca
        margin 2px
        border-radius 0.4em

      background-color #fafafa
      height 275px
</style>