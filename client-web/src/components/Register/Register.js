import * as React from 'react'
import { connect } from '@cerebral/react'
import { form } from '@cerebral/forms'
import { state, signal } from 'cerebral/tags'
import Input from '../Input'
import Checkbox from '../Checkbox'
import * as classNames from 'classnames'

const Register = ({ isLoading, registerForm, fieldChanged, registerFormSubmitted }) => (
  <section className="section">
    <form
      className="container"
      onSubmit={
        /* istanbul ignore next */ e => {
          e.preventDefault()
          registerFormSubmitted()
        }
      }>
      <h1 className="title">Register</h1>
      <Input
        label="First Name"
        type="text"
        {...registerForm.firstName}
        onChange={value => fieldChanged({ name: 'registerForm.firstName', value })}
      />
      <Input
        label="Last Name"
        type="text"
        {...registerForm.lastName}
        onChange={value => fieldChanged({ name: 'registerForm.lastName', value })}
      />
      <Input
        label="Email"
        type="email"
        id="email"
        autoComplete="email"
        {...registerForm.email}
        onChange={value => fieldChanged({ name: 'registerForm.email', value })}
      />
      <Input
        label="Password"
        type="password"
        id="password"
        {...registerForm.password}
        onChange={value => fieldChanged({ name: 'registerForm.password', value })}
      />
      <Input
        label="Repeat Password"
        type="password"
        id="repeatPassword"
        {...registerForm.repeatPassword}
        onChange={value => fieldChanged({ name: 'registerForm.repeatPassword', value })}
      />
      <Checkbox
        name="privacy"
        label="I accept the privacy policy"
        {...registerForm.acceptPrivacy}
        onChange={value => fieldChanged({ name: 'registerForm.acceptPrivacy', value: value })}
      />
      <Checkbox
        name="terms"
        label="I accept the terms and conditions"
        {...registerForm.acceptTerms}
        onChange={value => fieldChanged({ name: 'registerForm.acceptTerms', value: value })}
      />
      <div className="field is-grouped is-grouped-right">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'submit-button', 'is-success', { 'is-loading': isLoading })}
            disabled={!registerForm.isValid}>
            Register
          </button>
        </div>
      </div>
    </form>
  </section>
)

export default connect(
  {
    isLoading: state`auth.isLoading`,
    registerForm: form(state`auth.registerForm`),
    fieldChanged: signal`auth.fieldChanged`,
    registerFormSubmitted: signal`auth.registerFormSubmitted`
  },
  Register
)
