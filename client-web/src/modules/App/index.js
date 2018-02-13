import { Module } from 'cerebral'
import mobileMenuToggled from './signals/mobileMenuToggled'
import initialized from './signals/initialized'
import notificationDismissed from './signals/notificationDismissed'
import routed from '../../signals/routed'
import homeRouted from './signals/homeRouted'

export default options =>
  Module(({ controller }) => {
    controller.on('initialized', () => {
      controller.getSignal('app.initialized')()
    })

    return {
      state: {
        page: 'home',
        initialized: false,
        showMobileMenu: false,
        notifications: []
      },
      signals: {
        initialized,
        mobileMenuToggled,
        notificationDismissed,
        homeRouted,
        notFoundRouted: routed('notFound')
      }
    }
  })
