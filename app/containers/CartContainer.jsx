import React from 'react'
import { connect } from 'react-redux'
import Cart from '../components/Cart'

const mapStateToProps = (state) => {
 return {
  cart: state.cart.selected,
  auth: state.auth
 }
}

const mapDispatchToProps = (dispatch) => {
 return {
 }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default CartContainer
