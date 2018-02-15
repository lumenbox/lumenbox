import { httpPost, httpPut } from '@cerebral/http/operators'
import { set } from 'cerebral/operators'
import { props } from 'cerebral/tags'
import { isValidForm, resetForm } from '@cerebral/forms/operators'
import parseError from '../actions/parseError'
import notify from '../actions/notify'
import formToJson from '../actions/formToJson'

export default ({
  post,
  put,
  form,
  isLoading,
  successMessage,
  successChain = [],
  unathorisedMessage = 'Not authroised',
  unathorisedChain = [],
  errorMessage = 'Unexpected Error',
  errorChain = []
}) => [
  isValidForm(form),
  {
    true: [
      ...(isLoading ? [set(isLoading, true)] : []),
      post ? httpPost(post, formToJson(form)) : httpPut(put, formToJson(form)),
      {
        '401': [notify('ERROR', unathorisedMessage), ...unathorisedChain],
        success: [...(successMessage ? [notify('SUCCESS', successMessage)] : []), resetForm(form), ...successChain],
        error: [parseError(errorMessage), notify('ERROR', props`errorMessage`), ...errorChain]
      },
      ...(isLoading ? [set(isLoading, false)] : [])
    ],
    false: []
  }
]
