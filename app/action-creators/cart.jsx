import axios from 'axios'
import { FETCH_USER_CART } from '../constants'

export const fetchCart = cart => ({
  type: FETCH_USER_CART,
  cart
})


export const getCartByUserId = cartId => {
  return dispatch => {
    axios.get(`/api/cart/${cartId}`)
    .then(res => {
      console.log('got cart!', res.data)
      dispatch(fetchCart(res.data))
    })
  }
}
