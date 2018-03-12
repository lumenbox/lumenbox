import * as React from 'react'
import classNames from 'classnames'

import Icon from '../Icon'

const Button = ({ className, style, href, onClick, icon, type, children, title }) =>
  React.createElement(
    href ? 'a' : 'button',
    {
      className: classNames('button', className),
      style,
      href,
      type,
      title,
      disabled: !href && !onClick
    },
    [icon && <Icon key="icon" name={icon} />, <span key="children">{children}</span>]
  )

export default Button
