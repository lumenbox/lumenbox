export default {
  email: {
    value: '',
    isRequired: true,
    validationRules: ['isEmail']
  },
  newPassword: {
    value: '',
    isRequired: true,
    validationRules: ['minLength:8']
  },
  repeatPassword: {
    value: '',
    isRequired: true,
    validationRules: ['equalsField:auth.passwordResetForm.newPassword']
  },
  token: {
    value: null
  }
}
