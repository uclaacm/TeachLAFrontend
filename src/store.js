import { configureStore } from '@reduxjs/toolkit'
import classesReducer from './reducers/classesReducer';
import outputReducer from './reducers/outputReducer';
import programsReducer from './reducers/programsReducer';
import uiReducer from './reducers/uiReducer';
import userDataReducer from './reducers/userDataReducer';

const store = configureStore({
  reducer: {
    userData: userDataReducer,
    output: outputReducer,
    programs: programsReducer,
    classes: classesReducer,
    ui: uiReducer,
  }
});

export default store;
