export default {
  email: {
    value: '',
    isRequired: true,
    validationRules: ['isEmail']
  },
  password: {
    value: '',
    isRequired: true
  },
  activationKey: {
    value: undefined
  }
}
