import socket from '../modules/socket'

// ------------------------------------
// Constants
// ------------------------------------
export const USER_JOINED = 'chat::user_joined'
export const USER_STARTS_WRITING = 'chat::user_starts_writing'
export const USER_STOPS_WRITING = 'chat::user_stops_writing'

// ------------------------------------
// Actions
// ------------------------------------
export const userJoined = (data) => (dispatch) => {
  dispatch({ type: USER_JOINED, payload: data })
}

export const userStartsWriting = (data) => (dispatch) => {
  console.log(data)
  dispatch({ type: USER_STARTS_WRITING, payload: data.user.username })
}

export const userStopsWriting = (data) => (dispatch) => {
  dispatch({ type: USER_STOPS_WRITING, payload: data.user.username })
}

export const actions = {
  userJoined,
  userStartsWriting,
  userStopsWriting,
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
      if (u.username === payload) {
        u.isWriting = false
      }
      return u
    })

    return {
      ...state,
      users
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  users: []
}

export default function chatReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
