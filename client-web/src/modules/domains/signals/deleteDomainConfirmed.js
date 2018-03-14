import { set } from 'cerebral/operators'
import { state, string } from 'cerebral/tags'
import formSubmitted from '../../../signals/formSubmitted'
import { goTo } from '@cerebral/router/operators'
import { resetForm } from '@cerebral/forms/operators'

export default [
  set(state`domain.showConfirmDelete`, false),
  formSubmitted({
    deletePath: string`/api/domain/${state`domains.selectedDomainId`}`,
    isLoading: state`domains.isLoading`,
    successMessage: 'Domain deleted',
    successChain: [resetForm(state`domains.domainForm`), goTo('/')]
  })
]
