import { set, when, debounce } from 'cerebral/operators'
import { state, props, resolveObject } from 'cerebral/tags'
import FieldChanged from '../../../signals/fieldChanged'
import { httpPost } from '@cerebral/http/operators'
import { setField } from '@cerebral/forms/operators'
import notify from '../../../actions/notify'
import shouldVerifyDomain from '../actions/shouldVerifyDomain'

export default [
  FieldChanged('domains'),
  when(props`name`, name => name === 'domainForm.domain'),
  {
    true: [
      setField(state`domains.domainForm.domainAvailability`, null),
      debounce(500),
      {
        continue: [
          shouldVerifyDomain,
          {
            true: [
              set(state`domains.isLoading`, true),
              httpPost(
                '/api/verify-domain',
                resolveObject({
                  domainId: state`domains.selectedDomainId`,
                  domain: state`domains.domainForm.domain.value`
                })
              ),
              {
                '404': setField(state`domains.domainForm.domainAvailability`, true),
                success: setField(state`domains.domainForm.domainAvailability`, false),
                error: notify('ERROR', 'Failed to verify domain availability')
              },
              set(state`domains.isLoading`, false)
            ],
            false: []
          }
        ],
        discard: []
      }
    ],
    false: []
  }
]
