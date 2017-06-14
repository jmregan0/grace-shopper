import axios from 'axios'
import { FETCH_AVAILABILITY, MAKE_UNAVAILABLE } from '../constants'

export const fetchAvailability = dates => ({
  type: FETCH_AVAILABILITY,
  dates
})

export const makeUnavailable = date => ({
  type: MAKE_UNAVAILABLE,
  date
})

export const getAvailabilityById = homeId => {
  return dispatch => {
    axios.get(`/api/homes/${homeId}/availability`)
    .then(res => {
      dispatch(fetchAvailability(res.data))
    })
  }
}

export const updateAvailability = date => {
  return dispatch => {
    console.log('here!')
    axios.put(`/api/availability/${date}`, {status: 'reserved'})
    .then(res => res.data)
    .then(updatedDate => {
      console.log('updatedDate in availability', updatedDate)
      dispatch(makeUnavailable(updatedDate))
    })
    .catch(err => console.error(err))
  }
}
