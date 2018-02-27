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
    validationRules: ['equalsField:auth.registerForm.password']
  },
  firstName: {
    value: '',
    isRequired: true
  },
  lastName: {
    value: '',
    isRequired: true
  },
  acceptTerms: {
    value: false,
    isRequired: true
  },
  acceptPrivacy: {
    value: false,
    isRequired: true
  }
}
