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

export type UserInput = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string
}

export type User = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    notify: boolean
}

export type Pass = {
    _id: string,
    password: string,
    confirmPassword: string,
}

export type SubsStatus = 'All' | 'active' | 'cancelled' | 'expired' 