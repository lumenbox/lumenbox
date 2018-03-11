import * as React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'
import classNames from 'classnames'
import accounts from '../../computes/accounts'
import styled from 'styled-components'
import Icon from '../Icon'
import Button from '../Button'

const A = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
`

const NoAccounts = styled.td`
  text-align: center;
  font-weight: 500;
`

const Accounts = ({ user = { limit: 0 }, accounts, domains }) => (
  <section className="section">
    <h2 className="title is-2">Accounts</h2>

    <table className={classNames('table', 'is-striped', 'is-fullwidth', { 'is-hoverable': accounts.length })}>
      <thead>
        <tr>
          <th>Address</th>
          <th>Memo</th>
          <th>Memo Type</th>
          <th>Signed</th>
        </tr>
      </thead>
      <tbody>
        {!accounts.length && (
          <tr>
            <NoAccounts colSpan="4">No accounts</NoAccounts>
          </tr>
        )}
        {accounts.map(account => (
          <tr key={account.id}>
            <td>
              <A href={`/account/${account.id}`}>
                {account.name}*{domains[account.domainId].name}
              </A>
            </td>
            <td>
              <A href={`/account/${account.id}`}>{account.memo}</A>
            </td>
            <td>
              <A href={`/account/${account.id}`}>{account.memoType}</A>
            </td>
            <td>
              <A href={`/account/${account.id}`}>
                <Icon name={account.signature && account.revSignature ? 'check-square' : 'square'} />
              </A>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="field is-grouped is-grouped-right">
      <div className="control">
        <Button
          className="is-link"
          href="/account/new"
          disabled={accounts.length >= user.limit}
          icon="plus"
          title={
            user.limit > 0 && accounts.length >= user.limit
              ? 'Maximum number of accounts have already been created'
              : ''
          }>
          Add Account
        </Button>
      </div>
    </div>
  </section>
)

export default connect(
  {
    user: state`auth.user`,
    accounts: accounts(),
    domains: state`domains.data`
  },
  Accounts
)
