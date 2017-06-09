import React from 'react'
import { connect } from 'react-redux'
import Profile from '../components/Profile'

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    selected: state.users.selected,
    guest: state.transactions.guest,
    host: state.transactions.host,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
