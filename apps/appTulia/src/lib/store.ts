import { configureStore } from '@reduxjs/toolkit'
import ExampleReducer from './features/example/exampleSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            // Add reducers here
            example: ExampleReducer,
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']