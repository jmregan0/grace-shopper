import React, {Component} from 'react'
import { Link } from 'react-router'
import HomeInformationForm from './HomeInformationForm'

class EditHome extends Component {
  constructor(props) {
    super()
    console.log('props in construct', props);
    this.state = {
      id: props.params.homeId,
      name: props.name,
      location: props.location,
      imageUrl:props.imageUrl,
      price: props.price,
      description: props.description,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    console.log('edit submit hit');
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

  hasFormError(payload) {
    console.log('payload', payload)
    if(payload.name.length === 0 || payload.location.length === 0 || payload.price.length === 0 || parseFloat(payload.price) <= 0.0) return true
    return false;
  }

  componentDidMount() {
    console.log('cdm mounted', this.props);

    this.setState({
      name: this.props.name,
      location: this.props.location,
      imageUrl:this.props.imageUrl,
      price: this.props.price,
      description: this.props.description,
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('wrp mounted', this.props);
    console.log('wrp mounted next', nextProps);
    if(nextProps !== this.props) {
      this.setState({
        name: nextProps.name,
        location: nextProps.location,
        imageUrl:nextProps.imageUrl,
        price: nextProps.price,
        description: nextProps.description,
      })
    }
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
        <h1>Edit Home:</h1>
        <hr/>
        <HomeInformationForm
          name={this.state.name}
          location={this.state.location}
          imageUrl={this.state.imageUrl}
          price={this.state.price}
          description={this.state.description}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
    </div>
    )
  }
}

export default EditHome
