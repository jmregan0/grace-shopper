import React from 'react'
import { Link } from 'react-router'
import { deleteCartItem } from '../action-creators/cart'
import store from '../store'

const Cart = (props) => {
		const cart = props.cart
		const auth = props.auth
		console.log('props', props)
		let total = cart.reduce(function(prev, curr){return prev += curr.home.price},0.00)

    return (
      <div className="container">
      {
      cart.length > 0
      ?
      (
			<table id="cart" className="table table-hover table-condensed">
				<thead>
					<tr>
						<th style={{width:'50%'}} className="text-center">Home</th>
						<th style={{width:'10%'}}>Price</th>
						<th style={{width:'30%'}} className="text-center">Guests</th>
						<th style={{width:'10%'}} className="text-center">Delete</th>
					</tr>
				</thead>

				{
					cart.length > 0 ?
					cart.map( (item, i) => {
						return (
						<tbody key={i}>
							<tr>
								<td data-th="Product">
									<div className="row">
										<div className="col-md-4 hidden-sm hidden-xs"><img src={item.home.imageUrl} alt="..." className="img-responsive"/></div>
										<div className="col-md-8 col-sm-12 col-xs-12">
											<Link to={`/homes/${item.home.id}`}><h4 className="nomargin">{item.home.name}</h4></Link>
											<p>{"booking for " + item.date}</p>
										</div>
									</div>
								</td>
								<td data-th="Price">{"$"+ item.home.price}</td>
								<td data-th="Subtotal" className="text-center">1</td>
								<td className="actions center" data-th="">
									<button onClick={ ()=> store.dispatch(deleteCartItem(item.guest_cart_items.availability_id, auth.id))}className="btn btn-danger btn-sm"><i className="fa fa-trash-o"></i></button>
								</td>
							</tr>
						</tbody>
						)
					})
					: null
				}
				<tfoot>
					<tr className="visible-xs">
						<td className="text-center"><strong>Total 1.99</strong></td>
					</tr>
					<tr>
						<td><Link to={'/homes'} className="btn btn-warning"><i className="fa fa-angle-left"></i> Continue Shopping</Link></td>
						<td colSpan="2" className="hidden-xs"></td>
						<td className="hidden-xs text-center"><h4>Total: {"$" + total + ".00"}</h4></td>
						<td><Link to="/checkout" className="btn btn-success btn-block">Checkout<i className="fa fa-angle-right"></i></Link></td>
					</tr>
				</tfoot>
			</table>
			)
			: null
    	}

			{
			cart.length === 0
			? (
			  	<div className="container">
						<h1>No Bookings in Your Cart Yet!</h1>
						<p>Why don't you add a few...</p>
						<p><Link to={'/homes'} className="btn btn-primary btn-lg" role="button">Current Listings</Link></p>
					</div>
				)
			: null
			}
		</div>
  )
}


export default Cart
