import { motion } from 'motion/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RefreshCw } from 'lucide-react';
import { useUpdateSubscriptionMutation } from '@/services/subscriptions';
import { Subscription, UpdateSubscriptions } from '@/lib/types';


const RenewalDrop = ({ subscription }: { subscription: Subscription }) => {

    const [updateSubscription] = useUpdateSubscriptionMutation()

    const handleRenew = async (period: "monthly" | "daily" | "weekly" | "yearly") => {
        try {
            const newSubscription: UpdateSubscriptions = {
                _id: subscription?._id as string,
                name: subscription.name,
                price: subscription.price,
                category: subscription.category,
                currency: subscription.currency,
                frequency: period,
                paymentMethod: subscription.paymentMethod,
                startDate: subscription.startDate,
                status: 'active'
            }
            await updateSubscription(newSubscription)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.div className='p-2 rounded-full bg-green-50 hover:bg-green-100 text-green-600 cursor-pointer dark:bg-green-600 dark:hover:bg-green-500 dark:text-green-200'
                    whileHover={{ y: -2, boxShadow: "3px 3px 1px #212121" }}
                    whileTap={{ scale: 1.1, transition: { duration: .3 } }}>
                    <RefreshCw size={16} />
                </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-3">
                <DropdownMenuLabel>Periods</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleRenew("monthly")}>
                        Monthly
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRenew("yearly")}>
                        Yearly
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRenew("daily")}>
                        Daily
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRenew("weekly")}>
                        Weekly
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default RenewalDrop