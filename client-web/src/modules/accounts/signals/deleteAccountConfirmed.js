import { set } from 'cerebral/operators'
import { state, string } from 'cerebral/tags'
import formSubmitted from '../../../signals/formSubmitted'
import { goTo } from '@cerebral/router/operators'
import { resetForm } from '@cerebral/forms/operators'

export default [
  set(state`accounts.showConformDelete`, false),
  formSubmitted({
    deletePath: string`/api/account/${state`accounts.selectedAccountId`}`,
    isLoading: state`accounts.isLoading`,
    successMessage: 'Account deleted',
    successChain: [resetForm(state`accounts.accountForm`), goTo('/')]
  })
]
