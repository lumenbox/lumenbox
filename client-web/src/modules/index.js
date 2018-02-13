import App from './App'
import Auth from './auth'
import routes from './routes'

export default options => ({
  app: App(options),
  auth: Auth(options),
  routes
})
