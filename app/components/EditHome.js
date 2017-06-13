import React, {Component} from 'react'
import { Link } from 'react-router'
import HomeInformationForm from './HomeInformationForm'
import CalendarForm from './CalendarForm'
import moment from 'moment'

class EditHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //state for home information form
      id: props.params.homeId,
      name: props.name,
      location: props.location,
      imageUrl:props.imageUrl,
      price: props.price,
      description: props.description,
      //state for add availability form
      startAdd: null,
      endAdd: null,
      minDate: props.minDate,
      storedDates: props.storedDates,
      //state for delete availability form
      startDelete: null,
      endDelete: null,
      maxDateDelete: props.maxDateDelete,
      disabledDeleteDates: props.disabledDeleteDates,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleDateDeleteChange = this.handleDateDeleteChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.hasFormError(this.state)) {
      this.setState({
        error: "An error occured. Please make sure Name, Location, and Price are populated. You can also not delete a date with an overlapping reservation. Price must also be greater than $0.00/night. ",
      })
    } else {
      this.props.editHome(this.state)
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
        startAdd: e.start,
        endAdd: e.end
      })
    }
  }

  //could refactor and make dry later
  handleDateDeleteChange(e) {
    if(e.eventType === 3) {
      this.setState({
        startDelete: e.start,
        endDelete: e.end
      })
    }
  }

  hasFormError(payload) {
    if(payload.name.length === 0 || payload.location.length === 0) return true
    if(payload.price.length === 0 || parseFloat(payload.price) <= 0.0) return true


    for(let i = 0; i < payload.disabledDeleteDates.length; i++) {
      let unavailableDate = payload.disabledDeleteDates[i]
      if(payload.startDelete < unavailableDate && payload.endDelete > unavailableDate){
        return true;
      }
    }
    return false;
  }

  componentDidMount() {
    this.setState({
      //state for home information form
      name: this.props.name,
      location: this.props.location,
      imageUrl:this.props.imageUrl,
      price: this.props.price,
      description: this.props.description,
      //state for add availability form
      minDate: this.props.minDate,
      storedDates: this.props.storedDates,
      //state for delete availability form
      maxDateDelete: this.props.maxDateDelete,
      disabledDeleteDates: this.props.disabledDeleteDates,
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      this.setState({
        //state for home information form
        name: nextProps.name,
        location: nextProps.location,
        imageUrl:nextProps.imageUrl,
        price: nextProps.price,
        description: nextProps.description,
        //state for add availability form
        minDate: nextProps.minDate,
        storedDates: nextProps.storedDates,
        //state for delete availability form
        maxDateDelete: nextProps.maxDateDelete,
        disabledDeleteDates: nextProps.disabledDeleteDates,
      })
    }
  }

  render() {
    console.log('storedDates', this.state.storedDates)
    return (
      this.props.user_id === this.props.host_id
      ? (
        <div className = "container">
          <h1>Edit Home Listing</h1>
          <hr/>
          <div className = "row">
            <div className = "col-sm-6">
              <h3>Add New Availability:</h3>
              <p><em>Select a new date range to add new availability to your home listing.</em></p>
              <CalendarForm
                minDate={this.state.minDate}
                disabledDates={this.state.storedDates}
                handleDateChange={this.handleDateChange}
              />
            </div>
            <div className = "col-sm-6">
              <h3>Delete Availability:</h3>
              <p><em>Select a date range to delete pre-existing availability to your home listing.</em></p>
              {
                this.state.storedDates.length
                ? (
                  <CalendarForm
                    handleDateChange={this.handleDateDeleteChange}
                    maxDate={this.state.maxDateDelete}
                    minDate={this.state.minDate}
                    disabledDates={this.state.disabledDeleteDates}
                  />
                  )
                : (
                    <div>
                      <h3>No dates available for this listing at the moment.</h3>
                    </div>
                  )
              }

            </div>
          </div>
          <hr/>
          <div className = "row">
            <div className = "col-xs-12">
              {
                this.state.error
                ? (
                    <div className="alert alert-danger">
                      <strong>{this.state.error}</strong>
                    </div>
                  )
                : null
              }
              <h3>Edit Home Details:</h3>
              <HomeInformationForm
                name={this.state.name || ""}
                location={this.state.location || ""}
                imageUrl={this.state.imageUrl || ""}
                price={this.state.price || ""}
                description={this.state.description || ""}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            </div>
          </div>
          <div className = "row">
            <button
              type = "submit"
              className = "btn btn-primary"
              onClick = {this.handleSubmit}
              >
              Submit
            </button>
          </div>
        </div>
      )
      : (
          <div className = "container">
            <h2>You do not have permissions to view this page.</h2>
            <Link to='/homes'><button className = "btn">Return to homes</button></Link>
          </div>
      )
    )
  }
}

export default EditHome
