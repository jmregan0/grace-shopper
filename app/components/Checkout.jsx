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
          <Link className = 'btn btn-warning' to="/checkout"><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
    <input type="hidden" name="cmd" value="_s-xclick"/>
    <input type="hidden" name="currency_code" value="USD"/>
    <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
    "/>
    <input type="image"  border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
  </form>Continue to PayPal</Link>
          })
          </div>
      </div>
    </div>
  )
}

export default Checkout
