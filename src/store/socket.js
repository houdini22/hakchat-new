import socket from '../modules/socket'

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
  socket.on('connect', () => {
    dispatch(connected())
  })
  socket.on('disconnect', () => {
    dispatch(disconnected())
  })
  socket.open()
}

export const actions = {
  connect,
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
