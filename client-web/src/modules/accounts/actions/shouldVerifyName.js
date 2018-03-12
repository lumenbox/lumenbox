import { state } from 'cerebral/tags'
import { form } from '@cerebral/forms'

const formTag = state`accounts.accountForm`

export default function shouldVerifyName({ props: { name }, state, path, resolve }) {
  const accountForm = resolve.value(form(formTag))
  if (accountForm.name.isValid && accountForm.domainId.isValid) {
    return path['true']()
  }
  state.set('accounts.accountForm.nameAvailability.value', false)
  return path['false']()
}
