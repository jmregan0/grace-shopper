import axios from 'axios'
import { FETCH_AVAILABILITY } from '../constants'

export const fetchAvailability = dates => ({
  type: FETCH_AVAILABILITY,
  dates
})

export const getAvailabilityById = homeId => {
  return dispatch => {
    axios.get(`/api/homes/${homeId}/availability`)
    .then(res => {
      dispatch(fetchAvailability(res.data))
    })
  }
}
