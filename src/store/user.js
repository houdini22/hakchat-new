// ------------------------------------
// Constants
// ------------------------------------
export const LOG_IN = 'User::LogIn'

// ------------------------------------
// Actions
// ------------------------------------
export const logIn = () => (dispatch) => {

}

export const actions = {
  logIn,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOG_IN]: (state, { payload }) => {
    return {
      ...state,
      isLoggedIn: true,
      user: payload,
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoggedIn: false,
  user: null
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
