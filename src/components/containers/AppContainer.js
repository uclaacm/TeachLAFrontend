/*
	used to link state to App which contains the router, could link functions, but rather do that in each individual container
*/
import {useReducer} from 'react';
import App from "../app.js";
import Context from "../../util/Context";
import * as programsReducer from "../../reducers/programsReducer";
import * as userDataReducer from "../../reducers/userDataReducer";
import * as outputReducer from "../../reducers/outputReducer";
import * as uiReducer from "../../reducers/uiReducer";
import { loadUserData, clearUserData, loadFailure } from "../../actions/userDataActions.js";
import { loadPrograms, clearPrograms } from "../../actions/programsActions";
import { screenResize } from "../../actions/uiActions";
import * as fetch from "../../lib/fetch.js";

const Root = () => {
  const [programsState, programsDispatch] = useReducer(programsReducer.programsReducer, programsReducer.initialState);
  const [userDataState, userDataDispatch] = useReducer(userDataReducer.userDataReducer, userDataReducer.initialState);
  const [outputState, outputDispatch] = useReducer(outputReducer.outputReducer, outputReducer.initialState);
  const [uiState, uiDispatch] = useReducer(uiReducer.uiReducer, uiReducer.initialState);

  const loadUserDataDispatch = async (uid, onFailure) => {
    const { ok, data /*error*/ } = await fetch.getUserData(uid, true);
    //if the request went fine, and there's a non empty userData
    if (ok && data && data.userData && Object.keys(data.userData).length) {
      if (data.programs) {
        programsDispatch(loadPrograms(data.programs));
      }
      userDataDispatch(loadUserData(uid, data.userData));
    } else {
      onFailure("SERVER ERROR: Unable to get user data from server");
    }
  };

  const clearUserDataDispatch = () => {
    userDataDispatch(clearUserData());
    programsDispatch(clearPrograms());
  };

  const loadFailureDispatch = err => userDataDispatch(loadFailure(err));

  const screenResizeDispatch = (width, height) => dispatch(screenResize(width, height));

  return <Context.Provider
    value={{
      programs: programsState,
      output: outputState,
      userData: userDataState,
      ui: uiState,
      programsDispatch,
      userDataDispatch,
      outputDispatch,
      uiDispatch,
    }}
  >
    <App
      uid={userDataState.uid}
      errorMsg={userDataState.error}
      screenWidth={uiState.screenWidth}
      screenHeight={uiState.screenHeight}
      loadUserData={loadUserDataDispatch}
      clearUserData={clearUserDataDispatch}
      loadFailure={loadFailureDispatch}
      screenResize={screenResizeDispatch}
    />
  </Context.Provider>
}

export default Root;
