import socket from '../modules/socket'
import { hasMyNickInMessage } from '../helpers/chat'

// ------------------------------------
// Constants
// ------------------------------------
export const USER_JOINED = 'chat::user_joined'
export const USER_LEFT = 'chat::user_left'
export const USER_STARTS_WRITING = 'chat::user_starts_writing'
export const USER_STOPS_WRITING = 'chat::user_stops_writing'
export const ME_START_WRITING = 'chat::me_start_writing'
export const ME_STOP_WRITING = 'chat::me_stop_writing'
export const USERS_GET = 'chat::users_get'
export const MESSAGE_RECEIVED = 'chat::message_received'
export const RESET = 'chat::reset'
export const ADD_SYSTEM_MESSAGE = 'chat::add_system_message'

export const TYPE_MESSAGE_SYSTEM = '___SYSTEM___'

// ------------------------------------
// Actions
// ------------------------------------
export const userJoined = (data, isMe) => (dispatch) => {
  if (!isMe) {
    dispatch({ type: USER_JOINED, payload: data })
  }

  dispatch({
    type: ADD_SYSTEM_MESSAGE,
    payload: {
      message: USER_JOINED,
      data,
    }
  })
}

export const userLeft = (data, isMe) => (dispatch) => {
  if (!isMe) {
    dispatch({
      type: ADD_SYSTEM_MESSAGE,
      payload: {
        message: USER_LEFT,
        data
      }
    })
    dispatch({ type: USER_LEFT, payload: data })
  }
}

export const userStartsWriting = (data) => (dispatch) => {
  dispatch({ type: USER_STARTS_WRITING, payload: data.user.username })
}

export const userStopsWriting = (data, isMe) => (dispatch) => {
  dispatch({
    type: USER_STOPS_WRITING,
    payload: {
      username: data.user.username,
      isMe
    }
  })
}

export const meStartWriting = () => (dispatch, getState) => {
  if (getState().chat.meIsWriting === true) return
  dispatch({ type: ME_START_WRITING })
  socket.emit('user starts writing', {
    user: {
      username: getState().auth.user.username
    }
  })
}

export const meStopWriting = () => (dispatch, getState) => {
  if (getState().chat.meIsWriting === false) return
  dispatch({ type: ME_STOP_WRITING })
  socket.emit('user stops writing', {
    user: {
      username: getState().auth.user.username
    }
  })
}

export const usersGet = (data) => (dispatch) => {
  dispatch({ type: USERS_GET, payload: data })
}

export const sendMessage = (message) => (dispatch, getState) => {
  dispatch(meStopWriting())
  socket.emit('send message', {
    user: {
      username: getState().auth.user.username
    },
    message
  })
}

export const messageReceived = (data) => (dispatch, getState) => {
  const important = hasMyNickInMessage(getState().auth.user.username, data.message)

  if (important) {
    try {
      const audio = new Audio('/sounds/notification.mp3')
      audio.play()
    } catch (ex) {}
  }

  dispatch({ type: MESSAGE_RECEIVED, payload: { ...data, important } })
}

export const reset = () => (dispatch) => {
  dispatch({ type: RESET })
}

export const actions = {
  userJoined,
  userLeft,
  userStartsWriting,
  userStopsWriting,
  meStopWriting,
  meStartWriting,
  usersGet,
  messageReceived,
  reset,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_JOINED]: (state, { payload }) => {
    const { user } = payload
    user.isWriting = false

    return {
      ...state,
      users: [...(state.users), user]
    }
  },
  [USER_LEFT]: (state, { payload }) => {
    return {
      ...state,
      users: [...state.users.filter((user) => {
        return user.username !== payload.user.username
      })]
    }
  },
  [USER_STARTS_WRITING]: (state, { payload }) => {
    const users = state.users.map((u) => {
      if (u.username === payload) {
        u.isWriting = true
      }
      return u
    })

    return {
      ...state,
      users
    }
  },
  [USER_STOPS_WRITING]: (state, { payload }) => {
    const users = state.users.map((u) => {
      if (u.username === payload.username) {
        u.isWriting = false
      }
      return u
    })

    return {
      ...state,
      users,
      meIsWriting: payload.isMe === true ? false : state.meIsWriting
    }
  },
  [ME_START_WRITING]: (state) => {
    return {
      ...state,
      meIsWriting: true
    }
  },
  [ME_STOP_WRITING]: (state) => {
    return {
      ...state,
      meIsWriting: false
    }
  },
  [USERS_GET]: (state, { payload }) => {
    return {
      ...state,
      users: [...payload]
    }
  },
  [MESSAGE_RECEIVED]: (state, { payload }) => {
    const { message, timestamp, user } = payload
    return {
      ...state,
      messages: [...state.messages, {
        message,
        timestamp,
        user
      }]
    }
  },
  [RESET]: (state) => {
    return {
      ...state,
      messages: [],
      users: []
    }
  },
  [ADD_SYSTEM_MESSAGE]: (state, { payload }) => {
    const { message, data } = payload

    return {
      ...state,
      messages: [...state.messages, {
        message,
        type: TYPE_MESSAGE_SYSTEM,
        user: {
          username: '[SYSTEM]'
        },
        data: data.user,
        timestamp: data.timestamp
      }]
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  users: [],
  meIsWriting: false,
  messages: []
}

export default function chatReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
