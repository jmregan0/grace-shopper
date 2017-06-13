import React from 'react'
import { connect } from 'react-redux'
import Success from '../components/Success'
import { updateAvailability } from '../action-creators/availability'
import { createUserTransaction } from '../action-creators/transactions'

const mapStateToProps = (state) => {
 return {
  cart: state.cart.selected,
  user: state.auth
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reserveDate: (date) => dispatch(updateAvailability(date)),
    createNewTransaction: (transaction) => dispatch(createUserTransaction(transaction))
  }
}

const SuccessContainer = connect(mapStateToProps, mapDispatchToProps)(Success)

export default SuccessContainer
