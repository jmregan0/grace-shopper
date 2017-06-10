import React from 'react'
import { Link } from 'react-router'

const Checkout = (props) => {
  const cart = props.cart
  return (
    <div>
      <h1>Review your order</h1>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 panel-body">
        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 panel-body row list-group-item">
          {cart.map(item => {
            return (
              <div key={item.id}>
                <img src={item.home.imageUrl}/>
                <h4><Link to={`/homes/${item.home.id}`}>{item.home.name}</Link></h4>
                <p>Location: {item.home.location}</p>
                <p>Hosted by {item.host.name}</p>
                <div className="order-column">
                  <div>Check-in:</div>
                  <div>{item.startDate}</div>
                </div>
                <div className="order-column">
                  <div>Checkout:</div>
                  <div>{item.endDate}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="col-lg-3 col-md-3 hidden-sm hidden-xs panel-body">
          <div className="order-column">
            <div>{item.home.price} x {item.days} nights</div>
          </div>
          <div className="order-id">
            <div>${item.home.price*item.days}</div>
          </div>
          <div className="order-column">
            <div>Cleaning fee</div>
          </div>
          <div className="order-id">
            <div>{item.home.id !== item.home.price*item.days}</div>
          </div>

          <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppmcvdam.png"/>
          <Link className = 'btn btn-warning' to="/checkout">Continue to PayPal</Link>
          })
          </div>
      </div>
    </div>
  )
}

export default Checkout
