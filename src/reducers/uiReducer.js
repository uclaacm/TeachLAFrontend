/* https://www.reddit.com/r/reactjs/comments/y4x2ou/what_is_the_point_of_using_rtks_createslice/ishe74o/ */

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  screenWidth: typeof window === 'object' ? window.innerWidth : null,
  screenHeight: typeof window === 'object' ? window.innerHeight : null,
  panelOpen: false,
  theme: 'dark',
  classesLoaded: false,
  onInstrView: false,
};

const uiReducer = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    screenResize(state, action) {
      state.screenWidth = action.payload.width;
      state.screenWidth = action.payload.height;
    },
    togglePanel(state) {
      state.panelOpen = !state.panelOpen;
    },
    setPanel(state, action) {
      state.panelOpen = action.payload;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },

    /* the following don't belong; legacy */
    setClassesLoaded(state, action) {
      state.classesLoaded = action.payload;
    },
    setOnInstrView(state, action) {
      state.onInstrView = action.payload;
    }
  }
})

export const { screenResize, togglePanel, setPanel, setTheme, setClassesLoaded, setOnInstrView } = uiReducer.actions
export default uiReducer.reducer
