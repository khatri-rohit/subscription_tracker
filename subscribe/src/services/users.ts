import { Pass, User, UserInput } from '@/lib/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const aboutUser = createApi({
    reducerPath: "subscriptionAPi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
    endpoints: (builder) => ({
        updateUserInfo: builder.mutation<User, UserInput>({
            query: (data) => {
                const { _id, firstName, lastName } = data
                return {
                    url: `/users/${_id}`,
                    method: 'PUT',
                    body: { firstName, lastName }
                }
            }
        }),
        updatePassowrd: builder.mutation<void, Pass>({
            query: (data) => {
                const { _id, confirmPassword, password } = data
                return {
                    url: `/users/isagi/${_id}`,
                    method: 'PUT',
                    body: { confirmPassword, password }
                }
            }
        }),
        updateEmailNotification: builder.mutation<void, { _id: string, notify: boolean }>({
            query: (data) => {
                const { _id, notify } = data
                return {
                    url: `/users/${_id}`,
                    method: 'PUT',
                    body: { notify }
                }
            }
        })
    })
})

export const {
    useUpdateUserInfoMutation,
    useUpdatePassowrdMutation,
    useUpdateEmailNotificationMutation
} = aboutUser;