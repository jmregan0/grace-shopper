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
  // let disabledDates = [];
  let dates = state.availability.list;
  console.log('dates', dates)
  if(dates.length){
    minDate = new Date(dates.reduce((acc, val) => {
      if(moment(acc.date).isAfter(moment(val.date)) && val.status === 'available') return val;
      return acc;
    }).date)

    maxDate = new Date(dates.reduce((acc, val) => {
      if(moment(acc.date).isBefore(moment(val.date)) && val.status === 'available') return val;
      return acc;
    }).date)

    // disabledDates = dates.filter(date => date.status === 'reserved').map(date => new Date(date.date))

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
    minDateAdd: minDate,
    startAdd: startAdd,
    storedDates: storedDates,
    //state for the remove availability form

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
