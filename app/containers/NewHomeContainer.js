import React from 'react'
import { connect } from 'react-redux'
import NewHome from '../components/NewHome'
import { addNewHome } from '../action-creators/homes'
import { getUserById } from '../action-creators/users'


const mapStateToProps = (state) => {
  return {
    user: state.users.selected,
    auth: state.auth,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addNewHome(home) {
      dispatch(addNewHome(home));
    },
    getUserById(userId) {
      dispatch(getUserById(userId));
    }
  }
}

const NewHomeContainer = connect(mapStateToProps, mapDispatchToProps)(NewHome);

export default NewHomeContainer;
