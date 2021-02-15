//Mixin de transfert bilatéral du v-model
export const ednSocialIcon = {
  data() {
    return {
      arrSocial: ['twitter', 'linkedin', 'facebook'],
      socialIcon: null,
    }
  },
  computed: {
    getPrepIcon: {
      get: function() {
        return this.socialIcon ? this.socialIcon : ''
      },
      set: function(newValue) {
        this.socialIcon = newValue
      },
    }
  },
}
