export const ADD_CLASS = "ADD_CLASS";
export function addClass(classKey, data) {
  return { type: ADD_CLASS, classKey, data };
}

export const REMOVE_CLASS = "REMOVE_CLASS";
export function removeClass(classKey) {
  return { type: REMOVE_CLASS, classKey };
}

export const LOAD_CLASSES = "LOAD_CLASSES";
export function loadClasses(classes) {
  return { type: LOAD_CLASSES, classes };
}

export const CLEAR_CLASSES = "CLEAR_CLASSES";
export function clearClasses() {
  return { type: CLEAR_CLASSES };
}
