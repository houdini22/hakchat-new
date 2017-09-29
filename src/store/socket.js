import socket from '../modules/socket'
import { loggedIn, loggedOff } from './user'

// ------------------------------------
// Constants
// ------------------------------------
export const CONNECTED = 'socket::connected'
export const DISCONNECTED = 'socket::disconnected'

const connected = () => (dispatch) => {
  dispatch({ type: CONNECTED })
}

const disconnected = () => (dispatch) => {
  dispatch({ type: DISCONNECTED })
}

// ------------------------------------
// Actions
// ------------------------------------
export const connect = () => async (dispatch) => {
  socket.off('connect')
  socket.off('disconnected')
  socket.off('logged in')

  socket.on('connect', () => {
    dispatch(connected())
  })
  socket.on('disconnect', () => {
    dispatch(loggedOff())
    dispatch(disconnected())
  })
  socket.on('logged in', (data) => {
    dispatch(loggedIn(data))
  })

  socket.open()
}

export const logIn = (username, password) => async (dispatch) => {
  socket.emit('login', {
    username,
    password
  })
}

export const actions = {
  connect,
  logIn
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONNECTED]: (state) => {
    return {
      ...state,
      connected: true
    }
  },
  [DISCONNECTED]: (state) => {
    return {
      ...state,
      connected: false
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  connected: false
}

export default function socketReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
