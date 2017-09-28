// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_CURRENT_ITEM = 'Rect::UPDATE_CURRENT_ITEM'

// ------------------------------------
// Actions
// ------------------------------------
export const createNew = () => (dispatch) => {

}

export const actions = {
  createNew,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_CURRENT_ITEM]: (state, { payload }) => {
    return {
      ...state,
      currentItem: { ...payload }
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  channels: []
}

export default function chatReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
