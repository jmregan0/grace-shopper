import React from 'react'
import { Link } from 'react-router'

const Cart = (props) => {
		const cart = props.cart
		console.log('cart in props', cart)

    return (
      <div className="container">
			<table id="cart" className="table table-hover table-condensed">
    				<thead>
						<tr>
							<th style={{width:'50%'}}>Home</th>
							<th style={{width:'10%'}}>Price</th>
							<th style={{width:'22%'}}className="text-center">Guests</th>
							<th style={{width:'10%'}}></th>
						</tr>
					</thead>

					{
						cart.length > 0 ?
						cart.map( item => {
							return (
							<tbody>
								<tr>
									<td data-th="Product">
										<div className="row">
											<div className="col-sm-2 hidden-xs"><img src={item.home.imageUrl} alt="..." className="img-responsive"/></div>
											<div className="col-sm-10">
												<h4 className="nomargin">{item.home.name}</h4>
												<p>{"booking for " + item.date}</p>
											</div>
										</div>
									</td>
									<td data-th="Price">{"$"+ item.home.price}</td>
									<td data-th="Subtotal" className="text-center">1</td>
									<td className="actions" data-th="">
										<button className="btn btn-info btn-sm"><i className="fa fa-refresh"></i></button>
										<button className="btn btn-danger btn-sm"><i className="fa fa-trash-o"></i></button>
									</td>
								</tr>
							</tbody>
							)
						})
						:
						<div class="jumbotron">
							<h1>No Bookings in Your Cart Yet!</h1>
							<p>Why don't you add a few...</p>
							<p><Link to={'/homes'} class="btn btn-primary btn-lg" role="button">Current Listings</Link></p>
						</div>
						}

					<tfoot>
						<tr className="visible-xs">
							<td className="text-center"><strong>Total 1.99</strong></td>
						</tr>
						<tr>
							<td><Link to={'/homes'} className="btn btn-warning"><i className="fa fa-angle-left"></i> Continue Shopping</Link></td>
							<td colSpan="2" className="hidden-xs"></td>
							<td className="hidden-xs text-center"><strong>Total $1.99</strong></td>
							<td><a href="#" className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></a></td>
						</tr>
					</tfoot>
				</table>
</div>
    )
}


export default Cart
