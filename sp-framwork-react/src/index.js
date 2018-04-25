import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './stateconfig/reducer'
import axios from 'axios'
import { logout } from './utils/xhr'
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          logout()
          break
        default:
          break
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  })

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
