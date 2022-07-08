import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppState} from "../../store";
import {useDispatch, useStore} from "react-redux";

export type UserProgressSliceState = {
  totalPages: number,
  activePage: number,
  pages: {num: number, valid: boolean, active: boolean}[],
  data: {}
}

let initialState = {
  activePage: 1,
  numPages: 3,
  pages: [
    {num: 1, valid: false, active: true},
    {num: 2, valid: false, active: false},
    {num: 3, valid: false, active: false}
  ],
  data: {}
};

export const userProgressSlice = createSlice({
  name: 'user-progress',
  initialState: initialState,
  reducers: {
    clearData: (state)=>{
      return initialState;
    },
    removeDataByKey: (state, action) => {
      let newState = {...state};

      Object.keys(newState.data).map((key:any)=>{
        if(key == action.payload)
        {
          // @ts-ignore
          delete newState.data[key];
        }
      })

      return {...newState};
    },
    saveData: (state, action)=>{
      let newState = {
        ...state,
        data: {
          ...state.data,
          [action.payload.key]: action.payload.value
        }
      };

      try{
        const serializedState = JSON.stringify(newState);
        localStorage.setItem('userProgress', serializedState);
      } catch {
        return state;
      }

      return newState;
    },
    setPageInvalid: (state, action) => {
      return {
        ...state,
        pages: state.pages.map(page => {
          return {...page, valid: page.num === action.payload ? false : page.valid}
        })
      };
    },
    setPageValid: (state, action) => {
      return {
        ...state,
        pages: state.pages.map(page => {
          return {...page, valid: page.num === action.payload ? true : page.valid}
        })
      };
    },
    nextPage: (state) =>{
      let currentPage = state.pages.find((page)=> page.num === state.activePage);

      if(!currentPage || currentPage.num + 1 > state.numPages)
      {
        return state;
      }

      return {
        ...state,
        activePage: currentPage.num + 1,
        pages: state.pages.map(page => {
          // @ts-ignore
          return {...page, active: page.num === currentPage.num + 1}
        })
      };
    },
    prevPage: (state) => {
      let currentPage = state.pages.find((page)=> page.num === state.activePage);

      if(!currentPage || currentPage.num - 1 < 1)
      {
        return state;
      }

      return {
        ...state,
        activePage: currentPage.num - 1,
        pages: state.pages.map(page => {
          // @ts-ignore
          return {...page, active: page.num === currentPage.num - 1}
        })
      };
    },
    setPageActive: (state, action) => {
      let currentPage = <UserProgressSliceState['pages'][0]>state.pages.find((page)=> page.num === state.activePage);

      if(!currentPage.valid)
      {
        return state;
      }

      return {
        ...state,
        activePage: action.payload,
        pages: state.pages.map((page, index) => { return {...page, active: action.payload === page.num} })
      }
    }
  },
});

export const {setPageActive, nextPage, prevPage, setPageValid, setPageInvalid, saveData, clearData, removeDataByKey} = userProgressSlice.actions;

export default userProgressSlice.reducer;