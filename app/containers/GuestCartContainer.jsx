import React from 'react'
import { connect } from 'react-redux'
import GuestCart from '../components/GuestCart'

const mapStateToProps = (state) => {
 return {
  cart: state.cart.selected,
 }
}

const mapDispatchToProps = (dispatch) => {
 return {
 }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(GuestCart)

export default CartContainer
