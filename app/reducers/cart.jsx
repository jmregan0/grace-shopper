import { FETCH_USER_CART, REMOVE_CART_ITEM } from '../constants'

const initialState = {
  selected: []
}

export default function(state=initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case FETCH_USER_CART:
      newState.selected = action.cart
      break

    default:
      return state
  }
  return newState
}
