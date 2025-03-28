export type Subscription = {
    _id: string;
    name: string;
    price: number;
    currency: 'INR' | 'USD' | 'EUR' | 'GBP';
    frequency: 'monthly' | 'daily' | 'weekly' | 'yearly';
    category: string;
    status: 'active' | 'cancelled' | 'expired';
    startDate: Date;
    renewalDate: Date;
    paymentMethod: string;
}

export type status = 'success' | 'loading' | 'error'

