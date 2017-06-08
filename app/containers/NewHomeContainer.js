import React from 'react'
import { connect } from 'react-redux'
import NewHome from '../components/NewHome'
import { addNewHome } from '../action-creators/homes'


const mapStateToProps = (state) => {
  return {
    user: state.users.selected,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addNewHome(home){
      dispatch(addNewHome(home));
    },
  }
}

const NewHomeContainer = connect(mapStateToProps, mapDispatchToProps)(NewHome);

export default NewHomeContainer;
