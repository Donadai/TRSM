import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import postService from './postService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Get recent posts
export const getRecentPosts = createAsyncThunk('posts/getRecentByPoi', async (poiid,thunkAPI) => {
    try {
        return await postService.getRecentPosts(poiid)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRecentPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRecentPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getRecentPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const {reset} = postSlice.actions
export default postSlice.reducer