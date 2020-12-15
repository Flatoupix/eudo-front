//Mixin de la méthode de vérification de number utilisée au sein d'XRM
export const isNumber = {
  methods: {
    isValidNumber(sNumber) {
      sNumber = sNumber + ''
      //sNumber = sNumber.replace(/\s/g, '');
      sNumber = sNumber.replace(/[\s\xA0]/gi, '')
      var regNumber = new RegExp('^[+-]?((\\d+((\\.|\\,)\\d*)?)|((\\.|\\,)\\d+))$', 'i')
      return regNumber.test(sNumber)
    },
  },
}
