import axios from 'axios'
import { FETCH_HOMES, SET_CURRENT_HOME } from '../constants'
import {browserHistory} from 'react-router';

export const fetchHomes = homes => ({
  type: FETCH_HOMES,
  homes
})

export const setCurrentHome = home => ({
  type: SET_CURRENT_HOME,
  home
})

export const addNewHome = home => {
  console.log('home', home)
  return dispatch => {
    axios.post('/api/homes/', home)
      .then(res => {
        console.log('res.data', res.data);
        return res.data
      })
      .then(home => {
        console.log('dispatch sent');
        dispatch(setCurrentHome(home));
        browserHistory.push(`/homes/${home.id}`)
      })
      .catch(console.error.bind(console))
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
