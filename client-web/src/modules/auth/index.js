import { Module } from 'cerebral'
import routed from 'signals/routed'
import FieldChanged from 'signals/FieldChanged'
import loginFormSubmitted from './signals/loginFormSubmitted'
import passwordResetRequestFormSubmitted from './signals/passwordResetRequestFormSubmitted'
import passwordResetFormSubmitted from './signals/passwordResetFormSubmitted'
import logoutClicked from './signals/logoutClicked'
// import tokenWillExpire from './signals/tokenWillExpire';
import passwordResetRouted from './signals/passwordResetRouted'

export default options =>
  Module({
    state: {
      isLoading: false,
      user: null,
      token: null,
      loginForm: {
        email: {
          value: '',
          isRequired: true,
          validationRules: ['isEmail']
        },
        password: {
          value: '',
          isRequired: true
        }
      },
      passwordResetRequestForm: {
        email: {
          value: '',
          isRequired: true,
          validationRules: ['isEmail']
        }
      },
      passwordResetForm: {
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
    },
    signals: {
      loginRouted: routed('login'),
      passwordResetRequestRouted: routed('passwordResetRequest'),
      passwordResetRouted,
      fieldChanged: FieldChanged('auth'),
      loginFormSubmitted,
      passwordResetRequestFormSubmitted,
      passwordResetFormSubmitted,
      logoutClicked
      // tokenWillExpire
    }
  })
