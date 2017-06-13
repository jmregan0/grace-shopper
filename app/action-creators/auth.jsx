import axios from 'axios'


const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(()=>{
        //on login sync session cart with user cart
        axios.get('/api/auth/whoami')
        .then(user=>{
          axios.post(`/api/cart/sync/${user.id}`)      
        })

      })
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.delete('/api/cart/sessioncart')
    .then(()=>{
      axios.post('/api/auth/logout')
        .then(()=>{
        
        })
        .then(() => dispatch(whoami()))
        .catch(() => dispatch(whoami()))
      
    })

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))