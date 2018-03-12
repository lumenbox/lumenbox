import { Module } from 'cerebral'
import accountRouted from './signals/accountRouted'
import newAccountRouted from './signals/newAccountRouted'
import accountFormSubmitted from './signals/accountFormSubmitted'
import FieldChanged from '../../signals/fieldChanged'

export default options =>
  Module({
    state: {
      isLoading: false,
      selectedAccountId: null,
      accountForm: {
        account: { value: '', required: true },
        name: { value: '', required: true },
        domainId: { value: null, required: true },
        memo: { value: '', required: true },
        memoType: { value: '', required: true }
      },
      data: {}
    },
    signals: {
      accountRouted,
      newAccountRouted,
      fieldChanged: FieldChanged('accounts'),
      accountFormSubmitted
    }
  })
