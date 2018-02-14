import * as React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'
import * as classNames from 'classnames'
import styled from 'styled-components'
import { TransitionMotion, spring } from 'react-motion'

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: fixed;
  bottom: 0;
  right: 24px;
  width: 300px;
  max-width: 100vw;
  overflow: visible;
`

const Notification = styled.div`
  overflow: visible;
`

const Notifications = ({ notifications = [] }) => (
  <TransitionMotion
    willEnter={/* istanbul ignore next */ () => ({ opacity: 0, marginBottom: 200 })}
    willLeave={/* istanbul ignore next */ () => ({ opacity: spring(0), maxHeight: spring(0) })}
    styles={notifications.map(notification => ({
      key: notification.key,
      data: notification,
      style: {
        opacity: spring(1),
        marginBottom: spring(24),
        maxHeight: notification.title && notification.message ? 90 : 60
      }
    }))}>
    {interpolatedStyles => (
      <NotificationContainer>
        {interpolatedStyles.map(({ key, data: { className, title, message }, style }) => (
          <div key={key} style={style}>
            <Notification className={classNames('message', className)}>
              {title && (
                <div className="message-header">
                  <p>{title}</p>
                </div>
              )}
              {message && <div className="message-body">{message}</div>}
            </Notification>
          </div>
        ))}
      </NotificationContainer>
    )}
  </TransitionMotion>
)

export default connect(
  {
    notifications: state`app.notifications`
  },
  Notifications
)
