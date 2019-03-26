import { SCREEN_RESIZE } from "../actions/uiActions";

const initialState = {
  screenWidth: typeof window === "object" ? window.innerWidth : null,
  screenHeight: typeof window === "object" ? window.innerHeight : null,
};

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SCREEN_RESIZE:
      return Object.assign({}, state, { screenWidth: action.width, screenHeight: action.height });
    default:
      return state;
  }
}

export default uiReducer;
