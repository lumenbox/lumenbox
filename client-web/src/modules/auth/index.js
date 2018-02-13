import { Module } from 'cerebral'

export default options =>
  Module({
    state: {
      isAuthenticated: false
    },
    signals: {}
  })
