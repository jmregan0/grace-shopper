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
  let disabledDates = [];
  let dates = state.availability.list;

  let user_id = state.auth ? state.auth.id : null;
  let host_id = state.homes ? state.homes.selected.host_id : null;

  if(dates.length){
    //similar logic exists in edithomecontainer - probably can refactor
    //find the minimum date in which the selected home has availability
    minDate = new Date(dates.reduce((acc, val) => {
      if(moment(acc.date).isAfter(moment(val.date)) && val.status === 'available') return val;
      return acc;
    }).date)

    //find the maximum date in which the selected home has availability
    maxDate = new Date(dates.reduce((acc, val) => {
      if(moment(acc.date).isBefore(moment(val.date)) && val.status === 'available') return val;
      return acc;
    }).date)

    //build out a list of days inbetween availability min and availability max. this is in order to populate an array of dates that are disabled between these 2 dates.
    let start = moment(minDate)
    let diff = moment(maxDate).diff(start, 'days');
    let inbetweenDates = [new Date(minDate)];
    for(let i = 0; i < diff; i++) {
      inbetweenDates.push(new Date(start.add(1, 'days')));
    }

    //convert the availability list into an array of dates. this array will contain a list of all availabilities, even if the status is reserved
    let dateArr = dates.map(date => new Date(date.date))

    //remove all of the dates in dateArr from inbetweenDates in order to determine a list of dates that should be disabled in the calendar.
    disabledDates = inbetweenDates.filter(date => !(dateArr.find(dateArrVal => dateArrVal.getTime() === date.getTime())))

    //the prior filter does not leave reserved availabilities in disabledDates, so add them back in below
    let reservedDates = dates.filter(date => date.status === 'reserved').map(date => new Date(date.date))
    console.log('reservedDates', reservedDates)
    disabledDates = [...disabledDates, ...reservedDates]
    console.log('disabledDates', disabledDates)
  }

  return {
  	state: state,
    selected: state.homes.selected,
    availability: state.availability,
    minDate: minDate,
    maxDate: maxDate,
    disabledDates: disabledDates,
    user_id: user_id,
    host_id: host_id,
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
