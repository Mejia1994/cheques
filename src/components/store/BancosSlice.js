import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const fetchBancos = createAsyncThunk("list/fetch", async function (argm, thunkAPI) {
    let response = await fetch("/api.insumos/cheques/Bancos");

    if (!response.ok || response.redirected) {
        throw "Error en respuesta de parte del servidor."
    }

    let {data} = await response.json();
    thunkAPI.dispatch(setBancos(data))
});

export const BancosSlice = createSlice({
    name: 'BancosSlice',
    initialState: {"bancos": [], banco: null},
    reducers: {
        setBancos: function (state, action) {
            state.bancos = action.payload;
        },

        setBanco: function (state, action) {
            state.banco = action.payload;
        }
    }
});

export const {setBancos, setBanco} = BancosSlice.actions
export default BancosSlice.reducer