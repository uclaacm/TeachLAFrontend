export const CLEAR_OUTPUT = 'CLEAR_OUTPUT'
export function clearOutput(){
  return {type: CLEAR_OUTPUT}
}

export const SET_RUN_RESULT = 'SET_RUN_RESULT'
export function setRunResult(result){
  return {type: SET_RUN_RESULT, runResult: result}
}

export const SET_OUTPUT_LANGAUGE = 'SET_RUN_RESULT'
export function setOutputLanguage(language){
  return {type: SET_OUTPUT_LANGAUGE, language}
}

export const SET_OUTPUT = 'SET_OUTPUT'
export function setOutput({output}){
  //if output is not an object
  if(!output){
    return {}
  }
  return {type:SET_OUTPUT, runResult:output.code, language: output.language}
}