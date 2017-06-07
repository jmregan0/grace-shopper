import axios from 'axios'
import { FETCH_USERS, SET_CURRENT_USER } from '../constants'

export const fetchUsers = users => ({
  type: FETCH_USERS,
  users
})

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
})

export const getUserById = userId => {
  return dispatch => {
    axios.get(`/api/users/${userId}`)
    .then(res => {
      dispatch(setCurrentUser(res.data))
    })
  }
}
