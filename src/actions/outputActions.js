export const CLEAR_OUTPUT = 'CLEAR_OUTPUT'
export function clearOutput(){
  return {type: CLEAR_OUTPUT}
}

export const SET_RUN_RESULT = 'SET_RUN_RESULT'
export function setRunResult(result){
  return {type: SET_RUN_RESULT, runResult: result}
}
