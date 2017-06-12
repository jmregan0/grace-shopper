import { FETCH_USERS, SET_CURRENT_USER } from '../constants'

const initialState = {
  list: [],
  selected: {} // Just a PK
}

export default function(state=initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case FETCH_USERS:
      newState.list = action.users
      break
    case SET_CURRENT_USER:
      newState.selected = action.user
      break
    default:
      return state
  }
  return newState
}
