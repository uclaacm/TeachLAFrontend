export const SCREEN_RESIZE = 'SCREEN_RESIZE';
export function screenResize(width, height) {
  return { type: SCREEN_RESIZE, width, height };
}

export const TOGGLE_PANEL = 'TOGGLE_PANEL';
export function togglePanel() {
  return { type: TOGGLE_PANEL };
}

export const SET_PANEL = 'SET_PANEL';
export function setPanel(value) {
  return { type: SET_PANEL, value };
}

export const SET_THEME = 'SET_THEME';
export function setTheme(theme) {
  return { type: SET_THEME, theme };
}

export const SET_CLASSES_LOADED = 'SET_CLASSES_LOADED';
export function setClassesLoaded(loaded) {
  return { type: SET_CLASSES_LOADED, value: loaded };
}

export const SET_ON_INSTR_VIEW = 'SET_ON_INSTR_VIEW';
export function setOnInstrView(value) {
  return { type: SET_ON_INSTR_VIEW, value };
}
