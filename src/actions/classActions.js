export const LOAD_CLASS = "LOAD_CLASS";
export function loadClass(myClass) {
  return { type: LOAD_CLASS, myClass };
}

export const CLEAR_CLASS = "CLEAR_CLASS";
export function clearClass() {
  return { type: CLEAR_CLASS };
}
