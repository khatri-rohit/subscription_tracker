import SubscriptionCard from "@/components/SubscriptionCard"
import { Input } from "@/components/ui/input"
import { List, Rows4, Search, Sofa, Tv2, Volleyball } from "lucide-react"

// enum: ['education', 'health', 'finance',],

const tabs = [
  {
    icon: <List color="#BBBBBB" />,
    category: "All"
  },
  {
    icon: <Volleyball color="#BBBBBB" />,
    category: "sports"
  },
  {
    icon: <Tv2 color="#BBBBBB" />,
    category: "Entertainment"
  },
  {
    icon: <Sofa color="#BBBBBB" />,
    category: "Lifestyle"
  },
  {
    icon: <Rows4 color="#BBBBBB" />,
    category: "Others"
  },
]

const subscriptions: {
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
}[] = [
    {
      _id: "1",
      name: 'Netflix Premium',
      price: 649,
      currency: 'INR',
      frequency: 'monthly',
      category: 'Entertainment',
      status: 'active',
      startDate: new Date('2024-01-01'),
      renewalDate: new Date('2024-04-01'),
      paymentMethod: 'Credit Card',
    },
    {
      _id: "2",
      name: 'Spotify Family',
      price: 179,
      currency: 'INR',
      frequency: 'monthly',
      category: 'Entertainment',
      status: 'active',
      startDate: new Date('2024-02-15'),
      renewalDate: new Date('2024-03-15'),
      paymentMethod: 'UPI',
    },
    {
      _id: "3",
      name: 'Gold Gym',
      price: 12000,
      currency: 'INR',
      frequency: 'yearly',
      category: 'sports',
      status: 'expired',
      startDate: new Date('2023-01-01'),
      renewalDate: new Date('2024-01-01'),
      paymentMethod: 'Debit Card',
    },
    {
      _id: "4",
      name: 'Amazon Prime',
      price: 1499,
      currency: 'INR',
      frequency: 'yearly',
      category: 'Lifestyle',
      status: 'active',
      startDate: new Date('2024-01-01'),
      renewalDate: new Date('2025-01-01'),
      paymentMethod: 'Net Banking',
    },
    {
      _id: "5",
      name: 'Disney+ Hotstar',
      price: 299,
      currency: 'INR',
      frequency: 'monthly',
      category: 'Entertainment',
      status: 'cancelled',
      startDate: new Date('2024-01-01'),
      renewalDate: new Date('2024-02-01'),
      paymentMethod: 'Credit Card',
    }
  ]

const Subscriptions = () => {

  const handleEdit = (id: string) => {
    console.log(id);
  }
  const handleCancel = (id: string) => {
    console.log(id);
  }
  const handleRenew = (id: string) => {
    console.log(id);
  }

  return (
    <section className="p-10">
      <div className="p-2 space-y-5 w-1/2">
        <h3 className="text-3xl">Manage Subscriptions</h3>
        <div className="flex items-center gap-x-2 w-full">
          <div className="border-[.12em] border-[#BCC1CA] w-1/2 flex items-center rounded-lg shadow-2xs">
            <Search className="mx-2" />
            <Input className="border-none md:text-xl shadow-none"
              placeholder="Search Subscription" />
          </div>
          <button className="bg-[#636AE8] text-white px-4 py-2 rounded-lg hover:bg-[#4B51B8] transition-colors">
            Create Subscription
          </button>
        </div>
      </div>

      <div className="flex items-center justify-start gap-1 p-1 gap-x-14">
        {
          tabs.map((tab) => (
            <p className="cursor-pointer text-lg flex justify-start items-center w-[6%] gap-x-3 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[115%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]">
              {tab.icon}{tab.category}
            </p>
          ))
        }
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {subscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription._id}
            subscription={subscription}
            onEdit={(id) => handleEdit(id)}
            onCancel={(id) => handleCancel(id)}
            onRenew={(id) => handleRenew(id)}
          />
        ))}
      </div>

    </section>
  )
}

export default Subscriptions