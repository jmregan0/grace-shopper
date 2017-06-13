import React, { Component } from 'react'
import { Link } from 'react-router'
import CalendarForm from './CalendarForm'

class SelectedHome extends Component {
  constructor(props) {

    super()
    this.state = {
      minDate: props.minDate,
      maxDate: props.maxDate,
      unavailableDays: props.unavailableDays,
      start: props.minDate,
      end: props.minDate,
    }
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextprops in selectedhome', nextProps);
    // console.log('currentprops in selectedhome', this.props);
    if(nextProps !== this.props) {
      this.setState({
        minDate: nextProps.minDate,
        maxDate: nextProps.maxDate,
        start: nextProps.minDate,
        end: nextProps.minDate,
        unavailableDays: nextProps.unavailableDays,
      })
    }

  }

  handleDateChange(e) {
    if(e.eventType === 3) {
      this.setState({
        start: e.start,
        end: e.end,
        error: null,
      })

      let startDate = new Date(e.start)
      let endDate = new Date(e.end)
      for(let i = 0; i < this.state.unavailableDays.length; i++) {
        let unavailableDate = new Date(this.state.unavailableDays[i])
        if(startDate < unavailableDate && endDate > unavailableDate) {
          console.log('handlechange info start', startDate);
          console.log('handlechange info end', endDate);
          console.log('handlechange info unavail', unavailableDate);

          this.setState({
            error: "You have selected an invalid date range. Please select a new date range."
          })
          break;
        }
      }
    }
  }

  render() {

    // console.log('selectedhome props', this.props);
    // console.log('selectedhome state', this.state);
    const home = this.props.selected
    const host = this.props.selected.Host
    const dates = this.props.availability.list

    const auth = this.props.state.auth;
    console.log(this.props)
    return (
      <div className = "container">
        <div className="alert">
          <h5><em>This is your home listing. Edit your listing here:</em></h5>
          <Link to = {`/homes/${home.id}/edit`} ><button className = 'btn btn-secondary'>Edit this Listing</button></Link>
        </div>
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
            {
              dates.length
              ? (
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
                    <div className="row">
                      <CalendarForm
                        minDate={this.state.minDate}
                        maxDate={this.state.maxDate}
                        start={this.state.start || new Date()}
                        end={this.state.end || new Date()}
                        unavailableDays={this.state.unavailableDays}
                        handleDateChange={this.handleDateChange}
                      />
                    </div>
                    <div className = "row">
                      <button
                        className = 'btn btn-primary'
                        disabled={this.state.error||false}
                        onClick ={
                          () => {
                            // this.props.addAvailabilityToCart(home.id, startDate1.value, endDate1.value)
                            console.log('onclick', this.state.start, this.state.end)
                            this.props.addAvailabilityToCart(home.id, this.state.start, this.state.end, auth)
                          }
                        }>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                )
              : (
                  <div>
                    <h2>Booking Details:</h2>
                    <h3>No dates currently available.</h3>
                    <Link to = {`/homes/${home.id}/edit`} ><button className = 'btn btn-secondary'>Edit this Listing</button></Link>
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
