import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Subscription } from '@/lib/types'

interface UserState {
    isAuth: boolean,
    subscriptions: Subscription[]
}

const initialState: UserState = {
    isAuth: false,
    subscriptions: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        isAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        setSubscription: (state, action: PayloadAction<Subscription[]>) => {
            state.subscriptions = action.payload
        }
    },
})

export const { isAuthenticated, setSubscription } = userSlice.actions;

export default userSlice.reducer