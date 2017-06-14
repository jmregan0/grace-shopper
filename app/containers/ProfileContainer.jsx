import React from 'react'
import { connect } from 'react-redux'
import Profile from '../components/Profile'
// import { showUpcoming, showPast, showHostHistory } from '../action-creators/transactions'

const mapStateToProps = (state) => {
  console.log('state in profilecontainer', state);
  console.log("state.homes.userHomes", state.homes.userHomes)
  let user_id = state.auth ? state.auth.id : null;
  let host_id = state.homes ? state.homes.selected.host_id : null;
  return {
    selected: state.users.selected,
    pastGuest: state.transactions.pastGuest,
    futureGuest: state.transactions.futureGuest,
    host: state.transactions.host,
    userHomes: state.homes.userHomes,
    user_id: user_id,
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
