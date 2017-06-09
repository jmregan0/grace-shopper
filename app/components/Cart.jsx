import React from 'react'
import { Link } from 'react-router'

class Cart extends React.Component{
  constructor(props){
    super(props)

  }

  render(){
    return (
      <div className="container">
        <h1>Your Cart</h1>
      </div>
    )
  }
}

/*
const Cart = (props) => {
  console.log('props passed to cart component', props)
  return (
      <div className="container">
        <h1>Your Cart</h1>
      </div>
  )
}*/


export default Cart
