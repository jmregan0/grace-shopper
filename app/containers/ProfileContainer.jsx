import React from 'react'
import { connect } from 'react-redux'
import Profile from '../components/Profile'
// import { showUpcoming, showPast, showHostHistory } from '../action-creators/transactions'

const mapStateToProps = (state) => {
  console.log("state.homes.userHomes", state.homes.userHomes)
  return {
    selected: state.users.selected,
    pastGuest: state.transactions.pastGuest,
    futureGuest: state.transactions.futureGuest,
    host: state.transactions.host,
    userHomes: state.homes.userHomes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // displayUpcoming: () => dispatch(showUpcoming()),
    // displayPast: () => dispatch(showPast()),
    // displayHostHistory: () => dispatch(showHostHistory()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
