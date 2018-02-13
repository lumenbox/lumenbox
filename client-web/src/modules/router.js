import Router from '@cerebral/router'

export default Router({
  routes: [
    { path: '/', signal: 'app.homeRouted' },
    { path: '/login', signal: 'auth.loginRouted' },
    { path: '/password-reset-request', signal: 'auth.passwordResetRequestRouted' },
    { path: '/password-reset/:email/:passwordResetCode', signal: 'auth.passwordResetRouted' },
    { path: '/*', signal: 'app.notFoundRouted' }
  ]
})
