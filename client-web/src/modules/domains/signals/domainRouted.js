import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { resetForm, setField } from '@cerebral/forms/operators'
import routed from '../../../signals/routed'

export default [
  set(state`domains.selectedDomainId`, props`domainId`),
  resetForm(state`domains.domainForm`),
  routed('domain', { authroised: true }),
  setField(state`domains.domainForm.id`, props`domainId`),
  setField(state`domains.domainForm.domain`, state`domains.data.${props`domainId`}.domain`),
  setField(state`domains.domainForm.domainAvailability`, true)
]
