import React, {Component} from 'react'
import { Link } from 'react-router'
import HomeInformationForm from './HomeInformationForm'

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
        <HomeInformationForm
          homeName={this.state.homeName}
          homeLocation={this.state.homeLocation}
          homeImageUrl={this.state.homeImageUrl}
          homePrice={this.state.homePrice}
          homeDescription={this.state.homeDescription}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
    </div>
    )
  }
}

export default EditHome
