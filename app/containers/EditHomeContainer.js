import React from 'react'
import { connect } from 'react-redux'
import EditHome from '../components/EditHome'
import { editHome } from '../action-creators/homes'

const mapStateToProps = (state) => {
  console.log('container state in ehc', state)
  return {
    name: state.homes.selected.name,
    location: state.homes.selected.location,
    imageUrl:state.homes.selected.imageUrl,
    price: state.homes.selected.price,
    description: state.homes.selected.description,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    editHome(home) {
      return dispatch(editHome(home))
    }
  }
}

const EditHomeContainer = connect(mapStateToProps, mapDispatchToProps)(EditHome)

export default EditHomeContainer
