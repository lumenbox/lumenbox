import * as React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'
import classNames from 'classnames'
import domains from '../../computes/domains'
import styled from 'styled-components'
import Button from '../Button'

const A = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
`

const NoDomains = styled.td`
  text-align: center;
  font-weight: 500;
`

const Domains = ({ user = { limit: 0 }, domains }) => (
  <section className="section">
    <h2 className="title is-2">Domains</h2>

    <table className={classNames('table', 'is-striped', 'is-fullwidth', { 'is-hoverable': domains.length })}>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {!domains.length && (
          <tr>
            <NoDomains colSpan="4">No domains</NoDomains>
          </tr>
        )}
        {domains.map(domain => (
          <tr key={domain.id}>
            <td>
              <A href={`/domain/${domain.id}`}>{domain.domain}</A>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="field is-grouped is-grouped-right">
      <div className="control">
        <Button
          className="is-link"
          href="/domain/new"
          disabled={domains.length >= user.limit}
          icon="plus"
          title={
            user.limit > 0 && domains.length >= user.limit ? 'Maximum number of domains have already been added' : ''
          }>
          Add Domain
        </Button>
      </div>
    </div>
  </section>
)

export default connect(
  {
    user: state`auth.user`,
    domains: domains(false)
  },
  Domains
)
