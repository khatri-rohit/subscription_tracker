import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { List, Rows4, Search, Sofa, Tv2, Volleyball } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Subscription } from "@/lib/types"

import SubscriptionCard from "@/components/common/SubscriptionCard"
import { useAuth } from "@/context/Auth"

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


const Subscriptions = () => {

  const [subscriptions, setSubscirpions] = useState<Subscription[]>([]);
  const navigate = useNavigate();

  const { apiUrl, user } = useAuth()

  const fetchSubscriptions = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${apiUrl}/subscriptions/user/${user?._id}`)
      console.log(response);
      setSubscirpions(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = (id: string) => {
    console.log(id);
  }
  const handleCancel = (id: string) => {
    console.log(id);
  }
  const handleRenew = (id: string) => {
    console.log(id);
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [])

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
          <button className="bg-[#636AE8] text-white px-4 py-2 rounded-lg hover:bg-[#4B51B8] transition-colors"
            onClick={() => navigate('/subscription/create-subs')}>
            Create Subscription
          </button>
        </div>
      </div>

      <div className="flex items-center justify-start gap-1 p-1 gap-x-14">
        {
          tabs.map((tab, _) => (
            <p key={_} className="cursor-pointer text-lg flex justify-start items-center w-[6%] gap-x-3 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[115%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]">
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