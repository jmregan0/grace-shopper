import axios from 'axios'
import { FETCH_USER_CART } from '../constants'

export const fetchCart = userId => ({
  type: FETCH_USER_CART,
  userId
})


export const fetchUserCart = homeId => {
  return dispatch => {
    axios.get(`/api/homes/${homeId}`)
    .then(res => {
      dispatch(setCurrentHome(res.data))
    })
  }
}
