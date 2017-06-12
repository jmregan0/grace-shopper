import axios from 'axios'
import {browserHistory} from 'react-router';
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
    axios.get('/api/auth/whoami')
    .then(user=>{

        if(user.data!==""){
            axios.post(`/api/cart/${user.data.id}`, {homeId:homeId, startDate:startDate, endDate:endDate})
            .then(()=>{
              dispatch(getCartByUserId(user.data.id))
              browserHistory.push(`/cart/${user.data.id}`)
            })
        }else{
            console.log("CANNOT ADD CART ITEMS WHEN NOT SIGNED IN")
        }
      })

  }
}
