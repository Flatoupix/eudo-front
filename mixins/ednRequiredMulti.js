//Mixin de simplification de spécification de messages pour les champs obligatoires sur les catalaogues multiples.
export const ednRequired = {
  data() {
    return {
      rules: this.$attrs.required ? this.isRequired() : [],
    }
  },
  methods: {
    isRequired() {
      if (typeof this.$attrs.required === 'string') return [value => !!value.length || this.$attrs.required]
      else if (this.$attrs.required === true || this.$attrs.required === '')
        return [value => !!value.length || 'Merci de remplir ce champ']
    },
  },
}
