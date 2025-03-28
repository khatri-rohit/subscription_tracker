import { formatDate, formatCurrency } from '@/lib/utils';
import { AlertCircle, Edit2, Trash2, RefreshCw } from 'lucide-react';

interface SubscriptionCardProps {
    subscription: {
        _id: string
        name: string;
        price: number;
        currency: 'INR' | 'USD' | 'EUR' | 'GBP';
        frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
        category: string;
        status: 'active' | 'cancelled' | 'expired';
        startDate: Date;
        renewalDate: Date;
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
        <div className="relative group w-72 h-56 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col h-full">
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium
          ${isExpired ? 'bg-red-100 text-red-800' :
                        isCancelled ? 'bg-gray-100 text-gray-800' :
                            'bg-green-100 text-green-800'}`}>
                    {subscription.status}
                </div>

                {/* Main Content */}
                <div className="space-y-5">
                    <h4 className="font-medium text-lg truncate">{subscription.name}</h4>
                    <div className="space-y-1">
                        <p className="text-2xl font-bold">
                            {formatCurrency(subscription.price, subscription.currency)}
                            <span className="text-sm text-gray-500">/{subscription.frequency}</span>
                        </p>
                        <p className="text-gray-500 text-sm">{subscription.paymentMethod}</p>
                    </div>

                    {/* Renewal Info */}
                    <div className="text-sm text-gray-600">
                        <p className="flex items-center gap-1">
                            <AlertCircle size={14} />
                            Renews {formatDate(subscription.renewalDate)}
                        </p>
                    </div>
                </div>

                {/* Hover Actions */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2 justify-end">
                        <button
                            className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600"
                            onClick={() => onEdit(subscription._id)}>
                            <Edit2 size={16} />
                        </button>
                        {isExpired ? (
                            <button
                                className="p-2 rounded-full bg-green-50 hover:bg-green-100 text-green-600"
                                onClick={() => onRenew(subscription._id)}>
                                <RefreshCw size={16} />
                            </button>
                        ) : (
                            <button
                                className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600"
                                onClick={() => onCancel(subscription._id)}>
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionCard;