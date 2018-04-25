import { createStore, combineReducers } from 'redux'
import loggedUserReducer from '../reducer/loggedUserReducer'
import {loadState, saveState} from './localStorage'
import throttle from 'lodash/throttle'

// 合并reducer
var reducers = combineReducers({
  loggedUserState: loggedUserReducer
})

const persistedState = loadState()

const store = createStore(reducers, persistedState)
store.subscribe(throttle(() => {
  saveState(store.getState())
}, 500))
export default store
