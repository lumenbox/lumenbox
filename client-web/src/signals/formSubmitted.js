import { httpPost, httpPut, httpDelete } from '@cerebral/http/operators'
import { set } from 'cerebral/operators'
import { props } from 'cerebral/tags'
import { isValidForm, resetForm } from '@cerebral/forms/operators'
import parseError from '../actions/parseError'
import notify from '../actions/notify'
import formToJson from '../actions/formToJson'

export default ({
  post,
  put,
  deletePath,
  form,
  isLoading,
  successMessage,
  successChain = [],
  unauthorisedMessage = 'Not authroised',
  unauthorisedChain = [],
  errorMessage = 'Unexpected Error',
  errorChain = []
}) => {
  const chain = [
    ...(isLoading ? [set(isLoading, true)] : []),
    ...(form ? [formToJson(props`formData`, form)] : []),
    deletePath ? httpDelete(deletePath) : post ? httpPost(post, props`formData`) : httpPut(put, props`formData`),
    {
      '401': [parseError(unauthorisedMessage), notify('ERROR', props`errorMessage`), ...unauthorisedChain],
      success: [
        ...(successMessage ? [notify('SUCCESS', successMessage)] : []),
        ...(form ? [resetForm(form)] : []),
        ...successChain
      ],
      error: [parseError(errorMessage), notify('ERROR', props`errorMessage`), ...errorChain]
    },
    ...(isLoading ? [set(isLoading, false)] : [])
  ]

  return form
    ? [
        isValidForm(form),
        {
          true: chain,
          false: []
        }
      ]
    : chain
}
