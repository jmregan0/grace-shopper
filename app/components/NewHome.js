import React, { Component } from 'react'
import { Link } from 'react-router'

class NewHome extends Component {
  constructor(props) {
    super()
    this.state = {
      homeName: '',
      homeLocation: '',
      homeImageUrl:'',
      homePrice: '',
      homeDescription: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let userId = this.props.user.id
    this.props.getUserById(userId);
    let payload = {
      host_id: userId,
      name: this.state.homeName,
      location: this.state.homeLocation,
      description: this.state.homeDescription,
      imageUrl: this.state.homeImageUrl,
      price: this.state.homePrice,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    if (this.hasFormError(payload)) {
      this.setState({
        error: "An error occured. Please make sure Name, Location, and Price are populated.",
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

  hasFormError(payload) {
    if(payload.name.length === 0 || payload.location.length === 0 || payload.price === 0) return true
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
            <form onSubmit = {this.handleSubmit}>
              <div className = "form-group row">
                <div className = "col-sm-3">
                  <h3>Home name:</h3>
                </div>
                <div className = "col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="homeName"
                    value = {this.state.homeName}
                    onChange = {this.handleChange}
                    placeholder = "Name"
                  />
                </div>
              </div>
              <div className = "form-group row">
                <div className = "col-sm-3">
                  <h3>Location:</h3>
                </div>
                <div className = "col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="homeLocation"
                    placeholder = "Location"
                    value = {this.state.homeLocation}
                    onChange = {this.handleChange}
                    />
                </div>
              </div>
              <div className = "form-group row">
                <div className = "col-sm-3">
                  <h3>Image URL:</h3>
                </div>
                <div className = "col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="homeImageUrl"
                    placeholder="Image URL"
                    value = {this.state.homeImageUrl}
                    onChange = {this.handleChange}
                    />
                </div>
              </div>
              <div className = "form-group row">
                <div className = "col-sm-3">
                  <h3>Price/Night:</h3>
                </div>
                <div className = "col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    name="homePrice"
                    placeholder = "Price"
                    value = {this.state.homePrice}
                    onChange = {this.handleChange}
                    />
                </div>
              </div>
              <div className = "form-group">
                <h3>Description:</h3>
                <textarea
                  className="form-control"
                  name="homeDescription"
                  placeholder="Description"
                  rows="5"
                  value = {this.state.homeDescription}
                  onChange = {this.handleChange}
                />
              </div>

              <button type = "submit" className = "btn btn-primary">Submit</button>
            </form>
        </div>
      )

  }
}

export default NewHome;
