import { CreateSubscriptions, Subscription } from '@/lib/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const allSubscriptions = createApi({
    reducerPath: "subscriptionAPi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
    endpoints: (builder) => ({
        createSubscription: builder.mutation<Subscription[], CreateSubscriptions>({
            query: (newSubscription) => ({
                url: '/subscriptions',
                method: 'POST',
                body: newSubscription
            })
        }),
        getSubscription: builder.query<Subscription, string | undefined>({
            query: (userId) => `/subscriptions/${userId}`,
        }),
        getAllSubscriptions: builder.query<Subscription[], string | undefined>({
            query: (userId) => `/subscriptions/user/${userId}`,
        }),
        updateSubscription: builder.mutation<Subscription, CreateSubscriptions>({
            query: (newSubscription) => ({
                url: `/subscriptions/${newSubscription._id}`,
                method: 'PUT',
                body: newSubscription
            })
        }),
        deleteSubscription: builder.mutation<Subscription, { _id: string }>({
            query: (data) => ({
                url: `/subscriptions/${data._id}`,
                method: 'DELETE',
            })
        }),

    })
})

export const {
    useGetAllSubscriptionsQuery,
    useGetSubscriptionQuery,
    useCreateSubscriptionMutation,
    useUpdateSubscriptionMutation,
    useDeleteSubscriptionMutation
} = allSubscriptions;