import axios from 'axios'
import { FETCH_GUEST_TRANSACTIONS, FETCH_HOST_TRANSACTIONS } from '../constants'

export const fetchGuestTransactions = guestTransactions => ({
  type: FETCH_GUEST_TRANSACTIONS,
  guestTransactions
})

export const getGuestTransactionsByUser = userId => {
  return dispatch => {
    axios.get(`/api/users/${userId}/transactions/guest`)
    .then(res => {
      dispatch(fetchGuestTransactions(res.data))
    })
  }
}

export const fetchHostTransactions = hostTransactions => ({
  type: FETCH_HOST_TRANSACTIONS,
  hostTransactions
})

export const getHostTransactionsByUser = userId => {
  return dispatch => {
    axios.get(`/api/users/${userId}/transactions/host`)
    .then(res => {
      dispatch(fetchHostTransactions(res.data))
    })
  }
}