export const ADD_CLASS = "ADD_CLASS";
export function addClass(classKey, data) {
  return { type: ADD_CLASS, classKey, data };
}

export const REMOVE_CLASS = "REMOVE_CLASS";
export function removeClass(classKey) {
  return { type: REMOVE_CLASS, classKey };
}
