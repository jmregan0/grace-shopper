import React, { Component } from 'react'
import { Link } from 'react-router'
import CalendarForm from './CalendarForm'

class SelectedHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: props.auth,
      home: props.selected,
      minDate: props.minDate,
      maxDate: props.maxDate,
      disabledDates: props.disabledDates,
      start: props.minDate,
      end: props.minDate,
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps !== this.props) {
      this.setState({
        auth: nextProps.auth,
        home: nextProps.selected,
        minDate: nextProps.minDate,
        maxDate: nextProps.maxDate,
        start: nextProps.minDate,
        end: nextProps.minDate,
        disabledDates: nextProps.disabledDates,
      })
    }

  }

  handleSubmit(e) {
    console.log('state of selectedhome', this.state);
    e.preventDefault();
    console.log('onclick in handleSubmit', this.state.start, this.state.end, this.state.auth)
    this.props.addAvailabilityToCart(this.state.home.id, this.state.start, this.state.end, this.state.auth)
  }

  handleDateChange(e) {
    if(e.eventType === 3) {
      this.setState({
        start: e.start,
        end: e.end,
        error: null,
      })

      this.checkDateErrors(e.start, e.end);
    }
  }

  checkDateErrors(start, end) {
    let startDate = new Date(start)
    let endDate = new Date(end)
    for(let i = 0; i < this.state.disabledDates.length; i++) {
      let unavailableDate = new Date(this.state.disabledDates[i])
      if(startDate < unavailableDate && endDate > unavailableDate) {
        this.setState({
          error: "You have selected an invalid date range. Please select a new date range."
        })
        break;
      }
    }
  }

  renderCalendarContent() {
    if((this.props.host_id !== this.props.user_id)){
      return (
        <div>
          <h2>Booking Details:</h2>
          {
            this.state.error
            ? (
                <div className="col-xs-12 alert alert-danger">
                  <strong>{this.state.error}</strong>
                </div>
              )
            : null
          }
          {
            this.props.availability.list.length
            ? (
                <div>
                  <div className="row">
                    <CalendarForm
                      minDate={this.state.minDate}
                      maxDate={this.state.maxDate}
                      start={this.state.start || null}
                      end={this.state.end || null}
                      disabledDates={this.state.disabledDates}
                      handleDateChange={this.handleDateChange}
                    />
                  </div>
                  <div className = "row">
                    <button
                      className = 'btn btn-primary'
                      disabled={this.state.error||false}
                      onClick ={this.handleSubmit}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              )
            : null
          }
        </div>
      )
    } else {
      return (
        <div>
          <h2>Booking Details:</h2>
          <p><em>This is your home listing. You can view pending reservations for this listing in the Upcoming Reservations tab of your user profile.</em></p>
          <Link to = {`/users/${this.props.auth.id}`} >
            <button className = 'btn btn-secondary'>Go to My Profile</button>
          </Link>
        </div>
      )
    }
  }

  render() {

    // console.log('selectedhome state', this.state);
    const home = this.props.selected
    const host = this.props.selected.Host
    const dates = this.props.availability.list
    const auth = this.props.auth;
    const isHostOwner = (this.props.host_id === this.props.user_id);
    return (
      <div className = "container">
        {
          isHostOwner
          ? (
            <div className="alert">
              <h5><em>This is your home listing. Edit your listing here:</em></h5>
              <Link to = {`/homes/${home.id}/edit`} ><button className = 'btn btn-secondary'>Edit this Listing</button></Link>
            </div>
          )
          : null
        }

          <hr/>
        <div className = "row">
          <div className="col-md-6 col-sm-12">
            <h1>{home.name}</h1>
            <h4>Host: <Link to={`/users/${home.host_id}`}>{host.name}</Link></h4>
            <img src={home.imageUrl} className="col-xs-12"/>
            <div className = "col-sm-12">
              <h4>Price/Night: ${home.price}</h4>
              <h4>Location: {home.location}</h4>
              <p>{home.description}</p>
            </div>
          </div>
          <div className = "col-md-6 col-sm-12">
            {this.renderCalendarContent()}
            {
              dates.length || isHostOwner
              ? null
              : (
                  <div>
                    <h3>No dates currently available.</h3>
                  </div>
                )
            }
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}

export default SelectedHome;
