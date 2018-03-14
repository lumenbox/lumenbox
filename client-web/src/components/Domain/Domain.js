import * as React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import { form } from '@cerebral/forms'
import classNames from 'classnames'
import accounts from '../../computes/accounts'
import Button from '../Button'
import Input from '../Input'
import Dialog from '../Dialog'

const Domain = ({
  isLoading,
  domainId,
  domainForm,
  accounts,
  showConfirmDelete,
  fieldChanged,
  domainFormSubmitted,
  deleteDomainClicked,
  deleteDomainConfirmed,
  deleteDomainCanceled
}) => (
  <section className="section">
    <form
      className="container"
      onSubmit={
        /* istanbul ignore next */ e => {
          e.preventDefault()
          domainFormSubmitted()
        }
      }>
      <div className="columns">
        <div className="column">
          <h1 className="title">Domain</h1>
        </div>
        <div className="column">
          {domainId && (
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <Button
                  className="is-danger is-small"
                  onClick={e => {
                    e.preventDefault()
                    deleteDomainClicked()
                  }}
                  title={accounts.length > 0 ? 'To delete this domain, please remove all accounts first' : ''}
                  disabled={accounts.length > 0}>
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Input
        label="Name"
        type="text"
        placeholder="enter your domain name"
        isLoading={domainForm.domainAvailability.value === null}
        value={domainForm.domain.value}
        isPristine={domainForm.domain.isPristine}
        isValid={domainForm.domain.isValid && domainForm.domainAvailability.value !== false}
        errorMessage={domainForm.domain.isValid ? 'domain is already registered' : 'must be a valid domain name'}
        onChange={value => fieldChanged({ name: 'domainForm.domain', value })}
      />
      <div className="field is-grouped is-grouped-right">
        <div className="control">
          <a className="button is-text" href="/">
            Cancel
          </a>
        </div>
        <div className="control">
          <Button
            type="submit"
            className={classNames('submit-button', 'is-link', { 'is-loading': isLoading })}
            disabled={!domainForm.isValid}>
            {domainId ? 'Save' : 'Create'}
          </Button>
        </div>
      </div>
    </form>
    <Dialog
      isOpen={showConfirmDelete}
      onClose={() => deleteDomainCanceled()}
      onOk={() => deleteDomainConfirmed()}
      title="Delete Domain"
      okLabel="Delete"
      okClassName="is-danger"
      cancelLabel="Cancel">
      Are you sure you want to delete {domainForm.domain.value}?
    </Dialog>
  </section>
)

export default connect(
  {
    isLoading: state`domains.isLoading`,
    domainId: state`domains.selectedDomainId`,
    domainForm: form(state`domains.domainForm`),
    accounts: accounts(state`domains.selectedDomainId`),
    showConfirmDelete: state`domains.showConfirmDelete`,
    fieldChanged: signal`domains.fieldChanged`,
    domainFormSubmitted: signal`domains.domainFormSubmitted`,
    deleteDomainClicked: signal`domains.deleteDomainClicked`,
    deleteDomainConfirmed: signal`domains.deleteDomainConfirmed`,
    deleteDomainCanceled: signal`domains.deleteDomainCanceled`
  },
  Domain
)
