import { set, when, debounce } from 'cerebral/operators'
import { state, props, resolveObject } from 'cerebral/tags'
import FieldChanged from '../../../signals/fieldChanged'
import { httpPost } from '@cerebral/http/operators'
import { setField } from '@cerebral/forms/operators'
import notify from '../../../actions/notify'
import shouldVerifyName from '../actions/shouldVerifyName'

export default [
  FieldChanged('accounts'),
  when(props`name`, name => ['accountForm.name', 'accountForm.domainId'].includes(name)),
  {
    true: [
      setField(state`accounts.accountForm.nameAvailability`, null),
      debounce(500),
      {
        continue: [
          shouldVerifyName,
          {
            true: [
              set(state`accounts.isLoading`, true),
              httpPost(
                '/api/verify-account',
                resolveObject({
                  accountId: state`accounts.selectedAccountId`,
                  name: state`accounts.accountForm.name.value`,
                  domainId: state`accounts.accountForm.domainId.value`
                })
              ),
              {
                '404': setField(state`accounts.accountForm.nameAvailability`, true),
                success: setField(state`accounts.accountForm.nameAvailability`, false),
                error: notify('ERROR', 'Failed to verify name availability')
              },
              set(state`accounts.isLoading`, false)
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
