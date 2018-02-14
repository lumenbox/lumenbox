export default {
  password: {
    value: '',
    isRequired: true
  },
  newPassword: {
    value: '',
    isRequired: true
  },
  repeatNewPassword: {
    value: '',
    isRequired: true,
    validationRules: ['equalsField:auth.changePasswordForm.newPassword']
  }
}
