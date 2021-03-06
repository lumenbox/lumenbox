import Router from '@cerebral/router'

export default Router({
  routes: [
    { path: '/', signal: 'app.dashboardRouted' },
    { path: '/account/new', signal: 'accounts.newAccountRouted' },
    { path: '/account/:accountId', signal: 'accounts.accountRouted' },
    { path: '/domain/new', signal: 'domains.newDomainRouted' },
    { path: '/domain/:domainId', signal: 'domains.domainRouted' },
    { path: '/register', signal: 'auth.registerRouted' },
    { path: '/register-complete', signal: 'auth.registerCompleteRouted' },
    { path: '/activate/:email/:activationKey', signal: 'auth.activateRouted' },
    { path: '/change-password', signal: 'auth.changePasswordRouted' },
    { path: '/password-reset-request', signal: 'auth.passwordResetRequestRouted' },
    { path: '/password-reset/:email/:token', signal: 'auth.passwordResetRouted' },
    { path: '/*', signal: 'app.notFoundRouted' }
  ]
})
