import React from 'react'
import { connect } from 'react-redux'
import Cart from '../components/Cart'

const mapStateToProps = (state) => {
 return {
  state
 }
}

const mapDispatchToProps = (dispatch) => {
 return {
 }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default CartContainer
