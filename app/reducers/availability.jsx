import { FETCH_AVAILABILITY } from '../constants'

const initialState = {
  list: []
}

export default function(state=initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case FETCH_AVAILABILITY:
      newState.list = action.dates
      break
    default:
      return state
  }
  return newState
}
