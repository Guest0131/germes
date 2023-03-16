import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    data: {},
    allLinks: {},
    isLoading: false,
    status: null,
}

const formatLinks = (data) => {

    var allLinks = [].concat(...Object.keys(data).map((k) => [...Object.values(data[k])]))
    
    var res = {}
    allLinks.map((x) => {
        res[x] = {
            status : false
        }
    })

    return res
}

// Get LINKS
export const getLinks = createAsyncThunk(
    '/api/parsers/google',
    async (stringQuery, {rejectWithValue, dispatch}) => {
        
        try {
            const { data }  = await axios.post('/api/parsers/google', {
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

// Parser Habr
export const parserHabr = createAsyncThunk(
    '/api/parsers/habr',
    async (url, {rejectWithValue, dispatch}) => {
        try {
            const  { data }  = await axios.post('/api/parsers/habr', {
                url : url
            }, {
                timeout: 0
            })
            data['pre_url'] = url

            return data
        } catch (error) {
            console.log(error)
        }
    },
)

// Parser Habr
export const parserYoutube = createAsyncThunk(
    '/api/parsers/youtube',
    async (url, {rejectWithValue, dispatch}) => {
        try {
            const  { data }  = await axios.post('/api/parsers/youtube', {
                url : url
            }, {
                timeout: 0
            })
            data['pre_url'] = url

            return data
        } catch (error) {
            console.log(error)
        }
    },
)
// Parser Habr
export const parserCyberleninka = createAsyncThunk(
    '/api/parsers/cyberleninka',
    async (url, {rejectWithValue, dispatch}) => {
        try {
            const  { data }  = await axios.post('/api/parsers/cyberleninka', {
                url : url
            }, {
                timeout: 0
            })
            data['pre_url'] = url
            return data
        } catch (error) {
            console.log(error)
        }
    },
)


export const linksSlice = createSlice({
    name: 'links',
    initialState,
    reducers: {},
    extraReducers: {

        
        // /api/parsers/google
        [getLinks.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getLinks.fulfilled]: (state, action) => {
            state.data = action.payload
            state.allLinks = formatLinks(action.payload)
            state.isLoading = false
            
        },
        [getLinks.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        // /api/parsers/habr
        [parserHabr.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [parserHabr.fulfilled]: (state, action) => {
            var data = action.payload
            if ('title_href' in data) {
                state.allLinks[data['title_href']]['info'] = data
                state.allLinks[data['title_href']]['status'] = true
            } else {
                delete state.allLinks[data['pre_url']]
                state.data['habr'] = state.data['habr'].filter(
                    (x) => x !== data['pre_url']
                )
            }
            
            state.isLoading = false

        },
        [parserHabr.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        // /api/parsers/habr
        [parserYoutube.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [parserYoutube.fulfilled]: (state, action) => {
            var data = action.payload
            if ('url' in data) {
                state.allLinks[data['url']]['info'] = data
                state.allLinks[data['url']]['status'] = true
            } else {
                delete state.allLinks[data['pre_url']]
                state.data['youtube'] = state.data['youtube'].filter(
                    (x) => x !== data['pre_url']
                )
            }
            
            state.isLoading = false

        },
        [parserYoutube.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        // /api/parsers/habr
        [parserCyberleninka.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [parserCyberleninka.fulfilled]: (state, action) => {
            var data = action.payload

            if ('title_href' in data) {
                state.allLinks[data['title_href']]['info'] = data
                state.allLinks[data['title_href']]['status'] = true
            } else {
                delete state.allLinks[data['pre_url']]
                state.data['cyberleninka'] = state.data['cyberleninka'].filter(
                    (x) => x !== data['pre_url']
                )
            }
            state.isLoading = false

        },
        [parserCyberleninka.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
    }
    })

export default linksSlice.reducer