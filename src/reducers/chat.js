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

export const userStartsWriting = (user) => (dispatch) => {
  dispatch({ type: USER_STARTS_WRITING, payload: user })
}

export const userStopsWriting = (user) => (dispatch) => {
  dispatch({ type: USER_STOPS_WRITING, payload: user })
}

export const actions = {
  userJoined,
  userStartsWriting,
  userStopsWriting
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
