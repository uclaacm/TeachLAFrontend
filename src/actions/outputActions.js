export const CLEAR_OUTPUT = 'CLEAR_OUTPUT';
export function clearOutput() {
  return { type: CLEAR_OUTPUT };
}

export const SET_RUN_RESULT = 'SET_RUN_RESULT';
export function setRunResult(value) {
  return { type: SET_RUN_RESULT, value };
}

export const SET_OUTPUT_LANGUAGE = 'SET_OUTPUT_LANGAUGE';
export function setOutputLanguage(value) {
  return { type: SET_OUTPUT_LANGUAGE, value };
}

export const SET_OUTPUT = 'SET_OUTPUT';
export function setOutput({ output }) {
  //if output is not an object
  if (!output) {
    return { type: 'IGNORE' };
  }
  return { type: SET_OUTPUT, runResult: output.code, language: output.language };
}
