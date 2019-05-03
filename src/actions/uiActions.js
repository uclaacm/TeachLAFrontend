export const SCREEN_RESIZE = "SCREEN_RESIZE";
export function screenResize(width, height) {
  return { type: SCREEN_RESIZE, width, height };
}

export const TOGGLE_PANEL = "TOGGLE_PANEL";
export function togglePanel() {
  return { type: TOGGLE_PANEL };
}

export const SET_PANEL = "SET_PANEL";
export function setPanel(value) {
  return { type: SET_PANEL, value };
}
