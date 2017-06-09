import React from 'react'
import { connect } from 'react-redux'
import Homes from '../components/Homes'

const mapStateToProps = (state) => {
  return {
    homes: state.homes.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const HomesContainer = connect(mapStateToProps, mapDispatchToProps)(Homes)

export default HomesContainer
