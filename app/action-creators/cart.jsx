import axios from 'axios'
import {browserHistory} from 'react-router';
import { FETCH_USER_CART, CREATE_USER_CART, REMOVE_CART_ITEM } from '../constants';

export const fetchCart = cart => ({
  type: FETCH_USER_CART,
  cart
});

export const deleteItem = item => ({
  type: REMOVE_CART_ITEM,
  item
})

export const createNewCart = () => {
  return dispatch => {
    axios.post('/api/cart/')
    .then(res => {
      console.log('created cart!', res.data);
      dispatch(fetchCart(res.data));
    });
  };
};

export const getCartByUserId = userId => {
  return dispatch => {
      if(userId){
        axios.get(`/api/cart/${userId}`)
        .then(res => {
          console.log('got cart!', res.data);
          dispatch(fetchCart(res.data));
        })
      }else{
        axios.get(`/api/cart/sessioncart`)
        .then(cart=>{
          
          dispatch(fetchCart(cart.data));

        })
      }
  };
};

export const deleteCartItem = (availId, userId) => {
  console.log('avail id, user id', availId, userId)
  return dispatch => {
    if(userId){
      return axios.delete(`/api/cart/${availId}`)
      .then(res => {
        dispatch(getCartByUserId(userId))
      })
    }else{
      return axios.delete(`/api/cart/sessioncart/${availId}`)
      .then(res => {
        dispatch(getCartByUserId(userId))
      })
    }

  }
}

export const addAvailabilityToCartAC = (homeId, startDate, endDate, auth) => {

      
      var user=auth;
    
  return dispatch => {

        if(user){
            axios.post(`/api/cart/${user.id}`, {homeId:homeId, startDate:startDate, endDate:endDate})
            .then(()=>{
              dispatch(getCartByUserId(user.id))
              browserHistory.push(`/cart/${user.id}`)
            })
        }else{
            console.log("CANNOT ADD CART ITEMS WHEN NOT SIGNED IN")
            axios.post(`/api/cart/sessioncart`, {homeId:homeId, startDate:startDate, endDate:endDate})
            .then(()=>{
              dispatch(getCartByUserId())
              browserHistory.push(`/cart`)
            })
        }
      

  }
}
