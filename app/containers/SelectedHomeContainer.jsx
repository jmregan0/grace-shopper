import React from 'react'
import { connect } from 'react-redux'
import SelectedHome from '../components/SelectedHome'

const mapStateToProps = (state) => {
  console.log(state);
  return {
    selected: state.homes.selected,
    availability: state.availability,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedHome);
