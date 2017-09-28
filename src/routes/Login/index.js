import { injectReducer } from '../../store/reducers'
import { reducer as formReducer } from 'redux-form'

export default (store) => ({
  path: '',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const LoginContainer = require('./containers/LoginContainer').default
      const userReducer = require('../../store/user').default

      injectReducer(store, { key: 'user', reducer: userReducer })
      injectReducer(store, { key: 'form', reducer: formReducer })

      cb(null, LoginContainer)
    }, 'home')
  }
})
