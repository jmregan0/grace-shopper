import React from 'react'
import { connect } from 'react-redux'
import EditHome from '../components/EditHome'

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    // homeName: home.name,
    // homeLocation: home.location,
    // homeImageUrl:home.imageUrl,
    // homePrice: home.price,
    // homeDescription: home.description,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const EditHomeContainer = connect(mapStateToProps, mapDispatchToProps)(EditHome)

export default EditHomeContainer
