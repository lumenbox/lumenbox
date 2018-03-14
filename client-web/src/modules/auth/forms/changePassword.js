export default {
  password: {
    value: '',
    isRequired: true
  },
  newPassword: {
    value: '',
    isRequired: true,
    validationRules: ['minLength:8']
  },
  repeatNewPassword: {
    value: '',
    isRequired: true,
    validationRules: ['equalsField:auth.changePasswordForm.newPassword']
  }
}
