import socket from '../modules/socket'
import { loggedIn, loggedOff } from './user'
import { userJoined, userStopsWriting, userStartsWriting, usersGet } from './chat'

// ------------------------------------
// Constants
// ------------------------------------
export const CONNECTED = 'socket::connected'
export const DISCONNECTED = 'socket::disconnected'
export const LOGIN_FAILED = 'socket::login_failed'
export const LOGIN_IN_PROGRESS = 'socket::login_in_progress'

const connected = () => (dispatch) => {
  dispatch({ type: CONNECTED })
}

const disconnected = () => (dispatch) => {
  dispatch({ type: DISCONNECTED })
}

const loginFailed = (value) => (dispatch) => {
  dispatch({ type: LOGIN_FAILED, payload: value })
}

const loginInProgress = (value) => (dispatch) => {
  dispatch({ type: LOGIN_IN_PROGRESS, payload: value })
}

// ------------------------------------
// Actions
// ------------------------------------
export const connect = () => async (dispatch, getState) => {
  let interval = null

  socket.off('connect')
  socket.off('disconnected')
  socket.off('logged in')
  socket.off('user joined')
  socket.off('user starts writing')
  socket.off('user stops writing')

  socket.on('connect', () => {
    clearInterval(interval)
    dispatch(connected())
  })
  socket.on('disconnect', () => {
    dispatch(loggedOff())
    dispatch(disconnected())

    // manual retry
    interval = setInterval(() => {
      socket.connect()
    }, 1000)
  })
  socket.on('logged in', (data) => {
    dispatch(loginInProgress(false))
    dispatch(loggedIn(data))
    socket.emit('get users')
  })
  socket.on('login failed', () => {
    dispatch(loginInProgress(false))
    dispatch(loginFailed(true))
  })
  socket.on('user joined', (data) => {
    dispatch(userJoined(data, getState().user.user.username === data.user.username))
  })
  socket.on('user starts writing', (data) => {
    dispatch(userStartsWriting(data))
  })
  socket.on('user stops writing', (data) => {
    dispatch(userStopsWriting(data, getState().user.user.username === data.user.username))
  })
  socket.on('users get', (data) => {
    dispatch(usersGet(data))
  })

  socket.connect()
}

export const logIn = (username, password) => async (dispatch) => {
  dispatch(loginFailed(false))
  dispatch(loginInProgress(true))
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
  },
  [LOGIN_FAILED]: (state, { payload }) => {
    return {
      ...state,
      loginFailed: payload
    }
  },
  [LOGIN_IN_PROGRESS]: (state, { payload }) => {
    return {
      ...state,
      loginInProgress: payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  connected: false,
  loginFailed: false
}

export default function socketReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
