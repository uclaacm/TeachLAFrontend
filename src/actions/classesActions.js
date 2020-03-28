export const CREATE_CLASS = "CREATE_CLASS";
export function createClass(classKey, data) {
  return { type: CREATE_CLASS, classKey, data };
}

export const DELETE_CLASS = "DELETE_CLASS";
export function deleteClass(classKey) {
  return { type: DELETE_CLASS, classKey };
}
