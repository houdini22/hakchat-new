import socket from '../modules/socket'
// ------------------------------------
// Constants
// ------------------------------------
export const USER_JOINED = 'chat::user_joined'
export const USER_STARTS_WRITING = 'chat::user_starts_writing'
export const USER_STOPS_WRITING = 'chat::user_stops_writing'
export const ME_START_WRITING = 'chat::me_start_writing'
export const ME_STOP_WRITING = 'chat::me_stop_writing'
export const USERS_GET = 'chat::users_get'

// ------------------------------------
// Actions
// ------------------------------------
export const userJoined = (data, isMe) => (dispatch) => {
  if (!isMe) {
    dispatch({ type: USER_JOINED, payload: data })
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
      username: getState().user.user.username
    }
  })
}

export const meStopWriting = () => (dispatch, getState) => {
  if (getState().chat.meIsWriting === false) return
  dispatch({ type: ME_STOP_WRITING })
  socket.emit('user stops writing', {
    user: {
      username: getState().user.user.username
    }
  })
}

export const usersGet = (data) => (dispatch) => {
  dispatch({ type: USERS_GET, payload: data })
}

export const actions = {
  userJoined,
  userStartsWriting,
  userStopsWriting,
  meStopWriting,
  meStartWriting,
  usersGet,
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
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  users: [],
  meIsWriting: false
}

export default function chatReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
