import * as React from 'react'

const Icon = ({ name }) => (
  <span className="icon">
    <i className={`fas fa-${name}`} />
  </span>
)

export default Icon
