import React from 'react'
import { connect } from 'react-redux'
import Checkout from '../components/Checkout'

const mapStateToProps = (state) => {
 return {
  cart: state.cart.selected,
  user: state.auth
 }
}

const mapDispatchToProps = (dispatch) => {
 return {
 }
}

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)

export default CheckoutContainer
