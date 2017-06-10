import React, {Component} from 'react'
import { Link } from 'react-router'

class EditHome extends Component {
  constructor(props) {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    console.log('props in construct', props);
    this.state = {
      name: props.name,
      location: props.location,
      imageUrl:props.imageUrl,
      price: props.price,
      description: props.description,
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
      name: this.props.name,
      location: this.props.location,
      imageUrl:this.props.imageUrl,
      price: this.props.price,
      description: this.props.description,
    })
  }

  componentWillReceiveProps() {
    console.log('mounted', this.props);

    this.setState({
      name: this.props.name,
      location: this.props.location,
      imageUrl:this.props.imageUrl,
      price: this.props.price,
      description: this.props.description,
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
                name="name"
                value = {this.state.name}
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
                name="location"
                value = {this.state.location}
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
                name="imageUrl"
                value = {this.state.imageUrl}
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
                name="price"
                value = {this.state.price}
                onChange = {this.handleChange}
                />
            </div>
          </div>
          <div className = "form-group">
            <h3>Description:</h3>
            <textarea
              className="form-control"
              name="description"
              rows="5"
              value = {this.state.description}
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
