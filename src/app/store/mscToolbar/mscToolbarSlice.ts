import { createSlice } from '@reduxjs/toolkit'; 
import {ViewMode} from '../../../@mscComponnent/CRUDPage/MSCToolbar'

const initialState = {
    viewMode : ViewMode.Read,
    viewModeChanceFunc : () =>{console.log('Buraya fonksiyon gönderiliyor')}
};

const mscToolbarSlice = createSlice({
    name: 'mscToolbar',
    initialState,
    reducers:{
        addViewModeChanceFunc : (state, action) =>{
            state.viewModeChanceFunc = action.payload;
        }, 
        changeViewMode : (state, action) =>{
            state.viewMode = action.payload;
        }
    }
})

export const {addViewModeChanceFunc , changeViewMode} = mscToolbarSlice.actions;

// export const getViewModeFunc = (state:any) => state.mscToolbar.mscToolbar.viewModeChanceFunc;
export const getViewModeFunc = (state:any) => state.mscToolbar.mscToolbar.viewModeChanceFunc;
export const getViewMode = (state:any) => state.mscToolbar.mscToolbar.viewMode;

export default mscToolbarSlice.reducer;