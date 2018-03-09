import * as React from 'react'

const Icon = ({ name, noWrap }) =>
  noWrap ? (
    <i className={`fas fa-${name}`} />
  ) : (
    <span className="icon">
      <i className={`fas fa-${name}`} />
    </span>
  )

export default Icon
