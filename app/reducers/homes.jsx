import { FETCH_HOMES, SET_CURRENT_HOME } from '../constants'

const initialState = {
  list: [],
  selected: {}
}

export default function(state=initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case FETCH_HOMES:
      newState.list = action.homes
      break
    case SET_CURRENT_HOME:
      newState.selected = action.home
      break
    default:
      return state
  }
  return newState
}
