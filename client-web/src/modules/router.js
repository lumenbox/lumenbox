import Router from '@cerebral/router'

export default Router({
  routes: [
    { path: '/', signal: 'app.dashboardRouted' },
    { path: '/login', signal: 'auth.loginRouted' },
    { path: '/register', signal: 'auth.registerRouted' },
    { path: '/register-complete', signal: 'auth.registerCompleteRouted' },
    { path: '/password-reset-request', signal: 'auth.passwordResetRequestRouted' },
    { path: '/password-reset/:email/:passwordResetCode', signal: 'auth.passwordResetRouted' },
    { path: '/*', signal: 'app.notFoundRouted' }
  ]
})
