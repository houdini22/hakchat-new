import socket from '../modules/socket'

// ------------------------------------
// Constants
// ------------------------------------
export const CONNECTED = 'socket::connected'

// ------------------------------------
// Actions
// ------------------------------------
export const connect = () => async (dispatch) => {
  socket.off('connect')
  socket.on('connect', () => {
    dispatch({
      type: CONNECTED
    })
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
