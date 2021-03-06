import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import store from '../store'
import Homes from './Homes'

var tabData = [
  { name: 'Your Upcoming Reservations', isActive: true },
  { name: 'Your Past Reservations', isActive: false },
  { name: 'Transaction History as Host', isActive: false }
];

class Tabs extends React.Component {
  render() {
    return (
      <ul className="nav nav-tabs">
        {tabData.map(function(tab){
          return (
            <Tab key={tab.name} data={tab} isActive={this.props.activeTab === tab} handleClick={this.props.changeTab.bind(this,tab)} />
          );
        }.bind(this))}
      </ul>
    );
  }
}

class Tab extends React.Component {
  render() {
    return (
      <li onClick={this.props.handleClick} className={this.props.isActive ? "active" : null}>
        <Link>{this.props.data.name}</Link>
      </li>
    );
  }
}

export class Content extends React.Component {
  render() {
    return (
      <div>
        {this.props.activeTab.name === 'Your Upcoming Reservations' ?
        <section className="panel">
          <h2 className="panel-heading">Your Upcoming Reservations</h2>
          {this.props.futureGuest.length ? this.props.futureGuest.map(transaction => {
            return (
                <div className="order-info" key={transaction.id}>
                    <div className="order order-header row thead-inverse">
                        <div className="order-column">
                            <div><strong>Order #</strong></div>
                            <div className="center">{transaction.id}</div>
                        </div>
                        <div className="right">
                            <div><strong>Order placed</strong></div>
                            <div>{moment(transaction.created_at).format('LL')}</div>
                        </div>
                    </div>
                    <div className="order order-body flex">
                        <div className = "row">
                          <div className="left col-sm-6"><img src={transaction.home.imageUrl} className="order-thumb col-xs-12"/></div>
                          <div className="col-sm-6">
                            <div className="bottom-padding">Home: <Link to={`/homes/${transaction.home.id}`} className="link">{transaction.home.name}</Link></div>
                            <div className="bottom-padding">Host: <Link to={`/users/${transaction.host.id}`} className="link">{transaction.host.name}</Link></div>
                            <div className="bottom-padding">From: <strong>{moment.utc(transaction.startDate).format('LL')}</strong></div>
                            <div className="bottom-padding">To: <strong>{moment.utc(transaction.endDate).format('LL')}</strong></div>
                            <div className="price">Order Total: ${transaction.price}</div>
                          </div>
                        </div>
                    </div>
                </div>
            )
        }) : <p>You have no upcoming reservations for other hosts' homes.</p>}
         </section>
        :null}
        {this.props.activeTab.name === 'Your Past Reservations' ?
        <section className="panel">
          <h2 className="panel-heading">Your Past Reservations</h2>
          {this.props.pastGuest.length ? this.props.pastGuest.map(transaction => {
            return (
                <div className="order-info" key={transaction.id}>
                    <div className="order order-header row thead-inverse">
                      <div className="order-column">
                          <div><strong>Order #</strong></div>
                          <div className="center">{transaction.id}</div>
                      </div>
                      <div className="right">
                          <div><strong>Order placed</strong></div>
                          <div>{moment(transaction.created_at).format('LL')}</div>
                      </div>
                    </div>
                    <div className="order order-body flex">
                        <div className = "row">
                          <div className="left col-sm-6"><img src={transaction.home.imageUrl} className="order-thumb col-xs-12"/></div>
                          <div className="col-sm-6">
                            <div className="bottom-padding">Home: <Link to={`/homes/${transaction.home.id}`} className="link">{transaction.home.name}</Link></div>
                            <div className="bottom-padding">Host: <Link to={`/users/${transaction.host.id}`} className="link">{transaction.host.name}</Link></div>
                            <div className="bottom-padding">From: <strong>{moment.utc(transaction.startDate).format('LL')}</strong></div>
                            <div className="bottom-padding">To: <strong>{moment.utc(transaction.endDate).format('LL')}</strong></div>
                            <div className="price">Order Total: ${transaction.price}</div>
                          </div>
                        </div>
                    </div>
                </div>
            )
        }) : <p>You have no past reservations made for other hosts' homes.</p>}
        </section>
        :null}
        {this.props.activeTab.name === 'Transaction History as Host' ?
        <section className="panel">
          <h2 className="panel-heading">Transaction History as Host</h2>
          {this.props.host.length ? this.props.host.map(transaction => {
            return (
              <div className="order-info" key={transaction.id}>
                <div className="order order-header row thead-inverse">
                  <div className="order-column">
                      <div><strong>Order #</strong></div>
                      <div className="center">{transaction.id}</div>
                  </div>
                  <div className="right">
                      <div><strong>Order placed</strong></div>
                      <div>{moment(transaction.created_at).format('LL')}</div>
                  </div>
                </div>
                <div className="order order-body flex">
                    <div className = "row">
                      <div className="left col-sm-6"><img src={transaction.home.imageUrl} className="order-thumb col-xs-12"/></div>
                      <div className="col-sm-6">
                        <div className="bottom-padding">Home: <Link to={`/homes/${transaction.home.id}`} className="link">{transaction.home.name}</Link></div>
                        <div className="bottom-padding">Guest: <Link to={`/users/${transaction.guest.id}`} className="link">{transaction.guest.name}</Link></div>
                        <div className="bottom-padding">From: <strong>{moment.utc(transaction.startDate).format('LL')}</strong></div>
                        <div className="bottom-padding">To: <strong>{moment.utc(transaction.endDate).format('LL')}</strong></div>
                        <div className="price">Order Total: ${transaction.price}</div>
                      </div>
                    </div>
                </div>
              </div>
            )
          }) : <p>No one has made reservations for your home yet.</p>}
        </section>
        :null}
      </div>
    );
  }
}

export default class Profile extends React.Component {
  constructor(props) {
      super(props)
      this.state =Object.assign({
        activeTab: tabData[0]
      }, store.getState())
      this.handleClick = this.handleClick.bind(this)
  }

  handleClick(tab) {
    this.setState({activeTab: tab});
  }

  render() {
    const isUserSame = (this.props.selected.id === this.props.user_id);

    return (
      <div className="panel">
        <div className="col-lg-3 col-md-3 col-sm-12 panel-body">
          <div className="media">
              <div>
                  <img className="thumbnail img-responsive" src={this.props.selected.picture} width="300px" height="300px"/>
              </div>
              <div className="media-body">
                  <hr/>
                  <h3><strong>Name</strong></h3>
                  <p>{this.props.selected.name}</p>
                  <hr/>
                  <h3><strong>Email</strong></h3>
                  <p>{this.props.selected.email}</p>
                  <hr/>
                  <h3><strong>My Homes</strong></h3>
                  {this.props.userHomes.map(home => {
                    return (
                      <div key={home.id}>
                        <Link to={`/homes/${home.id}`}>{home.name}</Link>
                      </div>
                    )
                  })}
              </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 panel-body">
            {
              isUserSame
              ? (
                 <div>
                    <Tabs activeTab={this.state.activeTab} changeTab={this.handleClick} />
                    <Content
                        activeTab={this.state.activeTab}
                        selected={this.props.selected}
                        userHomes={this.props.userHomes}
                        pastGuest={this.props.pastGuest}
                        futureGuest={this.props.futureGuest}
                        host={this.props.host}
                    />
                  </div>
                )
              : (
                 <div>
                 <h1>{this.props.selected.name}'s Homes:</h1>
                 <Homes homes={this.props.userHomes}/>
                 </div>
                )
            }

        </div>
      </div>
    );
  }
}



