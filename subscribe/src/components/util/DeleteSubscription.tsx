import { Dispatch, SetStateAction } from "react"
import { Subscription } from "@/lib/types"

import { useDeleteSubscriptionMutation } from "@/services/subscriptions"

import { Button } from "../ui/button"
import { getDaysRemaining } from "@/lib/utils"

interface Props {
    subscription?: Subscription,
    setDelete: Dispatch<SetStateAction<boolean>>,
    allSubscriptions: Subscription[],
    setAllSubscriptions: Dispatch<SetStateAction<Subscription[]>>
}

const DeleteSubscription = ({ setDelete, subscription, allSubscriptions, setAllSubscriptions }: Props) => {

    const [deleteSubscription] = useDeleteSubscriptionMutation()

    const handleDelete = async () => {
        const result = await deleteSubscription({ _id: subscription?._id as string })
        console.log(result.data);
        setDelete(false);
        const subscriptions = allSubscriptions.filter((subs) => subs._id !== subscription?._id);
        setAllSubscriptions(subscriptions);
    }

    return (
        <div className="w-72 p-6 rounded-md shadow-lg bg-white dark:bg-gray-800">
            <div className="flex flex-col items-center">
                <div className="text-5xl mb-4 text-gray-900 dark:text-white">🗑️</div>
                <h2 className="text-xl font-semibold text-center mb-2 text-gray-900 dark:text-gray-200">
                    Delete Subscription
                </h2>
                <p className="text-lg text-center text-gray-800 dark:text-gray-300">
                    {subscription?.name}
                </p>
                <p className="text-lg text-center">
                    Status: <span className={subscription?.status === 'active' ? "text-green-500 dark:text-green-400" : subscription?.status === 'expired' ? "text-red-600 dark:text-red-500" : "text-yellow-500 dark:text-yellow-400"}>
                        {subscription?.status}
                    </span>
                </p>
                <p className="text-[1em] text-center mb-2 text-gray-700 dark:text-gray-300">
                    {subscription?.status === 'active' ? `Expire In ${getDaysRemaining(subscription?.renewalDate as Date)} Days` : "Expired"}
                </p>
                <p className="text-sm text-center mb-6 text-gray-600 dark:text-gray-400">
                    Are you sure you want to delete this subscription?
                </p>
                <div className="flex justify-between w-full gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="h-10 px-5 text-base cursor-pointer text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
                        onClick={() => setDelete(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant={"destructive"}
                        className="h-10 px-5 text-base cursor-pointer text-white bg-red-600 dark:bg-red-700"
                        onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteSubscription