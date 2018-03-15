import * as React from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

const Footer = styled.footer`
  justify-content: flex-end;
`

const Dialog = ({ isOpen, onClose, onOk, title, okLabel = 'OK', okClassName, cancelLabel, children }) =>
  isOpen ? (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        {title && (
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" aria-label="close" onClick={onClose} />
          </header>
        )}
        <section className="modal-card-body">{children}</section>
        {(onOk || cancelLabel) && (
          <Footer className="modal-card-foot">
            {cancelLabel && (
              <button className="button" onClick={onClose}>
                {cancelLabel}
              </button>
            )}
            {onOk && (
              <button className={classNames('button', 'is-success', okClassName)} onClick={onOk}>
                {okLabel}
              </button>
            )}
          </Footer>
        )}
      </div>
    </div>
  ) : (
    <span />
  )

export default Dialog
