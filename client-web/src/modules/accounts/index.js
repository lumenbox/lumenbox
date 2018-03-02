import { Module } from 'cerebral'
import accountRouted from './signals/accountRouted'
import newAccountRouted from './signals/newAccountRouted'

export default options =>
  Module({
    state: {
      selectedAccountId: null,
      data: {}
    },
    signals: {
      accountRouted,
      newAccountRouted
    }
  })
