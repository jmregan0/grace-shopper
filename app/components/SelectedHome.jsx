import React, { Component } from 'react'
import { Link } from 'react-router'
import CalendarForm from './CalendarForm'

class SelectedHome extends Component {
  constructor(props) {
    console.log('props in selectedhome constructor', props)
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
    console.log('nextprops in selectedhome', nextProps);
    console.log('currentprops in selectedhome', this.props);
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

    console.log('selectedhome props', this.props);
    console.log('selectedhome state', this.state);
    const home = this.props.selected
    const host = this.props.selected.Host
    const dates = this.props.availability.list


    return (
      <div className = "container">
        <div className="alert">
          <h5><em>This is your home listing. Edit your listing here:</em></h5>
          <Link to = {`/homes/${home.id}/edit`} ><button className = 'btn btn-secondary'>Edit this Listing</button></Link>
        </div>
          <hr/>
        <h1>{home.name}</h1>
        <h4>Host: <Link to={`/users/${home.host_id}`}>{host.name}</Link></h4>
        <div className = "row">
          <img src={home.imageUrl} className="col-md-6 col-sm-12"/>
          <div className = "col-md-6 col-sm-12">
            <h4>Price/Night: ${home.price}</h4>
            <h4>Location: {home.location}</h4>
            <p>{home.description}</p>
          </div>
        </div>
        <hr/>
        <div className = "row">
          <div className = "col-md-6 col-sm-12">
            <h1>Section for something here...</h1>
          </div>
          {
            dates.length
            ? (
                <div className = "col-md-6 col-sm-12">
                  <h2>Booking Details:</h2>
                  {
                    this.state.error
                    ? (
                        <div className="alert alert-danger">
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
                  <h4>Select your dates:</h4>
                  <h4>Start Date:</h4>
                  {/*<select className="form-control padding-bottom" id = "startDate1">
                  {dates.map(date =>
                    <option key={`${date.id}`} value={`${date.date}`}>{date.date}</option>
                  )}
                  </select>
                  <h4>End Date:</h4>
                  <select className="form-control padding-bottom" id = "endDate1">
                  {dates.map(date =>
                    <option key={`${date.id}`} value={`${date.date}`}>{date.date}</option>
                  )}
                  </select>*/}
                  <div className = "row">
                    <button
                      className = 'btn btn-primary'
                      disabled={this.state.error||false}
                      onClick ={
                        () => {
                          // this.props.addAvailabilityToCart(home.id, startDate1.value, endDate1.value)
                          console.log('onclick', this.state.start, this.state.end)
                          this.props.addAvailabilityToCart(home.id, this.state.start, this.state.end)
                        }
                      }>
                      Add to Cart
                    </button>
                  </div>
                </div>
              )
            : (
                <div className = "col-md-6 col-sm-12">
                  <h2>Booking Details:</h2>
                  <h3>No dates currently available.</h3>
                  <Link to = {`/homes/${home.id}/edit`} ><button className = 'btn btn-secondary'>Edit this Listing</button></Link>
                </div>
              )
          }
        </div>
      </div>
    )
  }
}

export default SelectedHome;
