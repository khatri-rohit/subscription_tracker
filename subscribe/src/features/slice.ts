import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Subscription, User } from '@/lib/types'

interface UserState {
    isAuth: boolean,
    subscriptions: Subscription[]
    user: User | null
}

const initialState: UserState = {
    isAuth: false,
    subscriptions: [],
    user: null
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
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        }
    },
})

export const { isAuthenticated, setSubscription, setUser } = userSlice.actions;

export default userSlice.reducer