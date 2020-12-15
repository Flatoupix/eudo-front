<template>
  <v-menu
    ref="dTPkr"
    v-model="menu"
    transition="fade-transition"
    min-width="280"
    :close-on-content-click="false"
    :close-on-click="false"
    offset-y
    allow-overflow
    offset-overflow
  >
    <template v-slot:activator="{ on }">
      <v-input
        :ename="$attrs.ename"
        :id="$attrs.id"
        ref="dateIn"
        class="dateTimeInput v-text-field row no-gutters pa-0"
        @keypress.enter.native="userSave"
        @keypress.esc.native="userCancel"
        @keyup.native="menu = false"
        @keyup.backspace.native="menu = false"
        cols="5"
        :rules="rules"
        v-click-outside="closeMenu"
      >
        <label class="v-label v-label--active theme--light" style="position: absolute">{{ $attrs.label }}</label>
        <v-col cols="3">
          <v-icon :color="currentTab === 0 && $refs.dateIn.isFocused ? getColorIcon : ''" class="mr-2"
            >mdi-calendar-range</v-icon
          >
          <input
            @mouseover="closeLocked = true"
            @mouseout="closeLocked = false"
            id="dateField"
            type="text"
            v-model.lazy="formattedSavedDate"
            @focus="customFocus(true, 0)"
            :placeholder="$attrs.placeholder ? $attrs.placeholder : format"
            @blur="customFocus(false)"
            @click="openMenu()"
            autocomplete="off"
          />
          <!-- <v-icon :ripple="false" class="mr-2" v-if="savedDate != null" @click="savedDate = ''">mdi-close</v-icon> -->
        </v-col>
        <v-col cols="2">
          <v-icon :color="currentTab === 1 && $refs.dateIn.isFocused ? getColorIcon : ''" class="mr-2"
            >mdi-clock-time-four</v-icon
          >
          <input
            @mouseover="closeLocked = true"
            @mouseout="closeLocked = false"
            id="timeField"
            v-model="savedTime"
            placeholder="hh:mm"
            @focus="customFocus(true, 1)"
            @blur="customFocus(false)"
            @click="openMenu()"
          />
        </v-col>
      </v-input>
    </template>
    <v-card
      max-width="300"
      ref="dateTimePicard"
      @mouseover="closeLocked = true"
      @mouseout="closeLocked = false"
      @keypress.enter.native="userSave"
      @keypress.esc.native="userCancel"
    >
      <v-tabs fixed-tabs v-model="currentTab" hide-slider>
        <v-tab>
          <v-icon>mdi-calendar-range</v-icon>
        </v-tab>
        <v-tab>
          <v-icon>mdi-clock-time-four</v-icon>
        </v-tab>
        <v-tab-item>
          <edn-date v-model="savedDate" :format="format" @input="inputDate($event)"></edn-date>
        </v-tab-item>
        <v-tab-item>
          <edn-time
            no-title
            ref="timePicker"
            v-model="savedTime"
            @input="inputCheck($event)"
            @click:minute="menu = false"
          ></edn-time>
        </v-tab-item>
      </v-tabs>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn text color="primary" @click="userCancel">Annuler</v-btn> -->
        <v-btn text color="primary" @click="userSave">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
import { ednRequired } from './mixins/ednRequired'
// import { ednVModel } from './mixins/ednVModel'
import { format as fnsFormat, parseISO as fnsParseISO, isValid as fnsIsValid, parse as fnsParse } from 'date-fns'

export default {
  inheritAttrs: false,
  mixins: [ednRequired],

  props: {
    value: null,
    format: {
      type: String,
      default: () => 'dd-MM-yyyy',
    },
    invalidDateMsg: {
      type: String,
      default: () => 'Vous devez entrer une date et une heure valide.',
    },
  },
  watch: {
    content() {
      this.$emit('input', this.content)
    },
    value() {
      if (this.value != this.content) {
        if (fnsIsValid(new Date(this.value))) {
          this.content = this.value
        } else if (this.value === '') {
          this.content = ''
        }
      }
    },
  },
  data() {
    return {
      menu: false, //Définit si le menu est visible ou non
      closeLocked: false,
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

  mounted() {
    this.$vuetify.theme.currentTheme.primary
    this.rules.push((v) => fnsIsValid(v) || this.invalidDateMsg) // Règle poussée pour faire un callback en cas d'erreur de format.
  },
  computed: {
    getColorIcon() {
      if (this.menu) return this.colors.primary
    },
    formattedSavedDate: {
      get() {
        if (this.savedDate) {
          return fnsFormat(fnsParseISO(this.savedDate), this.format)
        }
      },
      set(value) {
        let dateString
        if (value !== '') {
          let parsetoDate = fnsParse(value, this.format, new Date())
          let parseToSystemFormat = fnsFormat(parsetoDate, 'yyyy-MM-dd')
          this.savedDate = parseToSystemFormat
          dateString = this.savedDate + 'T' + this.savedTime
        } else {
          this.savedDate = this.savedTime = ''
          dateString = null
        }
        this.$emit('input', dateString)
      },
    },
  },
  methods: {
    openMenu() {
      this.menu = true
    },
    customFocus(bool, tab) {
      //bool : est-ce que le focus est actif
      //tab : quel onglet est concerné

      this.$refs.dateIn.hasColor = bool
      this.$refs.dateIn.isFocused = bool

      if (tab != null || undefined) {
        this.currentTab = tab
      }
    },
    closeMenu() {
      if (!this.closeLocked) {
        this.menu = false
        if (this.$refs.timePicker) this.$refs.timePicker.resetSelect()
      }
    },
    inputCheck(e) {
      if (e && e.includes(':')) this.$refs.timePicker.selectMin()
      // let fnsDate = this.savedDate + 'T' + this.savedTime
      //   fnsParseISO(fnsDate)
      if (fnsIsValid(new Date(this.savedDate + 'T' + this.savedTime))) {
        // this.$refs.timePicker.resetSelect() //Permet d'envoyer un reset au timePicker

        this.$emit('input', this.savedDate + 'T' + this.savedTime)
      } else if (this.savedDate === '' && this.savedTime === '') {
        // this.$refs.timePicker.resetSelect('clear') //Permet d'envoyer un reset au timePicker et une RàZ des datas

        this.$emit('input', '')
      }
    },
    inputDate(e) {
      this.currentTab = 1
      this.savedDate = e
      this.inputCheck()
      // this.$emit('input', e + 'T' + this.savedTime)
    },
    userSave() {
      this.$refs.dTPkr.save(this.formattedSavedDate)
      setTimeout(() => {
        this.currentTab = null
        if (this.$refs.timePicker) {
          this.$refs.timePicker.resetSelect()
        }
      }, 500)
    },
    userClear() {
      this.$refs.timePicker.resetSelect('clear')
    },
    userCancel(key) {
      this.menu = false
      this.currentTab = 0
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