import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { resetForm, setField } from '@cerebral/forms/operators'
import routed from '../../../signals/routed'

export default [
  set(state`accounts.selectedAccountId`, props`accountId`),
  resetForm(state`accounts.accountForm`),
  routed('account', { authroised: true }),
  setField(state`accounts.accountForm.id`, props`accountId`),
  setField(state`accounts.accountForm.account`, state`accounts.data.${props`accountId`}.account`),
  setField(state`accounts.accountForm.name`, state`accounts.data.${props`accountId`}.name`),
  setField(state`accounts.accountForm.domainId`, state`accounts.data.${props`accountId`}.domainId`),
  setField(state`accounts.accountForm.signature`, state`accounts.data.${props`accountId`}.signature`),
  setField(state`accounts.accountForm.memo`, state`accounts.data.${props`accountId`}.memo`),
  setField(state`accounts.accountForm.memoType`, state`accounts.data.${props`accountId`}.memoType`),
  setField(state`accounts.accountForm.nameAvailability`, true)
]
