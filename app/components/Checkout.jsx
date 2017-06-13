import React from 'react'
import { Link } from 'react-router'

class Checkout extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // console.log('user', user)
  // console.log("cart in Checkout", cart)
  // console.log("reserveDate in Checkout", reserveDate)

  handleSubmit(evt) {
    cart.map(item => {
      reserveDate(item.date)
    })
  }

  render() {
    console.log('cart props', this.props)
    console.log('cart state', this.state)
    const transactions = this.props.transactions
    const user = this.props.user
    const reserveDate = this.props.reserveDate
    let total = transactions.reduce(function(prev, curr){return prev += curr.price}, 0.00)
      return (
        <div className = "container">
          <h1>Review your reservation</h1>
          <div className="container">
            <div className="order-section row col-md-9 col-sm-9 col-xs-12">
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <h3>Order Summary:</h3>
                  <h4>Stays: {transactions.length}</h4>
                  <h4>Total: ${total}</h4>
                </div>
                <div className="col-md-6 col-xs-12">
                  <h3>Billing Details:</h3>
                  <h4>Bill to: {user && user.name}</h4>
                  <h4>Email: {user && user.email}</h4>
                </div>
              </div>
              <hr/>
              <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppmcvdam.png" className="col-xs-19"/>
              <div>
                <Link className = 'btn btn-warning' to="/success" onClick={this.handleSubmit}>Submit your reservation</Link>
              </div>
            </div>
          </div>
          <div className="col-xs-12 row">
            {transactions.map((transaction, i) => {
              return (
                <div key={i} className="row container list-group-item">
                  <img src={transaction.home.imageUrl} className="order-thumb checkout-thumb col-xs-12 col-sm-3"/>
                  <div className="col-sm-9">
                    <div className="row">
                      <h4><Link to={`/homes/${transaction.home.id}`}>{transaction.home.name}</Link></h4>
                      <div>Hosted by: <Link to={`/users/${user.id}`}>{transaction.user.name}</Link></div>
                    </div>
                    <div className="row">
                      <div className="col-xs-6 col-sm-3">
                        <div><h5>Location:</h5></div>
                        <div>{transaction.home.location}</div>
                      </div>
                      <div className="col-xs-6 col-sm-3">
                        <div><h5>Checking in:</h5></div>
                        <div>{transaction.startDate}</div>
                      </div>
                      <div className="col-xs-6 col-sm-3">
                        <div><h5>Checking out:</h5></div>
                        <div>{transaction.endDate}</div>
                      </div>
                      <div className="col-xs-6 col-sm-3">
                        <div><h5>Sub-total:</h5></div>
                        <div>${transaction.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
  }
}

export default Checkout
