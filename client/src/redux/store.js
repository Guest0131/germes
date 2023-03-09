import { configureStore } from '@reduxjs/toolkit'
import restSlice from './features/rest/restSlice'

export const store = configureStore({
    reducer: {
        rest: restSlice
    },
})