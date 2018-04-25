import store from '../stateconfig/reducer'
import axios from 'axios'

// These are "fake network" function that in a real scenario would
// call the backend API and upon return would update your redux state.
// We're just going to skip to the redux part and add a setTimeout
// for some fake latency

export const getLoggedUser = () => {
  setTimeout(() => {
    store.dispatch({
      type: 'GET_LOGGED_USER'
    })
  }, 500)
}

export const login = (value) => {
  return new Promise((resolve, reject) => {
    axios.get('/login').then(d => {
      d = d.data
      if (d.state !== false) {
        store.dispatch({
          type: 'SET_LOGGED_USER',
          logged: true
        })
      }
      resolve(d)
    })
  })
}

export const logout = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.dispatch({
        type: 'SET_LOGGED_USER',
        logged: false
      })
      resolve()
    }, 500)
  })
}
