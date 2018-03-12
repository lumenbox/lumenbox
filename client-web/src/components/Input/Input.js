import * as React from 'react'
import * as classNames from 'classnames'
import Field from '../Field'
import Icon from '../Icon'

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
  <Field {...{ id, label, icon, isPristine, isValid, hideValidationIcon, errorMessage }}>
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
    {icon && <Icon className="is-small is-left" name={icon} />}
    {!hideValidationIcon &&
      !isPristine &&
      isValid && <Icon className="is-small is-right has-text-success" name="check" />}
    {!hideValidationIcon &&
      !isPristine &&
      !isValid && <Icon className="is-small is-right has-text-danger" name="times" />}
  </Field>
)

export default Input
