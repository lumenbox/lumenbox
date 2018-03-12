import { Module } from 'cerebral'
import accountRouted from './signals/accountRouted'
import newAccountRouted from './signals/newAccountRouted'
import accountFormSubmitted from './signals/accountFormSubmitted'
import fieldChanged from './signals/fieldChanged'

export default options =>
  Module({
    state: {
      isLoading: false,
      selectedAccountId: null,
      accountForm: {
        account: { value: '', isRequired: true, validationRules: ['isPublicKey'] },
        name: { value: '', isRequired: true, validationRules: [/^[a-z.@-]{4,32}$/] },
        domainId: { value: null, isRequired: true },
        nameAvailability: { value: false, validationRules: ['isTrue'] },
        memo: { value: '' },
        memoType: { value: '' }
      },
      data: {}
    },
    signals: {
      accountRouted,
      newAccountRouted,
      fieldChanged,
      accountFormSubmitted
    }
  })
