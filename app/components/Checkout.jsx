import React from 'react'
import { Link, browserHistory } from 'react-router'

class Checkout extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // console.log('user', user)
  // console.log("cart in Checkout", cart)
  // console.log("reserveDate in Checkout", reserveDate)

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('submit button hit!')
    this.props.createNewTransaction(this.props.transactions)
    browserHistory.push('/success')
  }

  render() {
    console.log('transactions', this.props.transactions)
    console.log('cart props', this.props)
    console.log('cart state', this.state)
    const cart = this.props.cart
    const user = this.props.user
    const reserveDate = this.props.reserveDate
      return (
        <div>
          <h1>Review your reservation</h1>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 panel-body">
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 panel-body row">
              {cart.map(item => {
                return (
                  <div key={item.id} className="row  order order-header thead-inverse">
                    <div className="col-sm-2">
                      <img src={item.home.imageUrl} className="order-thumb checkout-thumb img-responsive"/>
                    </div>
                    <div className="col-sm-9">
                      <h4><Link to={`/homes/${item.home.id}`}>{item.home.name}</Link></h4>
                      <div>Hosted by <Link to={`/users/${user.id}`}>{user.name}</Link></div>
                      <br/>
                      <div className="order-column">
                        <div><strong>Location:</strong></div>
                        <div>{item.home.location}</div>
                      </div>
                      <div className="order-column">
                        <div><strong>Check-in:</strong></div>
                        <div>{item.date}</div>
                      </div>
                      <div className="order-column">
                        <div><strong>Checkout:</strong></div>
                        <div>{item.date}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="col-lg-3 col-md-3 hidden-sm hidden-xs panel-body list-group-item">
                  <div>
                    <div className="order-column">
                      <div>home.price x cart.length nights</div>
                    </div>
                    <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppmcvdam.png"/>
                    <Link to={'/success'} className = 'btn btn-warning' onClick={this.handleSubmit}>Submit your reservation</Link>
                  </div>
            </div>
          </div>
        </div>
      )
  }
}

export default Checkout
