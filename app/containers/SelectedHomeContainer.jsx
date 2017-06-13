import React from 'react'
import { connect } from 'react-redux'
import SelectedHome from '../components/SelectedHome'
import {addAvailabilityToCartAC} from '../action-creators/cart'

import moment from 'moment'


const mapStateToProps = (state) => {
  let user = state.users.selected;
  let auth = state.auth;

  let minDate = new Date();
  let maxDate = new Date();
  let unavailableDays = [];
  let dates = state.availability.list;

  if(dates.length){
    minDate = new Date(dates.reduce((acc, val) => {
      if(moment(acc.date).isAfter(moment(val.date)) && val.status === 'available') return val;
      return acc;
    }).date)

    maxDate = new Date(dates.reduce((acc, val) => {
      if(moment(acc.date).isBefore(moment(val.date)) && val.status === 'available') return val;
      return acc;
    }).date)

    unavailableDays = dates.filter(date => date.status === 'reserved').map(date => new Date(date.date))

  }

  return {
  	state: state,
    selected: state.homes.selected,
    availability: state.availability,
    minDate: minDate,
    maxDate: maxDate,
    unavailableDays: unavailableDays,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  	addAvailabilityToCart(homeId, startDate, endDate, auth){
  		dispatch(addAvailabilityToCartAC(homeId, startDate, endDate, auth))
  	}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedHome);
