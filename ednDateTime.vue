<template>
  <v-menu
    ref="dTPkr"
    v-model="menu"
    transition="fade-transition"
    min-width="280"
    :close-on-content-click="false"
    :close-on-click="false"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-input
        ref="dateIn"
        class="dateTimeInput v-text-field row no-gutters pa-0"
        @keyup.enter.native="userSave"
        @keyup.esc.native="userCancel"
        cols="5"
        :rules="rules"
      >
        <label class="v-label v-label--active theme--light" style="position: absolute">{{ $attrs.label }}</label>
        <v-col cols="3">
          <v-icon :color="currentTab === 0 && $refs.dateIn.isFocused ? getColorIcon : ''" class="mr-2"
            >mdi-calendar-range</v-icon
          >
          <input
            id="dateField"
            type="text"
            v-model="savedDate"
            @focus="customFocus(true, 0)"
            :placeholder="format"
            @blur="customFocus(false)"
            v-on="menu == false ? on : null"
          />
        </v-col>
        <v-col cols="2">
          <v-icon :color="currentTab === 1 && $refs.dateIn.isFocused ? getColorIcon : ''" class="mr-2"
            >mdi-clock-time-four</v-icon
          >
          <input
            id="timeField"
            v-model="savedTime"
            placeholder="hh:mm"
            v-on="menu == false ? on : null"
            @focus="customFocus(true, 1)"
            @blur="customFocus(false)"
          />
        </v-col>
      </v-input>
    </template>
    <v-card max-width="300" ref="dateTimePicard">
      <v-tabs fixed-tabs v-model="currentTab" hide-slider @keyup.esc="userCancel">
        <v-tab>
          <v-icon>mdi-calendar-range</v-icon>
        </v-tab>
        <v-tab>
          <v-icon>mdi-clock-time-four</v-icon>
        </v-tab>
        <v-tab-item>
          <edn-date
            v-model="savedDate"
            @click.native="nextTab(savedDate)"
            :format="format"
            @input="inputDate($event)"
          ></edn-date>
        </v-tab-item>
        <v-tab-item>
          <edn-time no-title ref="timePicker" v-model="savedTime" @input="inputCheck($event)"></edn-time>
        </v-tab-item>
      </v-tabs>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="userCancel">Annuler</v-btn>
        <v-btn text color="primary" @click="userSave">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
import Vue from 'vue'
import { ednRequired } from './mixins/ednRequired'
import { ednVModel } from './mixins/ednVModel'
import { format, parseISO, isValid } from 'date-fns'

export default {
  inheritAttrs: false,
  mixins: [ednRequired, ednVModel],
  props: {
    format: {
      type: String,
      default: () => 'dd-MM-yyyy',
    },
    invalidDateMsg: {
      type: String,
      default: () => 'Vous devez entrer une date et une heure valide.',
    },
  },
  data() {
    return {
      menu: false, //Définit si le menu est visible ou non

      currentTab: null, //Définit l'onglet courant

      savedDate: this.value != null && this.value != '' ? this.value.split('T')[0] : null, //Stocke la date
      savedTime: this.value != null && this.value != '' ? this.value.split('T')[1].substr(0, 5) : null, //Stocke l'heure en ne gardant que l'heure et les minutes

      colors: {
        //Définit les couleurs de vuetify
        primary: this.$vuetify.theme.currentTheme.primary,
        secondary: this.$vuetify.theme.currentTheme.secondary,
      },
    }
  },
  computed: {
    isValidTime() {
      return isValid(new Date(this.savedDate + 'T' + this.savedTime)) // Vérifie si le date time est valide.
    },
    getColorIcon() {
      if (this.menu) return this.colors.primary
    },
  },
  mounted() {
    this.$vuetify.theme.currentTheme.primary
    this.rules.push((v) => isValid(v) || this.invalidDateMsg) // Règle poussée pour faire un callback en cas d'erreur de format.
  },

  methods: {
    customFocus(bool, tab) {
      //bool : est-ce que le focus est actif
      //tab : quel onglet est concerné

      this.$refs.dateIn.hasColor = bool
      this.$refs.dateIn.isFocused = bool

      if (tab != null || undefined) {
        this.currentTab = tab
      }
    },
    nextTab(date) {
      //Switch d'onglet

      this.savedDate = date
      this.currentTab = 1
    },

    inputCheck(e) {
      this.$refs.timePicker.resetSelect() //Permet d'envoyer un reset au timePicker
      if (e && e.includes(':')) this.$refs.timePicker.selectMin()
      this.$emit('input', this.savedDate + ' ' + this.savedTime)
    },

    inputDate(e) {
      this.$emit('input', this.savedDate + ' ' + this.savedTime)
    },

    userSave() {
      this.$refs.dTPkr.save(this.getDateTime)
      this.currentTab = null
      this.$refs.timePicker.resetSelect()
    },
    userCancel(key) {
      this.menu = false
      this.currentTab = 0
      this.savedDate = this.savedTime = null
      if (!key) this.$refs.timePicker.resetSelect('clear')
    },
  },
}
</script>
<style lang="stylus">
div.dateTimeInput
  div.col
    display flex
    padding 0

  label
</style>