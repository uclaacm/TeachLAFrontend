export const DELETE_CLASS = "DELETE_CLASS";
export function deleteClass(value) {
  return { type: DELETE_CLASS, value };
}

export const LOAD_CLASSES = "LOAD_CLASSES";
export function loadPrograms(classes) {
  return { type: LOAD_CLASSES, classes };
}

export const CLEAR_CLASSES = "CLEAR_CLASSES";
export function clearClasses() {
  return { type: CLEAR_CLASSES };
}

export const ADD_CLASS = "ADD_CLASS";
export function addClass(myClass, data) {
  return { type: ADD_CLASS, myClass, data };
}
