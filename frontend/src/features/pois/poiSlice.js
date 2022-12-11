import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import poiService from './poiService'

const initialState = {
    pois: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get pois
export const getPois = createAsyncThunk('pois/getAll', async (_, thunkAPI) => {
    try {
        return await poiService.getPois()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const poiSlice = createSlice({
    name: 'pois',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPois.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPois.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.pois = action.payload
            })
            .addCase(getPois.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = poiSlice.actions
export default poiSlice.reducer