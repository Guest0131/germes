import { configureStore } from '@reduxjs/toolkit'
import restSlice from './features/rest/restSlice'
import linksSlice from './features/rest/linksSlice'


export const store = configureStore({
    reducer: {
        rest: restSlice,
        links: linksSlice
    },
})