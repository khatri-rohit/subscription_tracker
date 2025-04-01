import { Pass, User, UserInput } from '@/lib/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const aboutUser = createApi({
    reducerPath: "subscriptionAPi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
    endpoints: (builder) => ({
        updateUserInfo: builder.mutation<User, UserInput>({
            query: (data) => {
                const { _id, firstName, lastName, email } = data
                return {
                    url: `/users/${_id}`,
                    method: 'PUT',
                    body: { firstName, lastName, email }
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
        }),
        updateUserAvatar: builder.mutation({
            query: (data) => {
                const { _id, profileImage } = data;

                // Create FormData object
                const formData = new FormData();
                formData.append("profileImage", profileImage);
                console.log(formData);
                return {
                    url: `/users/img/${_id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
        }),
    })
})

export const {
    useUpdateUserInfoMutation,
    useUpdatePassowrdMutation,
    useUpdateEmailNotificationMutation,
    useUpdateUserAvatarMutation
} = aboutUser;