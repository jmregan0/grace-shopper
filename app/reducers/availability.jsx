import { FETCH_AVAILABILITY, MAKE_UNAVAILABLE } from '../constants'

const initialState = {
  list: [],
  unavailable: [],
}

export default function(state=initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case FETCH_AVAILABILITY:
      newState.list = action.dates
      break
    case MAKE_UNAVAILABLE:
      newState.unavailable = action.updatedDates
    default:
      return state
  }
  return newState
}
