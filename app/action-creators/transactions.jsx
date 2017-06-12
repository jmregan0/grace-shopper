import axios from 'axios'
import { FETCH_PAST_GUEST_TRANSACTIONS, FETCH_FUTURE_GUEST_TRANSACTIONS, FETCH_HOST_TRANSACTIONS, DISPLAY_UPCOMING, DISPLAY_PAST, DISPLAY_HOST_HISTORY } from '../constants'

export const showUpcoming = () => {
  return {
    type: DISPLAY_UPCOMING
  }
}

export const showPast = () => {
  return {
    type: DISPLAY_PAST
  }
}

export const showHostHistory = () => {
  return {
    type: DISPLAY_HOST_HISTORY
  }
}

export const fetchPastGuestTransactions = pastGuestTransactions => ({
  type: FETCH_PAST_GUEST_TRANSACTIONS,
  pastGuestTransactions
})

export const fetchFutureGuestTransactions = futureGuestTransactions => ({
  type: FETCH_FUTURE_GUEST_TRANSACTIONS,
  futureGuestTransactions
})

export const getPastGuestTransactionsByUser = userId => {
  return dispatch => {
    axios.get(`/api/users/${userId}/transactions/guestpast`)
    .then(res => {
      console.log("res.data in PastGuests actioncreator", res.data)
      dispatch(fetchPastGuestTransactions(res.data))
    })
  }
}

export const getFutureGuestTransactionsByUser = userId => {
  return dispatch => {
    axios.get(`/api/users/${userId}/transactions/guestfuture`)
    .then(res => {
      console.log("res.data in FutureGuests actioncreator", res.data)
      dispatch(fetchFutureGuestTransactions(res.data))
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
