import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import routed from '../../../signals/routed'

export default [set(state`accounts.selectedAccountId`, props`accountId`), routed('account')]
