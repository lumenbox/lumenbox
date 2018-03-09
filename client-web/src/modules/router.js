import Router from '@cerebral/router'

export default Router({
  routes: [
    { path: '/', signal: 'app.dashboardRouted' },
    { path: '/account/new', signals: 'accounts.newAccountRouted' },
    { path: '/account/:accountId', signals: 'accounts.accountRouted' },
    { path: '/register', signal: 'auth.registerRouted' },
    { path: '/register-complete', signal: 'auth.registerCompleteRouted' },
    { path: '/change-password', signal: 'auth.changePasswordRouted' },
    { path: '/password-reset-request', signal: 'auth.passwordResetRequestRouted' },
    { path: '/password-reset/:email/:passwordResetCode', signal: 'auth.passwordResetRouted' },
    { path: '/*', signal: 'app.notFoundRouted' }
  ]
})
