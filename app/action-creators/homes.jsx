import axios from 'axios'

import {browserHistory} from 'react-router';
import { FETCH_HOMES,  FETCH_USER_HOMES,FETCH_LATEST_HOMES, SET_CURRENT_HOME } from '../constants'

export const fetchHomes = homes => ({
  type: FETCH_HOMES,
  homes
})

export const fetchUserHomes = userHomes => ({
  type: FETCH_USER_HOMES,
  userHomes
})

export const fetchLatestHomes = latestHomes => ({
  type: FETCH_LATEST_HOMES,
  latestHomes
})

export const setCurrentHome = home => ({
  type: SET_CURRENT_HOME,
  home
})

export const getUserHomes = userId => {
  return dispatch => {
    axios.get(`/api/users/${userId}/homes/userHomes`)
    .then(res => {
      console.log('user homes', res.data)
      console.log('typeof user homes', typeof res.data)
      console.log('heyooooo!')
      dispatch(fetchUserHomes(res.data))
    })
  }
}

export const addNewHome = home => {
  console.log('home', home)
  return dispatch => {
    axios.post('/api/homes/', home)
      .then(res => res.data)
      .then(home => {
        console.log('dispatch sent');
        dispatch(getHomeById(home.id));
        browserHistory.push(`/homes/${home.id}`)
      })
      .catch(err => console.error(err))
  }
}

export const getHomeById = homeId => {
  return dispatch => {
    axios.get(`/api/homes/${homeId}`)
      .then(res => {
        dispatch(setCurrentHome(res.data))
      })
  }
}
