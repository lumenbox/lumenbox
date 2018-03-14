import { when } from 'cerebral/operators'
import { state, string } from 'cerebral/tags'
import formSubmitted from '../../../signals/formSubmitted'
import { goTo } from '@cerebral/router/operators'

export default [
  when(state`domain.selectedDomainId`),
  {
    true: formSubmitted({
      put: string`/api/domain/${state`domains.selectedDomainId`}`,
      form: state`domains.domainForm`,
      isLoading: state`domains.isLoading`,
      successMessage: 'Domain Saved',
      successChain: [goTo('/')]
    }),
    false: formSubmitted({
      post: '/api/domain',
      form: state`domains.domainForm`,
      isLoading: state`domains.isLoading`,
      successMessage: 'Domain Created',
      successChain: [goTo('/')]
    })
  }
]
