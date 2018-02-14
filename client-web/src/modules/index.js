import App from './app'
import Auth from './auth'
import router from './router'

export default options => ({
  app: App(options),
  auth: Auth(options),
  router
})
