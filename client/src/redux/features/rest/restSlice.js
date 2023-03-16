import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    data: [],
    isLoading: false,
    status: null,
}

// Get LINKS
export const parserHabr = createAsyncThunk(
    '/api/parsers/google',
    async ({ url }) => {
        try {
            const { data } = await axios.post('/api/parsers/habr', {
                url : url
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

        // /api/parsers/google
        [parserHabr.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [parserHabr.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload.message
        },
        [parserHabr.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        }

    },
    })


export default restSlice.reducer