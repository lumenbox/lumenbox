import * as React from 'react'
import { connect } from '@cerebral/react'
import { form } from '@cerebral/forms'
import { state, signal } from 'cerebral/tags'
import * as classNames from 'classnames'
import Input from '../Input'

const ChangePassword = ({ isLoading, passwordForm, fieldChanged, changePasswordSubmitted }) => (
  <form
    onSubmit={
      /* istanbul ignore next */ e => {
        e.preventDefault()
        changePasswordSubmitted()
      }
    }>
    <h2 className="title">Change Password</h2>
    <Input
      label="Current Password"
      type="password"
      icon="key"
      {...passwordForm.password}
      onChange={/* istanbul ignore next */ value => fieldChanged({ name: 'passwordForm.password', value })}
      autoComplete="off"
    />
    <Input
      label="New Passwod"
      type="password"
      icon="key"
      {...passwordForm.newPassword}
      onChange={/* istanbul ignore next */ value => fieldChanged({ name: 'passwordForm.newPassword', value })}
      autoComplete="off"
    />
    <Input
      label="Repeat Password"
      type="password"
      icon="key"
      {...passwordForm.repeatNewPassword}
      onChange={/* istanbul ignore next */ value => fieldChanged({ name: 'passwordForm.repeatNewPassword', value })}
      autoComplete="off"
    />
    <div className="field is-grouped is-grouped-right">
      <p className="control">
        <button
          type="submit"
          className={classNames('button', 'submit-button', 'is-success', { 'is-loading': isLoading })}
          disabled={!passwordForm.isValid}>
          Change Password
        </button>
      </p>
    </div>
  </form>
)

export default connect(
  {
    isLoading: state`auth.isLoading`,
    passwordForm: form(state`auth.changePasswordForm`),
    fieldChanged: signal`auth.fieldChanged`,
    changePasswordSubmitted: signal`auth.changePasswordSubmitted`
  },
  ChangePassword
)
