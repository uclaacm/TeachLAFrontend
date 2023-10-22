import { createSlice } from "@reduxjs/toolkit";

/* use an object since Maps aren't serializable, per redux's requirements */
const initialState = {};

const programsSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    setPrograms(state, action) {
      return action.payload
    },
    setContent(state, action) {
      const { program, code } = action.payload;
      state[program].code = code;
    },
    setLanguage(state, action) {
      const { program, language } = action.payload;
      state[program].language = language;
    },
    setDirty(state, action) {
      const { program, dirty } = action.payload;
      state[program].dirty = dirty;
    },
    setName(state, action) {
      const { program, name } = action.payload;
      state[program].name = name;
    },
    setThumnail(state, action) {
      const { program, thumnail } = action.payload;
      state[program].thumnail = thumnail;
    },
    add(state, action) {
      const { program, data } = action.payload;
      state[program] = data;
    },
    del(state, action) {
      delete state[action.payload];
    },
    clear(state) {
      return {}
    }
  }
});

/* To someone looking at this in the future:
 *
 * maybe rewrite with type-safe builder:
 * https://redux-toolkit.js.org/usage/usage-with-typescript#building-type-safe-reducer-argument-objects
 *
 * especially once we move to typescript
 */

export const {
  setPrograms,
  setContent: setProgramCode,
  setLanguage: setProgramLanguage,
  setDirty: setProgramDirty,
  setName: setProgramName,
  setThumnail: setProgramThumbnail,
  add: addProgram,
  del: deleteProgram,
  clear: clearPrograms
} = programsSlice.actions;

export default programsSlice.reducer;
