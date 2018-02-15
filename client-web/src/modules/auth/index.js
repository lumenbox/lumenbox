import { Module } from 'cerebral'
import routed from '../../signals/routed'
import FieldChanged from '../../signals/fieldChanged'
import loginFormSubmitted from './signals/loginFormSubmitted'
import passwordResetRequestFormSubmitted from './signals/passwordResetRequestFormSubmitted'
import passwordResetFormSubmitted from './signals/passwordResetFormSubmitted'
import logoutClicked from './signals/logoutClicked'
import tokenWillExpire from './signals/tokenWillExpire'
import passwordResetRouted from './signals/passwordResetRouted'
import loginForm from './forms/login'
import changePasswordForm from './forms/changePassword'
import passwordResetRequestForm from './forms/passwordResetRequest'
import passwordResetForm from './forms/passwordReset'
import registerForm from './forms/register'
import registerFormSubmitted from './signals/registerFormSubmitted'
import changePasswordSubmitted from './signals/changePasswordSubmitted'

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
      loginRouted: routed('login'),
      registerRouted: routed('register'),
      registerCompleteRouted: routed('registerComplete'),
      passwordResetRequestRouted: routed('passwordResetRequest'),
      passwordResetRouted,
      fieldChanged: FieldChanged('auth'),
      loginFormSubmitted,
      registerFormSubmitted,
      changePasswordSubmitted,
      passwordResetRequestFormSubmitted,
      passwordResetFormSubmitted,
      logoutClicked,
      tokenWillExpire
    }
  })
