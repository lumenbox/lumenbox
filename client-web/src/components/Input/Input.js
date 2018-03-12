import * as React from 'react'
import * as classNames from 'classnames'
import Field from '../Field'

const Input = ({
  id,
  label,
  placeholder,
  type = 'text',
  icon,
  value,
  isPristine = true,
  isValid = true,
  hideValidationIcon = false,
  errorMessage,
  onChange,
  minLength,
  autoComplete = 'on'
}) => (
  <Field {...{ id, label, icon, isPristine, hideValidationIcon, errorMessage }}>
    <input
      className={classNames('input', { 'is-danger': !isPristine && !isValid })}
      type={type}
      placeholder={placeholder || label}
      id={id}
      value={value}
      minLength={minLength}
      onChange={/* istanbul ignore next */ e => onChange && onChange(e.target.value, e)}
      readOnly={!onChange}
      autoComplete={autoComplete}
    />
    {icon && (
      <span className="icon is-small is-left">
        <i className={`fa fa-${icon}`} />
      </span>
    )}
    {!hideValidationIcon &&
      !isPristine &&
      isValid && (
        <span className="icon is-small is-right">
          <i className="fa fa-check" />
        </span>
      )}
    {!hideValidationIcon &&
      !isPristine &&
      !isValid && (
        <span className="icon is-small is-right">
          <i className="fa fa-warning" />
        </span>
      )}
  </Field>
)

export default Input
