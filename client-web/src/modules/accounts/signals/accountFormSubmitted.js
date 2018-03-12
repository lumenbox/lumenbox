import { when } from 'cerebral/operators'
import { state, string } from 'cerebral/tags'
import formSubmitted from '../../../signals/formSubmitted'
import { goTo } from '@cerebral/router/operators'

export default [
  when(state`accounts.selectedAccountId`),
  {
    true: formSubmitted({
      put: string`/api/account/${state`accounts.selectedAccountId`}`,
      form: state`accounts.accountForm`,
      isLoading: state`accounts.isLoading`,
      successMessage: 'Account Saved',
      successChain: [goTo('/')]
    }),
    false: formSubmitted({
      post: '/api/account',
      form: state`accounts.accountForm`,
      isLoading: state`accounts.isLoading`,
      successMessage: 'Account Created',
      successChain: [goTo('/')]
    })
  }
]
