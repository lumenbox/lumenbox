import { state } from 'cerebral/tags'
import { form } from '@cerebral/forms'

const formTag = state`domains.domainForm`

export default function shouldVerifyDomain({ props: { name }, state, path, resolve }) {
  const domainForm = resolve.value(form(formTag))
  if (domainForm.domain.isValid) {
    return path['true']()
  }
  state.set('domains.domainForm.domainAvailability.value', false)
  return path['false']()
}
