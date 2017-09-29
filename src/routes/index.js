import CoreLayout from '../layouts/PageLayout/PageLayout'
import LoginRoute from './Login'
import ChatRoute from './Chat'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: LoginRoute(store),
  childRoutes: [
    ChatRoute(store)
  ]
})

export default createRoutes
