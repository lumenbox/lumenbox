import App from './app'
import Auth from './auth'
import Domains from './domains'
import Accounts from './accounts'
import router from './router'

export default options => ({
  app: App(options),
  auth: Auth(options),
  domains: Domains(options),
  accounts: Accounts(options),
  router
})
