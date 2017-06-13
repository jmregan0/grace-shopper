import React from 'react'
import { Link } from 'react-router'

const Cart = (props) => {
		const cart = props.cart
		// console.log('props', props)
		console.log('cart in props', cart)

    return (
      <div className="container">
			<th style={{width:'100%'}}>Abbrev. Cart View</th>
			<table id="cart" className="table table-hover table-condensed">
    				<thead>
						<tr>
							<th style={{width:'50%'}}>Home</th>
							<th style={{width:'10%'}}>Start Date</th>
							<th style={{width:'22%'}}className="text-center">End Date</th>
							<th style={{width:'10%'}}></th>
						</tr>
					</thead>

					{Array.isArray(cart)?
						cart.map( item => {
							return (
							<tbody>
								<tr>
									<td data-th="Product">
										<div className="row">
											<div className="col-sm-2 hidden-xs"><img src="http://placehold.it/100x100" alt="..." className="img-responsive"/></div>
											<div className="col-sm-10">
												<h4 className="nomargin">homeId: #{item.homeId}</h4>
												<p>add text here</p>
											</div>
										</div>
									</td>
									<td data-th="Price">{item.startDate}</td>
									<td data-th="Subtotal" className="text-center">{item.endDate}</td>
									<td className="actions" data-th="">
										<button className="btn btn-info btn-sm"><i className="fa fa-refresh"></i></button>
										<button className="btn btn-danger btn-sm"><i className="fa fa-trash-o"></i></button>
									</td>
								</tr>
							</tbody>
							)
						}):null}

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
