import { set } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import { resetForm } from '@cerebral/forms/operators'
import routed from '../../../signals/routed'

export default [set(state`domains.selectedDomainId`, null), resetForm(state`domains.domainForm`), routed('domain')]
