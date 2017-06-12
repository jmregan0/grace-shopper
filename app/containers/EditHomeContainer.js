import React from 'react'
import { connect } from 'react-redux'
import EditHome from '../components/EditHome'
import { editHome } from '../action-creators/homes'
import moment from 'moment'

const mapStateToProps = (state) => {
  console.log('ehc state', state);
  let minDate = new Date();
  let maxDate = new Date();
  let startAdd = new Date();

  let storedDates = []
  let disabledDeleteDates = [] //these dates will be disabled in the delete calendar form
  let dates = state.availability.list;
  console.log('dates', dates)
  if(dates.length){
    //similar logic exists in selectedhomecontainer - probably can refactor
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
    disabledDeleteDates = inbetweenDates.filter(date => !(dateArr.find(dateArrVal => dateArrVal.getTime() === date.getTime())))

    let bookedDates = dates.filter(date => date.status==='reserved').map(date => new Date(date.date))

    disabledDeleteDates = [...disabledDeleteDates, ...bookedDates]

    storedDates = dates.map(date => new Date(date.date))

    startAdd = moment(maxDate).add(1, 'days').toDate();

    console.log('startAdd', startAdd)
    console.log('mapstatetoprops mindate', minDate);
    console.log('mapstatetoprops maxdate', maxDate);
    // console.log('mapstatetoprops disabledDates', disabledDates);
  }

  return {
    //state for home information form
    name: state.homes.selected.name,
    location: state.homes.selected.location,
    imageUrl:state.homes.selected.imageUrl,
    price: state.homes.selected.price,
    description: state.homes.selected.description,
    //state for the new availability form
    availability: state.availability,
    minDate: minDate,
    storedDates: storedDates,
    //state for the remove availability form
    maxDateDelete: maxDate,
    disabledDeleteDates: disabledDeleteDates,

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    editHome(home) {
      return dispatch(editHome(home))
    }
  }
}

const EditHomeContainer = connect(mapStateToProps, mapDispatchToProps)(EditHome)

export default EditHomeContainer
