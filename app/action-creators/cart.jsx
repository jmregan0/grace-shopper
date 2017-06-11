import axios from 'axios'
import { FETCH_USER_CART, CREATE_USER_CART } from '../constants';

export const fetchCart = cart => ({
  type: FETCH_USER_CART,
  cart
});



export const createNewCart = () => {
  return dispatch => {
    axios.post('/api/cart/')
    .then(res => {
      console.log('created cart!', res.data);
      dispatch(fetchCart(res.data));
    });
  };
};

export const getCartByUserId = cartId => {
  return dispatch => {
    axios.get(`/api/cart/${cartId}`)
    .then(res => {
      console.log('got cart!', res.data);
      dispatch(fetchCart(res.data));
    });
  };
};




export const addAvailabilityToCartAC = (homeId, startDate, endDate) => {

      homeId=homeId.toString()

  return dispatch => {
    // axios.get(`/api/availability/${homeId}`, {startDate:startDate, endDate:endDate})
    axios.get('/api/auth/whoami')
    .then(user=>{    
      axios.get(`/api/availability/${homeId}?startDate=${startDate}&endDate=${endDate}`)
      .then(avails=>{
        console.log("avails", avails.data)
        console.log("---user", user)
        axios.post(`/api/cart/${user.data.id}`, avails)
      })


    })
  }
}
