import {configureStore} from '@reduxjs/toolkit'
import listReducer from "./listSlice"
import BancosReducer from "./BancosSlice.js";

export const store = configureStore({
    reducer: {
        list: listReducer,
        Bancos: BancosReducer
    },
})