import { injectReducer } from '../../store/reducers'
import socketReducer from '../../store/socket'

export default (store) => ({
  path: 'chat',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ChatContainer = require('./containers/ChatContainer').default
      const userReducer = require('../../store/user').default

      injectReducer(store, { key: 'user', reducer: userReducer })
      injectReducer(store, { key: 'socket', reducer: socketReducer })

      cb(null, ChatContainer)
    }, 'chat')
  }
})
