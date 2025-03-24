/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface UserState {
    isAuth: boolean
}

// Define the initial state using that type
const initialState: UserState = {
    isAuth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        isAuthenticated: (state) => {
            state.isAuth = true
        }
    },
})

export const { isAuthenticated } = userSlice.actions;

export default userSlice.reducer