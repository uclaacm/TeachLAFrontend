import {CLEAR_OUTPUT, SET_OUTPUT} from '../actions/outputActions'

function outputReducers(state = {
  runResult: null
}, action){
  switch(action.type){
    case CLEAR_OUTPUT:
      return Object.assign({}, state, {runResult: null})
    case SET_OUTPUT:
      return Object.assign({}, state, {runResult: action.runResult})
    default:
      return state
  }
}

export default outputReducers
