//Mixin de transfert bilatéral du v-model
export const ednRegex = {
  props: {
    pattern: {
      type: RegExp
    }
  },
  mounted() {
    this.rules.push(v => (v && this.pattern.test(v)) || this.invalidMsg)
  },
  methods: {
    isReady(e) {
      this.readyToConvert = !e
    },
  },
}
