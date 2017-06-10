import { FETCH_GUEST_TRANSACTIONS, FETCH_HOST_TRANSACTIONS } from '../constants'

const initialState = {
  guest: [],
  host: []
}

export default function(state=initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case FETCH_GUEST_TRANSACTIONS:
      newState.guest = action.guestTransactions
      break
    case FETCH_HOST_TRANSACTIONS:
      newState.host = action.hostTransactions
      break
    default:
      return state
  }
  return newState
}
