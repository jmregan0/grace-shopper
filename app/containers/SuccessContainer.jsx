import React from 'react'
import { connect } from 'react-redux'
import Success from '../components/Success'
import { updateAvailability } from '../action-creators/availability'

const mapStateToProps = (state) => {
 return {
  cart: state.cart.selected,
  user: state.auth
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reserveDate: (date) => dispatch(updateAvailability(date))
  }
}

const SuccessContainer = connect(mapStateToProps, mapDispatchToProps)(Success)

export default SuccessContainer
