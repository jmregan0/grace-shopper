import React from 'react'
import { Link } from 'react-router'
import CalendarForm from './CalendarForm'
import moment from 'moment'

const SelectedHome = (props) => {
  console.log('selectedhome props', props);
  const home = props.selected
  const host = props.selected.Host
  const dates = props.availability.list

  let minDate, maxDate;
  console.log('dates', dates)
  if(dates.length){
    const minDate = new Date(dates.reduce((acc, val) => {
      if(moment(acc.date).isBefore(moment(val.date))) return val;
      return acc;
    }).date)

    const maxDate = new Date(dates.reduce((acc, val) => {
      if(moment(acc.date).isAfter(moment(val.date))) return val;
      return acc;
    }).date)
    console.log(minDate);
    console.log(maxDate);
  }

  return (
    <div className = "container">
      <div className="alert">
        <h5><em>This is your home listing. Edit your listing here:</em></h5>
        <Link to = {`/homes/${home.id}/edit`} ><button className = 'btn btn-secondary'>Edit this Listing</button></Link>
      </div>
        <hr/>
      <h1>{home.name}</h1>
      <h4>Host: <Link to={`/users/${home.host_id}`}>{host.name}</Link></h4>
      <div className = "row">
        <img src={home.imageUrl} className="col-md-6 col-sm-12"/>
        <div className = "col-md-6 col-sm-12">
          <h4>Price/Night: ${home.price}</h4>
          <h4>Location: {home.location}</h4>
          <p>{home.description}</p>
        </div>
      </div>
      <hr/>
      <div className = "row">
        <div className = "col-md-6 col-sm-12">
          <h1>Section for something here...</h1>
        </div>
        {
          dates.length
          ? (
              <div className = "col-md-6 col-sm-12">
                <h2>Booking Details:</h2>
                <CalendarForm
                  minDate={minDate}
                  maxDate={maxDate}
                />
                <h4>Select your dates:</h4>
                <h4>Start Date:</h4>
                <select className="form-control padding-bottom" id = "startDate">
                {dates.map(date =>
                  <option key={`${date.id}`} value={`${date.date}`}>{date.date}</option>
                )}
                </select>
                <h4>End Date:</h4>
                <select className="form-control padding-bottom" id = "endDate">
                {dates.map(date =>
                  <option key={`${date.id}`} value={`${date.date}`}>{date.date}</option>
                )}
                </select>
                <button className = 'btn btn-primary' onClick = {() => {}} >Add to Cart</button>
              </div>
            )
          : (
              <div className = "col-md-6 col-sm-12">
                <h2>Booking Details:</h2>
                <h3>No dates currently available.</h3>
                <Link to = {`/homes/${home.id}/edit`} ><button className = 'btn btn-secondary'>Edit this Listing</button></Link>
              </div>
            )
        }


      </div>

    </div>
  )
}

export default SelectedHome;
