import { reducer as formReducer } from 'redux-form'
import { injectReducer } from '../../store/reducers'
import socketReducer from '../../store/socket'

export default (store) => ({
  path: '',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const LoginContainer = require('./containers/LoginContainer').default
      const userReducer = require('../../store/user').default

      injectReducer(store, { key: 'user', reducer: userReducer })
      injectReducer(store, { key: 'form', reducer: formReducer })
      injectReducer(store, { key: 'socket', reducer: socketReducer })

      cb(null, LoginContainer)
    }, 'home')
  }
})
