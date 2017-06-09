import React, {Component} from 'react'
import { Link } from 'react-router'

class EditHome extends Component {
  constructor(props) {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    console.log('props in construct', props);
    this.state = {
      props
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  componentDidMount() {
    console.log('mounted', this.props);

    this.setState({
      // homeName: home.name,
      // homeLocation: home.location,
      // homeImageUrl:home.imageUrl,
      // homePrice: home.price,
      // homeDescription: home.description,
    })
  }

  render() {
    return (
      <div className = "container">
        <h1>Edit Home: {}</h1>
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

export default EditHome
