import * as React from 'react'
import Field from '../Field'

const Select = ({ id, label, placeholder, onChange, options = [], value, isPristine, isValid, errorMessage }) => (
  <Field {...{ id, label, isPristine, isValid, errorMessage }}>
    <div className="select">
      <select
        id={id}
        onChange={e => onChange && onChange(e.target.value, e)}
        value={typeof value === 'undefined' || value === null ? placeholder : value}>
        {placeholder && <option value={undefined}>{placeholder}</option>}
        {options.map((option, i) => (
          <option key={i} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </Field>
)

export default Select
