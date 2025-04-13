import { formatDate, formatCurrency } from '@/lib/utils';
import { AlertCircle, Edit2, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'motion/react'

interface SubscriptionCardProps {
    subscription: {
        _id: string
        name: string;
        price: number;
        currency: 'INR' | 'USD' | 'EUR' | 'GBP';
        frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
        category: string;
        status?: 'active' | 'cancelled' | 'expired';
        startDate: Date;
        renewalDate?: Date;
        paymentMethod: string;
    };
    onEdit: (id: string) => void;
    onCancel: (id: string) => void;
    onRenew: (id: string) => void;
}

const SubscriptionCard = ({ subscription, onEdit, onCancel, onRenew }: SubscriptionCardProps) => {
    const isExpired = subscription.status === 'expired';
    const isCancelled = subscription.status === 'cancelled';

    return (
        <motion.div initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1, transition: { delay: .5 } }}
            whileHover={{
                scale: 1.09, transition: { duration: 0.2 }, boxShadow: "1px 1px 3px #21212134"
            }}
            className="relative group w-72 h-56 bg-[#fefefe] dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col h-full">
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium
            ${isExpired ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200' :
                        isCancelled ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' :
                            'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200'}`}>
                    {subscription.status}
                </div>

                {/* Main Content */}
                <div className="space-y-5">
                    <h4 className="font-medium text-lg truncate text-gray-900 dark:text-gray-100">{subscription.name}</h4>
                    <div className="space-y-1">
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {formatCurrency(subscription.price, subscription.currency)}
                            <span className="text-sm text-gray-500 dark:text-gray-400">/{subscription.frequency}</span>
                        </p>
                        <p className="text-gray-500 text-sm dark:text-gray-400">{subscription.paymentMethod}</p>
                    </div>

                    {/* Renewal Info */}
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        <p className="flex items-center gap-1">
                            <AlertCircle size={14} />
                            Renews {formatDate(subscription.renewalDate as Date)}
                        </p>
                    </div>
                </div>

                {/* Hover Actions */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2 justify-end">
                        {/* <motion.button /> */}
                        <motion.button className='cursor-pointer px-0.5'
                            whileTap={{ scale: 0.8 }}>
                            <Button
                                className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-blue-200"
                                onClick={() => onEdit(subscription._id)}>
                                <Edit2 size={16} />
                            </Button>
                        </motion.button>
                        {isExpired ? (
                            <Button
                                className="p-2 rounded-full bg-green-50 hover:bg-green-100 text-green-600 cursor-pointer dark:bg-green-600 dark:hover:bg-green-500 dark:text-green-200"
                                onClick={() => onRenew(subscription._id)}>
                                <RefreshCw size={16} />
                            </Button>
                        ) : (
                            <motion.button className='cursor-pointer px-0.5'
                                whileTap={{ scale: 0.8 }}>
                                <Button
                                    className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer dark:bg-red-600 dark:hover:bg-red-500 dark:text-red-200"
                                    onClick={() => onCancel(subscription._id)}>
                                    <Trash2 size={16} />
                                </Button>
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SubscriptionCard;