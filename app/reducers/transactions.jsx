import { FETCH_PAST_GUEST_TRANSACTIONS, FETCH_FUTURE_GUEST_TRANSACTIONS, FETCH_HOST_TRANSACTIONS } from '../constants'

const initialState = {
  pastGuest: [],
  futureGuest: [],
  host: [],
  // tabData: [
  //   { name: 'Upcoming Reservations', isActive: true },
  //   { name: 'Past Reservations', isActive: false },
  //   { name: 'Transaction History as Host', isActive: false },
  // ],
}

export default function(state=initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case FETCH_PAST_GUEST_TRANSACTIONS:
      newState.pastGuest = action.pastGuestTransactions
      break
    case FETCH_FUTURE_GUEST_TRANSACTIONS:
      newState.futureGuest = action.futureGuestTransactions
      break
    case FETCH_HOST_TRANSACTIONS:
      newState.host = action.hostTransactions
      break
    // case DISPLAY_UPCOMING:
    //   newState.tabData[0][name] = true
    //   newState.tabData[1][name] = false
    //   newState.tabData[2][name] = false
    //   break
    // case DISPLAY_PAST:
    //   newState.tabData[0][name] = false
    //   newState.tabData[1][name] = true
    //   newState.tabData[2][name] = false
    //   break
    // case DISPLAY_HOST_HISTORY:
    //   newState.tabData[0][name] = false
    //   newState.tabData[1][name] = false
    //   newState.tabData[2][name] = true
    //   break
    default:
      return state
  }
  return newState
}
