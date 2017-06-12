import React from 'react'
import { connect } from 'react-redux'
import Landing from '../components/Landing'

const mapStateToProps = (state) => {
  return {
    latest: state.homes.latest,
  }
}

const LandingContainer = connect(mapStateToProps)(Landing)

export default LandingContainer
