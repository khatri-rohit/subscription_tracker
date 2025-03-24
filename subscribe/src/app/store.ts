import { configureStore } from '@reduxjs/toolkit'
import rootReducers from '../features/slice'
import { useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: rootReducers
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()