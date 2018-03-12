import { set } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import { resetForm } from '@cerebral/forms/operators'
import routed from '../../../signals/routed'

export default [set(state`accounts.selectedAccountId`, null), resetForm(state`accounts.accountForm`), routed('account')]
