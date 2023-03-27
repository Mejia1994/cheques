import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {message} from "antd";

export const fetchList = createAsyncThunk("list/fetch", async function (argm, thunkAPI) {

    let response = await fetch(`/api.insumos/cheques/Seguimientos?banco=${argm}`);

    if (!response.ok || response.redirected) {
        throw "Error en respuesta por parte del servidor."
    }

    let {data} = await response.json();
    thunkAPI.dispatch(setSeguimientos(data))
});

export const listSlice = createSlice({
    name: 'listSlice',
    initialState: {"dataSource": [], isModalOpen: false},
    reducers: {
        setIsModalOpen: function (state, action) {
            state.isModalOpen = action.payload
        },

        setSeguimientos: function (state, action) {
            state.dataSource = action.payload;
        },
        addItems: function (state, action) {
            state.dataSource = [...state.dataSource, ...action.payload].map((elm) => {
                elm.key = elm.id_seguimiento_cheque;
                return elm;
            });
        },

        updateItems: function (state, {payload}) {

            state.dataSource = state.dataSource.map(function (elm) {
                if (elm.id_seguimiento_cheque === payload.id_seguimiento_cheque) {
                    elm.id_estado = payload.id_estado;
                    elm.estado = payload.estado;
                    elm.observacion = payload.observacion;
                }

                return elm;
            });
        }
    },
    extraReducers: function (builder) {
        builder.addCase(fetchList.rejected, function (state, action) {
            const error = action?.error?.message || "Ha ocurrido un errror desconocido"
            message.error(error)
        });
    }
});

export const {addItems, updateItems, setIsModalOpen, setSeguimientos} = listSlice.actions
export default listSlice.reducer