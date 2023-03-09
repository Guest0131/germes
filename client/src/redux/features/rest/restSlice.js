import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { restInstance } from '../../../utils/axios'

const initialState = {
    data: [],
    isLoading: false,
    status: null,
}

// Reducer example
export const getLinks = createAsyncThunk(
    '/api/v1.0/google/get_links',
    async ({ stringQuery }) => {
        try {
            const { data } = await restInstance.post('/api/v1.0/google/get_links', {
                query : stringQuery
            }, {
                timeout: 0
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
)



export const restSlice = createSlice({
    name: 'rest',
    initialState,
    reducers: {},
    extraReducers: {

        },
        // /todo/api/v1.0/tasks/
        [getLinks.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getLinks.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload.message
 
        },
        [getLinks.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false

        }
    })


export default restSlice.reducer