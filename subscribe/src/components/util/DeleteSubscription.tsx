import { Subscription } from "@/lib/types"
import { Button } from "../ui/button"
import { useDeleteSubscriptionMutation } from "@/services/subscriptions"
import { getDaysRemaining } from "@/lib/utils"

interface Props {
    subscription?: Subscription,
    setDelete: (edit: boolean) => void,
}

const DeleteSubscription = ({ setDelete, subscription }: Props) => {

    const [deleteSubscription] = useDeleteSubscriptionMutation()

    const handleDelete = async () => {
        const result = await deleteSubscription({ _id: subscription?._id as string })
        console.log(result.data);
        setDelete(false)
        window.location.reload()
    }

    return (
        <div className="w-72 p-6 rounded-md shadow-lg bg-white">
            <div className="flex flex-col items-center">
                <div className="text-5xl mb-4">🗑️</div>
                <h2 className="text-xl font-semibold text-center mb-2">
                    Delete Subscription
                </h2>
                <p className="text-lg text-center">
                    {subscription?.name}
                </p>
                <p className="text-lg text-center">
                    Status: <span className={subscription?.status === 'active' ? "text-green-500" : subscription?.status === 'expired' ? "text-red-600" : "text-yellow-500"}>
                        {subscription?.status}
                    </span>
                </p>
                <p className="text-[1em] text-center mb-2">
                    {subscription?.status === 'active' ? `Expire In ${getDaysRemaining(subscription?.renewalDate as Date)} Days` : "Expired"}
                </p>
                <p className="text-sm text-center mb-6">
                    Are you sure you want to delete this subscription?
                </p>
                <div className="flex justify-between w-full gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="h-10 px-5 text-base cursor-pointer"
                        onClick={() => setDelete(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant={"destructive"}
                        className="h-10 px-5 text-base cursor-pointer"
                        onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteSubscription