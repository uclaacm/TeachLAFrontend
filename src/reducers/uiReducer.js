import { SCREEN_RESIZE, TOGGLE_PANEL, SET_PANEL } from "../actions/uiActions";

const initialState = {
  screenWidth: typeof window === "object" ? window.innerWidth : null,
  screenHeight: typeof window === "object" ? window.innerHeight : null,
  panelOpen: false,
};

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SCREEN_RESIZE:
      return Object.assign({}, state, { screenWidth: action.width, screenHeight: action.height });
    case TOGGLE_PANEL:
      return Object.assign({}, state, { panelOpen: !state.panelOpen });
    case SET_PANEL:
      return Object.assign({}, state, { panelOpen: action.value });
    default:
      return state;
  }
}

export default uiReducer;
