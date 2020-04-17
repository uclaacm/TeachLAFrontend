export const ADD_CLASS = "ADD_CLASS";
export function addClass(cid, data) {
  return { type: ADD_CLASS, cid, data };
}

export const REMOVE_CLASS = "REMOVE_CLASS";
export function removeClass(cid) {
  return { type: REMOVE_CLASS, cid };
}

export const LOAD_CLASSES = "LOAD_CLASSES";
export function loadClasses(classes) {
  return { type: LOAD_CLASSES, classes };
}

export const CLEAR_CLASSES = "CLEAR_CLASSES";
export function clearClasses() {
  return { type: CLEAR_CLASSES };
}
