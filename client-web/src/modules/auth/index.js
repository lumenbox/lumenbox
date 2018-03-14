import { Module } from 'cerebral'
import routed from '../../signals/routed'
import FieldChanged from '../../signals/fieldChanged'
import loginFormSubmitted from './signals/loginFormSubmitted'
import passwordResetRequestFormSubmitted from './signals/passwordResetRequestFormSubmitted'
import passwordResetFormSubmitted from './signals/passwordResetFormSubmitted'
import logoutClicked from './signals/logoutClicked'
import passwordResetRouted from './signals/passwordResetRouted'
import loginForm from './forms/login'
import changePasswordForm from './forms/changePassword'
import passwordResetRequestForm from './forms/passwordResetRequest'
import passwordResetForm from './forms/passwordReset'
import registerForm from './forms/register'
import registerFormSubmitted from './signals/registerFormSubmitted'
import changePasswordSubmitted from './signals/changePasswordSubmitted'
import activateRouted from './signals/activateRouted'

export default options =>
  Module({
    state: {
      isLoading: false,
      user: null,
      token: null,
      loginForm,
      changePasswordForm,
      passwordResetRequestForm,
      passwordResetForm,
      registerForm
    },
    signals: {
      registerRouted: routed('register', { authroised: true }),
      registerCompleteRouted: routed('registerComplete', { unauthorised: true }),
      activateRouted,
      changePasswordRouted: routed('changePassword', { authroised: true }),
      passwordResetRequestRouted: routed('passwordResetRequest', { unauthorised: true }),
      passwordResetRouted,
      fieldChanged: FieldChanged('auth'),
      loginFormSubmitted,
      registerFormSubmitted,
      changePasswordSubmitted,
      passwordResetRequestFormSubmitted,
      passwordResetFormSubmitted,
      logoutClicked
    }
  })
