export const CLEAR_OUTPUT = 'CLEAR_OUTPUT'
export function clearOutput(){
  return {type: CLEAR_OUTPUT}
}

export const SET_OUTPUT = 'SET_OUTPUT'
export function setOutput(result){
  return {type: SET_OUTPUT, runResult: result}
}
