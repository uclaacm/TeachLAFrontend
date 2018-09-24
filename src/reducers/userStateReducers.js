import { REQUEST_LOGIN, LOGIN_FAILED, LOGIN_COMPLETED } from "../actions/userStateActions";

const initialState = {
  waiting: false,
  message: "",
};

function userStateReducers(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      state.waiting = true;
      return state;
    case LOGIN_COMPLETED:
      state.waiting = false;
      return state;
    case LOGIN_FAILED:
      state.waiting = false;
      state.message = action.message;
      return state;
    default:
      return state;
  }
}

export default userStateReducers;
