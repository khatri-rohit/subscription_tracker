import { Dispatch, SetStateAction } from "react"
import { motion } from "motion/react";

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
        await deleteSubscription({ _id: subscription?._id as string })
        setDelete(false);
        const subscriptions = allSubscriptions.filter((subs) => subs._id !== subscription?._id);
        setAllSubscriptions(subscriptions);
    }

    return (

        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="w-72 p-6 rounded-md shadow-lg bg-white dark:bg-gray-800">
            <motion.div
                className="flex flex-col items-center"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}>
                <motion.div
                    className="text-5xl mb-4 text-gray-900 dark:text-white"
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.2 }}>
                    🗑️
                </motion.div>
                <motion.h2
                    className="text-xl font-semibold text-center mb-2 text-gray-900 dark:text-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}>
                    Delete Subscription
                </motion.h2>
                <motion.p
                    className="text-lg text-center text-gray-800 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}>
                    {subscription?.name}
                </motion.p>
                <motion.p
                    className="text-lg text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}>
                    Status: <span className={subscription?.status === 'active' ? "text-green-500 dark:text-green-400" : subscription?.status === 'expired' ? "text-red-600 dark:text-red-500" : "text-yellow-500 dark:text-yellow-400"}>
                        {subscription?.status}
                    </span>
                </motion.p>
                <motion.p
                    className="text-[1em] text-center mb-2 text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}>
                    {subscription?.status === 'active' ? `Expire In ${getDaysRemaining(subscription?.renewalDate as Date)} Days` : "Expired"}
                </motion.p>
                <motion.p
                    className="text-sm text-center mb-6 text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    Are you sure you want to delete this subscription?
                </motion.p>
                <motion.div
                    className="flex justify-between w-full gap-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <Button
                        type="button"
                        variant="outline"
                        className="h-10 px-5 text-base cursor-pointer text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
                        onClick={() => setDelete(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={"destructive"}
                        className="h-10 px-5 text-base cursor-pointer text-white bg-red-600 dark:bg-red-700"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default DeleteSubscription