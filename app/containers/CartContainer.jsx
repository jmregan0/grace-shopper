import React from 'react'
import { connect } from 'react-redux'
import Cart from '../components/Cart'

const mapStateToProps = (state) => {
  let cart = state.cart.selected.sort((a,b) => {return new Date(a.date).getTime() > new Date(b.date).getTime()})
 return {
  cart: cart,
  auth: state.auth
 }
}

const mapDispatchToProps = (dispatch) => {
 return {
 }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default CartContainer
