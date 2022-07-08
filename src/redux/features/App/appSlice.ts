import {createSlice} from "@reduxjs/toolkit";
import React from "react";

export interface AppSliceState {
  numPages: number,
  hasSubmitted: boolean
}

const context = React.createContext(null);

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    numPages: 3,
    hasSubmitted: false,
  },
  reducers: {
    hasSubmitted: (state, action)=>{
      return {
        ...state,
        hasSubmitted: action.payload
      }
    },
  },
  extraReducers: {},
});

export const {hasSubmitted} = appSlice.actions;

export default appSlice.reducer;