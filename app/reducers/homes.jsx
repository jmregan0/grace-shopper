import { FETCH_HOMES, FETCH_USER_HOMES,FETCH_LATEST_HOMES, SET_CURRENT_HOME } from '../constants'

const initialState = {
  list: [],  //definitely an object
  selected: { // just a PK
    Host: {},  //Do we need to nest our state?
  },
  latest: [],
  userHomes: [],
}

export default function(state=initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case FETCH_HOMES:
      newState.list = action.homes
      break
    case FETCH_USER_HOMES:
      newState.userHomes = action.userHomes
      break
    case FETCH_LATEST_HOMES:
      newState.latest = action.latestHomes
      break
    case SET_CURRENT_HOME:
      newState.selected = action.home
      break
    default:
      return state
  }
  return newState
}
