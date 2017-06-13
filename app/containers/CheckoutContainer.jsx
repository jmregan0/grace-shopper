import React from 'react'
import { connect } from 'react-redux'
import Checkout from '../components/Checkout'
import { updateAvailability } from '../action-creators/availability'
import { createUserTransaction } from '../action-creators/transactions'

const mapStateToProps = (state) => {
  let cartAvailabilities = state.cart.selected
  return {
  cart: cartAvailabilities,
  user: state.auth,
  transactions: convertCartToRanges(cartAvailabilities, state.auth) || [],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reserveDate: (date) => dispatch(updateAvailability(date)),
    createNewTransaction: (transaction) => dispatch(createUserTransaction(transaction))

  }
}


const convertCartToRanges = (availArr, user) => {
  let transactionArr = [];
  let currentDate;
  let currentHomeId;
  //loop through the availability array and add an array representing each range
  for(let i = 0; i < availArr.length; i++) {
    currentDate = new Date(availArr[i].date);
    currentHomeId = availArr[i].home_id
    let transaction = [];

    //while the next availability in the array is consecutive, add it to the current range. otherwise, create a new range
    while(((availArr[i] && availArr[i].home_id)  === currentHomeId && currentDate.getTime() === new Date(availArr[i].date).getTime()) && i < availArr.length){
      transaction.push(availArr[i]);
      currentDate.setDate(currentDate.getDate() + 1);
      i++;
    }
    transactionArr.push(transaction);
    i--;
  }
  //map each range to a transaction object
  return transactionArr.map(transaction => ({
    price: transaction[0].home.price * transaction.length,
    startDate: transaction[0].date,
    endDate: transaction[transaction.length - 1].date,
    host_id: transaction[0].home.host_id,
    guest_id: (user && user.id) || null,
    home_id: transaction[0].home_id,
    availability_ids: transaction.map(availability => availability.id),
    home: transaction[0].home,
    user: user,
  }))
}

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)

export default CheckoutContainer
