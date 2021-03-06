import * as React from 'react'
import Accounts from '../Accounts'
import Domains from '../Domains'

const Dashboard = () => (
  <section className="section">
    <div className="container">
      <h1 className="title is-1">Dashboard</h1>
      <Accounts />
      <Domains />
    </div>
  </section>
)

export default Dashboard
