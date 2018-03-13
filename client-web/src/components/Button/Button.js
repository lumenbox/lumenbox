import * as React from 'react'
import classNames from 'classnames'

import Icon from '../Icon'

const Button = ({ className, style, href, onClick, icon, type, children, title, disabled }) =>
  React.createElement(
    href ? 'a' : 'button',
    {
      className: classNames('button', className),
      style,
      href: disabled ? '' : href,
      onClick: disabled ? () => {} : onClick,
      type,
      title,
      disabled
    },
    [icon && <Icon key="icon" name={icon} />, <span key="children">{children}</span>]
  )

export default Button
