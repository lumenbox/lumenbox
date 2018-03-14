import { Module } from 'cerebral'
import accountRouted from './signals/accountRouted'
import newAccountRouted from './signals/newAccountRouted'
import accountFormSubmitted from './signals/accountFormSubmitted'
import fieldChanged from './signals/fieldChanged'
import deleteAccountClicked from './signals/deleteAccountClicked'
import deleteAccountConfirmed from './signals/deleteAccountConfirmed'
import deleteAccountCanceled from './signals/deleteAccountCanceled'

export default options =>
  Module({
    state: {
      isLoading: false,
      selectedAccountId: null,
      accountForm: {
        id: {},
        account: { value: '', isRequired: true, validationRules: ['isPublicKey'] },
        name: { value: '', isRequired: true, validationRules: [/^[a-z0-9.@-]{4,32}$/] },
        domainId: { value: null, isRequired: true },
        nameAvailability: { value: false, validationRules: ['isTrue'] },
        memoType: { value: '' },
        memo: { value: '', validationRules: ['isMemo'] },
        signature: { value: '' }
      },
      showConfirmDelete: false,
      data: {}
    },
    signals: {
      accountRouted,
      newAccountRouted,
      fieldChanged,
      accountFormSubmitted,
      deleteAccountClicked,
      deleteAccountConfirmed,
      deleteAccountCanceled
    }
  })
