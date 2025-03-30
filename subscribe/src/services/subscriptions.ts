import { CreateSubscriptions, Subscription } from '@/lib/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const allSubscriptions = createApi({
    reducerPath: "subscriptionAPi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
    endpoints: (builder) => ({
        getAllSubscriptions: builder.query<Subscription[], string | undefined>({
            query: (userId) => `/subscriptions/user/${userId}`,
        }),
        createSubscription: builder.mutation<Subscription[], CreateSubscriptions>({
            query: (newSubscription) => ({
                url: '/subscriptions',
                method: 'POST',
                body: newSubscription
            })
        })
    })
})

export const {
    useGetAllSubscriptionsQuery,
    useCreateSubscriptionMutation
} = allSubscriptions;