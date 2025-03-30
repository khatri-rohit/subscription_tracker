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

export type CreateSubscriptions = {
    name: string;
    price: number;
    currency: 'INR' | 'USD' | 'EUR' | 'GBP';
    frequency: 'monthly' | 'daily' | 'weekly' | 'yearly';
    category: string;
    startDate: Date;
    paymentMethod: string;
}

export type status = 'success' | 'loading' | 'error'

export type Category = 'All' | 'entertainment' | 'sports' | 'lifestyle' | 'other'

export type Tabs = {
    category: Category,
    name: string
    idle: string
    active: string
    icon: React.ReactElement
}

export type SubsStatus = 'All' | 'active' | 'cancelled' | 'expired' 