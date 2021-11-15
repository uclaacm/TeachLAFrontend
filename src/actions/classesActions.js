export const ADD_STUDENT_CLASS = 'ADD_STUDENT_CLASS';
export function addStudentClass(cid, data) {
  return { type: ADD_STUDENT_CLASS, cid, data };
}

export const REMOVE_STUDENT_CLASS = 'REMOVE_STUDENT_CLASS';
export function removeStudentClass(cid) {
  return { type: REMOVE_STUDENT_CLASS, cid };
}

export const LOAD_STUDENT_CLASSES = 'LOAD_STUDENT_CLASSES';
export function loadStudentClasses(classes) {
  return { type: LOAD_STUDENT_CLASSES, classes };
}

export const CLEAR_STUDENT_CLASSES = 'CLEAR_STUDENT_CLASSES';
export function clearStudentClasses() {
  return { type: CLEAR_STUDENT_CLASSES };
}

export const ADD_INSTR_CLASS = 'ADD_INSTR_CLASS';
export function addInstrClass(cid, data) {
  return { type: ADD_INSTR_CLASS, cid, data };
}

export const REMOVE_INSTR_CLASS = 'REMOVE_INSTR_CLASS';
export function removeInstrClass(cid) {
  return { type: REMOVE_INSTR_CLASS, cid };
}

export const LOAD_INSTR_CLASSES = 'LOAD_INSTR_CLASSES';
export function loadInstrClasses(classes) {
  return { type: LOAD_INSTR_CLASSES, classes };
}

export const CLEAR_INSTR_CLASSES = 'CLEAR_INSTR_CLASSES';
export function clearInstrClasses() {
  return { type: CLEAR_INSTR_CLASSES };
}

export const CLEAR_CLASSES = 'CLEAR_CLASSES';
export function clearClasses() {
  return { type: CLEAR_CLASSES };
}
