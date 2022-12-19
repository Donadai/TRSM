import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import commentService from './commentService'

const initialState = {
    comments: [],
    commentsError: false,
    commentsSuccess: false,
    commentsLoading: false,
    commentsMessage: '',
}

export const getPostComments = createAsyncThunk('comments/getPostComments', async (post ,thunkAPI) => {
    try {
        return await commentService.getPostComments(post)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const postComment = createAsyncThunk('comments/post', async(commentData, thunkAPI) => {
    try {
        const user = thunkAPI.getState().auth.user
        return await commentService.postComment(user, commentData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)   
    }
})

export const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostComments.pending, (state) => {
                state.commentsLoading = true
            })
            .addCase(getPostComments.fulfilled, (state, action) => {
                state.commentsLoading = false
                state.commentsSuccess = true
                state.comments = action.payload
            })
            .addCase(getPostComments.rejected, (state, action) => {
                state.commentsLoading = false
                state.commentsError = true
                state.commentsMessage = action.payload
            })
            .addCase(postComment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(postComment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.comments.push(action.payload)
            })
            .addCase(postComment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const {reset} = commentSlice.actions
export default commentSlice.reducer