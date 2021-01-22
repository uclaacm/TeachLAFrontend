export const LOAD_CLASS = "LOAD_CLASS";
export function loadClass(data) {
  return { type: LOAD_CLASS, data };
}

export const ADD_PROGRAM = "ADD_PROGRAM";
export function addProgram(program, data) {
  return { type: ADD_PROGRAM, program, data };
}

export const DELETE_PROGRAM = "DELETE_PROGRAM";
export function deleteProgram(program) {
  return { type: DELETE_PROGRAM, program };
}

export const LOAD_PROGRAMS = "LOAD_PROGRAMS";
export function loadPrograms(programs) {
  return { type: LOAD_PROGRAMS, programs };
}
