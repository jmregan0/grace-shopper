import axios from 'axios'
import { FETCH_HOMES, FETCH_LATEST_HOMES, SET_CURRENT_HOME } from '../constants'

export const fetchHomes = homes => ({
  type: FETCH_HOMES,
  homes
})

export const fetchLatestHomes = latestHomes => ({
  type: FETCH_LATEST_HOMES,
  latestHomes
})

export const setCurrentHome = home => ({
  type: SET_CURRENT_HOME,
  home
})

export const getHomeById = homeId => {
  return dispatch => {
    axios.get(`/api/homes/${homeId}`)
    .then(res => {
      dispatch(setCurrentHome(res.data))
    })
  }
}
