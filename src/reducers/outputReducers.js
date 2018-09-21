import { CLEAR_OUTPUT, SET_RUN_RESULT } from '../actions/outputActions'
import { PYTHON } from '../constants'

const initialState = {
  runResult: "",
  language: PYTHON,
}

function outputReducers(state = initialState, action){
  switch(action.type){
    case CLEAR_OUTPUT:
      return initialState
    case SET_RUN_RESULT:
      return Object.assign({}, state, {runResult: action.value})
    case SET_OUTPUT_LANGUAGE:
      return Object.assign({}, state, {language: action.value})
    default:
      return state
  }
}

export default outputReducers
