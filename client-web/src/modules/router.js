import Router from '@cerebral/router'

export default Router({
  routes: [
    { path: '/', signal: 'app.dashboardRouted' },
    { path: '/account/new', signal: 'accounts.newAccountRouted' },
    { path: '/account/:accountId', signal: 'accounts.accountRouted' },
    { path: '/register', signal: 'auth.registerRouted' },
    { path: '/register-complete', signal: 'auth.registerCompleteRouted' },
    { path: '/activate/:activationKey', signal: 'auth.activateRouted' },
    { path: '/change-password', signal: 'auth.changePasswordRouted' },
    { path: '/password-reset-request', signal: 'auth.passwordResetRequestRouted' },
    { path: '/password-reset/:email/:token', signal: 'auth.passwordResetRouted' },
    { path: '/*', signal: 'app.notFoundRouted' }
  ]
})
