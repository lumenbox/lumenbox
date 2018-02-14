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
  repeatPassword: {
    value: '',
    isRequired: true,
    validationRules: ['equalsField:auth.passwordResetForm.password']
  }
}
