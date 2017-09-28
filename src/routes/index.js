import CoreLayout from '../layouts/PageLayout/PageLayout'
import LoginRoute from './Login'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: LoginRoute(store),
  childRoutes: []
})

export default createRoutes
