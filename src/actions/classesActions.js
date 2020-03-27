export const ADD_CLASS = "ADD_CLASS";
export function addClass(classKey, data) {
  return { type: ADD_CLASS, classKey, data };
}
