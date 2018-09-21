export const SET_PROGRAM_CODE = 'SET_PROGRAM_CODE'
export function setProgramCode(program, code){
  return {type: SET_PROGRAM_CODE, program, code}
}

export const SET_PROGRAM_LANGUAGE = 'SET_PROGRAM_LANGUAGE'
export function setProgramLanguage(program, language){
  return {type: SET_PROGRAM_LANGUAGE, program, language}
}

export const DELETE_PROGRAM = 'DELETE_PROGRAM'
export function setRunResult(result){
  return {type: DELETE_PROGRAM, runResult: result}
}
