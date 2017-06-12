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
    axios.put(`/api/availability/${date.id}`)
    .then(res => {
      dispatch(makeUnavailable(res.data))
    })
  }
}
