import React from 'react'
import { connect } from 'react-redux'
import SelectedHome from '../components/SelectedHome'
import {addAvailabilityToCartAC} from '../action-creators/cart'


const mapStateToProps = (state) => {
  return {
  	state: state,
    selected: state.homes.selected,
    availability: state.availability,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  	addAvailabilityToCart(homeId, startDate, endDate){
  		dispatch(addAvailabilityToCartAC(homeId, startDate, endDate))
  	}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedHome);
