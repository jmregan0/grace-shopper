import React, { Component } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import CalendarForm from './CalendarForm'
import NewHomeForm from './NewHomeForm'


class NewHome extends Component {
  constructor(props) {
    super()
    this.state = {
      homeName: '',
      homeLocation: '',
      homeImageUrl:'',
      homePrice: '',
      homeDescription: '',
      start: new Date(),
      end: new Date(),
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let userId = this.props.auth.id
    // this.props.getUserById(userId);
    let payload = {
      host_id: userId,
      name: this.state.homeName,
      location: this.state.homeLocation,
      description: this.state.homeDescription,
      imageUrl: this.state.homeImageUrl,
      price: this.state.homePrice,
      createdAt: new Date(),
      updatedAt: new Date(),
      startDate: this.state.start,
      endDate: this.state.end,
    }

    if (this.hasFormError(payload)) {
      this.setState({
        error: "An error occured. Please make sure Name, Location, and Price are populated. Price must also be greater than $0.00/night.",
      })
    } else {
      Object.keys(payload).forEach(key => {
        console.log(key, payload[key])
        if(payload[key] === '') delete payload[key];
      })
      this.props.addNewHome(payload)
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleDateChange(e) {
    if(e.eventType === 3) {
      this.setState({
        start: e.start,
        end: e.end,
      })
    }
  }


  hasFormError(payload) {
    console.log('payload', payload)
    if(payload.name.length === 0 || payload.location.length === 0 || payload.price.length === 0 || parseFloat(payload.price) <= 0.0) return true
    return false;
  }

  render() {
    return (
      <div className = "container">
        {
          this.state.error
          ? (
              <div className="alert alert-danger">
                <strong>{this.state.error}</strong>
              </div>
            )
          : null
        }
        <h1>Add New Home</h1>
        <hr/>
        <div className = "row">
          <div className = "col-sm-6">
            <h2>Set Initial Availability:</h2>
            <CalendarForm
              handleDateChange={this.handleDateChange}
              start={this.state.start}
              end={this.state.end}
            />
          </div>
          <div className = "col-sm-6">
            <NewHomeForm
              homeName={this.state.homeName}
              homeLocation={this.state.homeLocation}
              homeImageUrl={this.state.homeImageUrl}
              homePrice={this.state.homePrice}
              homeDescription={this.state.homeDescription}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </div>
      )

  }
}

export default NewHome;
