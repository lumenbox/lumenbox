import * as React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import { form } from '@cerebral/forms'
import classNames from 'classnames'
import Button from '../Button'
import Input from '../Input'
import Select from '../Select'
import domains from '../../computes/domains'
import config from '../../config'
import Icon from '../Icon'
import Spinner from '../Spinner'
import Dialog from '../Dialog'

const Account = ({
  isLoading,
  accountId,
  accountForm,
  accountName,
  domains,
  domainList,
  showConformDelete,
  fieldChanged,
  accountFormSubmitted,
  deleteAccountClicked,
  deleteAccountConfirmed,
  deleteAccountCanceled
}) => (
  <section className="section">
    <form
      className="container"
      onSubmit={
        /* istanbul ignore next */ e => {
          e.preventDefault()
          accountFormSubmitted()
        }
      }>
      <div className="columns">
        <div className="column">
          <h1 className="title">Account</h1>
          <h4 className="subtitle">
            {accountName}{' '}
            {accountForm.nameAvailability.value === null ? (
              <Spinner key="checking" />
            ) : accountForm.nameAvailability.value ? (
              <Icon key="available" name="check" className="has-text-success" />
            ) : (
              !accountForm.name.isPristine &&
              !accountForm.domainId.isPristine && <Icon key="taken" name="times" className="has-text-danger" />
            )}
          </h4>
        </div>
        <div className="column">
          {accountId && (
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <Button
                  className="is-danger is-small"
                  onClick={e => {
                    e.preventDefault()
                    deleteAccountClicked()
                  }}>
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
        placeholder="enter your account name"
        {...accountForm.name}
        errorMessage={'can only contain a-z0-9.@- and must be between 4 and 32 characters long'}
        onChange={value => fieldChanged({ name: 'accountForm.name', value })}
      />
      <Select
        label="Domain"
        placeholder="select a domain"
        options={domainList}
        {...accountForm.domainId}
        onChange={value => fieldChanged({ name: 'accountForm.domainId', value })}
      />
      <Input
        label="Account"
        type="text"
        placeholder="your lumen public key"
        {...accountForm.account}
        errorMessage={'must be a valid public key'}
        onChange={value => fieldChanged({ name: 'accountForm.account', value })}
      />
      <Select
        label="Memo Type"
        options={[{ label: 'optional memo type', value: '' }, ...config.memoTypes]}
        {...accountForm.memoType}
        onChange={value => fieldChanged({ name: 'accountForm.memoType', value })}
      />
      {accountForm.memoType.value && (
        <Input
          label="Memo"
          type="text"
          placeholder={config.memoTypes.find(memoType => memoType.value === accountForm.memoType.value).description}
          {...accountForm.memo}
          onChange={value => fieldChanged({ name: 'accountForm.memo', value })}
        />
      )}
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
            disabled={!accountForm.isValid}>
            {accountId ? 'Save' : 'Create'}
          </Button>
        </div>
      </div>
    </form>
    <Dialog
      isOpen={showConformDelete}
      onClose={() => deleteAccountCanceled()}
      onOk={() => deleteAccountConfirmed()}
      title="Delete Account"
      okLabel="Delete"
      okClassName="is-danger"
      cancelLabel="Cancel">
      Are you sure you want to delete {accountName}?
    </Dialog>
  </section>
)

export default connect(
  {
    isLoading: state`accounts.isLoading`,
    accountId: state`accounts.selectedAccountId`,
    accountForm: form(state`accounts.accountForm`),
    domains: state`domains.data`,
    domainList: domains,
    showConformDelete: state`accounts.showConformDelete`,
    fieldChanged: signal`accounts.fieldChanged`,
    accountFormSubmitted: signal`accounts.accountFormSubmitted`,
    deleteAccountClicked: signal`accounts.deleteAccountClicked`,
    deleteAccountConfirmed: signal`accounts.deleteAccountConfirmed`,
    deleteAccountCanceled: signal`accounts.deleteAccountCanceled`
  },
  props =>
    Object.assign(
      {
        accountName: `${props.accountForm.name.value || 'name'}*${
          props.accountForm.domainId.value ? props.domains[props.accountForm.domainId.value].domain : 'domain'
        }`
      },
      props
    ),
  Account
)
