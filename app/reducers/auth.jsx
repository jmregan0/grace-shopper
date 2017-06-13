import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

// export const login = (username, password) =>
//   dispatch =>
//     axios.post('/api/auth/login/local',
//       {username, password})
//       .then(() => dispatch(whoami()))
//       .catch(() => dispatch(whoami()))

// export const logout = () =>
//   dispatch =>
//     axios.post('/api/auth/logout')
//       .then(() => dispatch(whoami()))
//       .catch(() => dispatch(whoami()))


export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
    .then(()=>{
      // console.log(user.config)
        //on login sync session cart with user cart
      axios.get('/api/auth/whoami')
      .then(user=>{
        console.log(user.data.id)
        axios.post(`/api/cart/sync/${user.data.id}`)      
      })

    })
    .then(() => dispatch(whoami()))
    .catch(() => dispatch(whoami()))


export const logout = () =>
  dispatch =>{
    console.log("$*&#^$@# hitting logout route")

    axios.delete('/api/cart/sessioncart')
    .then(()=>{
      axios.post('/api/auth/logout')
        
        .then(() => dispatch(whoami()))
        .catch(() => dispatch(whoami()))
      
    })
  }




export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))

export default reducer
