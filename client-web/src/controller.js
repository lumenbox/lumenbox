import { Controller, Module } from 'cerebral'
import Devtools from 'cerebral/devtools' // eslint-disable-line import/no-named-as-default
import Modules from './modules'
import FormsProvider from '@cerebral/forms'
import HttpProvider from '@cerebral/http'
import config from './config'

export default Controller(
  Module({
    state: {},
    modules: Modules({}),
    providers: {
      forms: FormsProvider({
        rules: {},
        errorMessages: {}
      }),
      http: HttpProvider({
        baseUrl: document.location.origin + config.baseUrl,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Accept: 'application/json'
        },
        withCredentials: false
      })
    }
  }),
  {
    devtools:
      process.env.NODE_ENV !== 'development'
        ? undefined
        : Devtools({
            host: 'localhost:8585',
            storeMutations: true,
            preventExternalMutations: true,
            bigComponentsWarning: 10
          })
  }
)
