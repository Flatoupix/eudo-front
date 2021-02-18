//Mixin des comportement mimic du nouveau mode fiche (iris)

export const ednMimicMix = {
  computed: {
    getAppendedIcon() {
      if (this.getIrisRdonlyMode) return 'mdi-lock'
      else if (this.$attrs?.irisMimic === '' && this.content.length > 0) return 'mdi-pencil'
    },
    getIrisRdonlyMode() {
      return this.$attrs?.rdonly === '' && this.$attrs?.irisMimic === ''
    },
    /**
     * Récupère le nom du slot et place le tooltip
     * différemment si on a le cadenas ou pas
     */
    getSlotName() {
      return this.getAppendedIcon ? 'append-outer' : 'append'
    },
  },
  methods: {
    focusOnInput() {
      this.$refs?.input?.focus()
    },
  },
}
