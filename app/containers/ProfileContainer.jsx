import React from 'react'
import { connect } from 'react-redux'
import Profile from '../components/Profile'

const mapStateToProps = (state) => {
  console.log("state.users.userHomes", state.users.userHomes)
  return {
    selected: state.users.selected,
    guest: state.transactions.guest,
    host: state.transactions.host,
    userHomes: state.users.userHomes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
