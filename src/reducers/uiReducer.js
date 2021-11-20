import {
  SCREEN_RESIZE,
  TOGGLE_PANEL,
  SET_PANEL,
  SET_THEME,
  SET_CLASSES_LOADED,
  SET_ON_INSTR_VIEW,
} from '../actions/uiActions';

const initialState = {
  screenWidth: typeof window === 'object' ? window.innerWidth : null,
  screenHeight: typeof window === 'object' ? window.innerHeight : null,
  panelOpen: false,
  theme: 'dark',
  classesLoaded: false,
  onInstrView: false,
};

function uiReducer(state = initialState, action) {
  switch (action.type) {
  case SCREEN_RESIZE:
    return { ...state, screenWidth: action.width, screenHeight: action.height };
  case TOGGLE_PANEL:
    return { ...state, panelOpen: !state.panelOpen };
  case SET_PANEL:
    return { ...state, panelOpen: action.value };
  case SET_THEME:
    return { ...state, theme: action.theme };
  case SET_CLASSES_LOADED:
    return { ...state, classesLoaded: action.value };
  case SET_ON_INSTR_VIEW:
    return { ...state, onInstrView: action.value };
  default:
    return state;
  }
}

export default uiReducer;
