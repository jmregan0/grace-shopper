import React from 'react'
import { connect } from 'react-redux'
import Landing from '../components/Landing'

const mapStateToProps = (state) => {
  return {
    latest: state.homes.latest,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const LandingContainer = connect(mapStateToProps, mapDispatchToProps)(Landing)

export default LandingContainer
