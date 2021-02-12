//Mixin de transfert bilatéral du v-model
export const ednRegex = {
  props: {
    pattern: {
      type: RegExp
      // default: () =>
      //   /^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/i,
    },
    invalidMsg: {
      type: String,
      default: () => 'Vous devez entrer une adresse mail valide.',
      // default: () => ednRegex.data().oInvalidMsg[this.type],
    },
  },
  data() {
    return {
      oInvalidMsg:{
        mail:'Vous devez entrer une adresse mail valide.',
        url:'Vous devez entrer une url valide.'
      }
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
