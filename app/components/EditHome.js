import React, {Component} from 'react'
import { Link } from 'react-router'
import HomeInformationForm from './HomeInformationForm'
import CalendarForm from './CalendarForm'
import moment from 'moment'

class EditHome extends Component {
  constructor(props) {
    console.log('edithome props', props)
    super()
    this.state = {
      //state for home information form
      id: props.params.homeId,
      name: props.name,
      location: props.location,
      imageUrl:props.imageUrl,
      price: props.price,
      description: props.description,
      //state for add availability form
      startAdd: props.startAdd,
      endAdd: props.startAdd,
      minDateAdd: props.minDateAdd,
      storedDates: props.storedDates,
      //state for delete availability form
      startDelete: null,
      endDelete: null,
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
        error: "An error occured. Please make sure Name, Location, and Price are populated. Price must also be greater than $0.00/night.",
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
    console.log(e)
    if(e.eventType === 3) {
      this.setState({
        startAdd: e.start,
        endAdd: e.end
      })
    }
  }

  //could refactor and make dry later
  handleDateDeleteChange(e) {
    console.log(e)
    if(e.eventType === 3) {
      this.setState({
        startDelete: e.start,
        endDelete: e.end
      })
    }
  }

  hasFormError(payload) {
    if(payload.name.length === 0 || payload.location.length === 0 || payload.price.length === 0 || parseFloat(payload.price) <= 0.0) return true
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
      minDateAdd: this.props.minDateAdd,
      storedDates: this.props.storedDates,
      startAdd: this.props.startAdd,
      endAdd: this.props.startAdd,
      //state for delete availability form
      startDelete: null,
      endDelete: null,
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
        minDateAdd: nextProps.minDateAdd,
        storedDates: nextProps.storedDates,
        startAdd: nextProps.startAdd,
        endAdd: nextProps.startAdd,
        //state for delete availability form
        startDelete: null,
        endDelete: null,
      })
    }
  }

  render() {
    console.log('edithome state', this.state);
    return (
      <div className = "container">
        <h1>Edit Home Listing</h1>
        <hr/>
        <div className = "row">
          <div className = "col-sm-6">
            <h3>Add New Availability:</h3>
            <p><em>Select a new date range to add new availability to your home listing.</em></p>
            <CalendarForm
              minDate={this.state.minDateAdd}
              disabledDates={this.state.storedDates}
              start={this.state.startAdd}
              end={this.state.endAdd}
              handleDateChange={this.handleDateChange}
            />
          </div>
          <div className = "col-sm-6">
            <h3>Delete Availability:</h3>
            <p><em>Select a date range to delete pre-existing availability to your home listing.</em></p>
            <CalendarForm
              handleDateChange={this.handleDateDeleteChange}
              disabledDates={[]}
            />
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
    </div>
    )
  }
}

export default EditHome
