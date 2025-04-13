import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { X, List, Rows4, Search, Sofa, Volleyball, Tv2 } from "lucide-react"
import { motion } from 'motion/react'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import SubscriptionCard from "@/components/common/SubscriptionCard"
import { Category, Subscription, Tabs } from "@/lib/types"
import { useGetAllSubscriptionsQuery } from "@/services/subscriptions"
import { useAuth } from "@/context/Auth"
import EditSubscription from "@/components/util/EditSubscription"
import Model from "@/components/util/Model"
import DeleteSubscription from "@/components/util/DeleteSubscription"
import useSearch from "@/hooks/useSearch"
import { search } from '@/lib/search'

// enum: ['education', 'health', 'finance',],

const tabs: Tabs[] = [
  {
    name: "All",
    category: "All",
    icon: <List color="#BBBBBB" />,
    idle: "cursor-pointer text-lg flex justify-center items-center w-[6%] gap-x-3 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[115%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]",
    active: "cursor-pointer text-lg flex justify-center items-center w-[6%] gap-x-3 relative after:absolute after:-bottom-[13px] after:w-[115%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]"
  },
  {
    name: "Entertainment",
    category: "entertainment",
    icon: <Tv2 color="#BBBBBB" />,
    idle: "cursor-pointer text-lg flex justify-center items-center w-[6.5%] gap-x-3 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[115%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]",
    active: "cursor-pointer text-lg flex justify-center items-center w-[6.5%] gap-x-3 relative after:absolute after:-bottom-[13px] after:w-[115%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]"
  },
  {
    name: "Sports",
    category: "sports",
    icon: <Volleyball color="#BBBBBB" />,
    idle: "cursor-pointer text-lg flex justify-center items-center w-[6%] gap-x-3 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[115%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]",
    active: "cursor-pointer text-lg flex justify-center items-center w-[6%] gap-x-3 relative after:absolute after:-bottom-[13px] after:w-[115%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]"
  },
  {
    name: "Lifestyle",
    category: "lifestyle",
    icon: <Sofa color="#BBBBBB" />,
    idle: "cursor-pointer text-lg flex justify-center items-center w-[6%] gap-x-3 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[115%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]",
    active: "cursor-pointer text-lg flex justify-center items-center w-[6%] gap-x-3 relative after:absolute after:-bottom-[13px] after:w-[115%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]"
  },
  {
    name: "Others",
    category: "other",
    icon: <Rows4 color="#BBBBBB" />,
    idle: "cursor-pointer text-lg flex justify-center items-center w-[6%] gap-x-3 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[115%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]",
    active: "cursor-pointer text-lg flex justify-center items-center w-[6%] gap-x-3 relative after:absolute after:-bottom-[13px] after:w-[115%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]"
  },
]

const Subscriptions = () => {

  const navigate = useNavigate();
  const { user } = useAuth()

  const [edit, setEdit] = useState<boolean>(false);
  const [del, setDelete] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);

  const {
    data,
    refetch
  } = useGetAllSubscriptionsQuery(user?._id, {
    skip: !user?._id.trim(),
  });

  const [allSubscriptions, setAllSubscriptions] = useState<Subscription[]>([])

  const [status, setStatus] = useState<Category>('All')
  const [length, setLength] = useState<number>(1);

  const [query, setSearch] = useState<string>("")
  const [searchedSubs, setSearchSubs] = useState<Subscription[]>([]);


  const results: Subscription[] = useSearch(
    allSubscriptions,
    query,
    search({
      fields: ["name", "renewalDate"],
      matchType: "fuzzySearch",
    })
  );

  const handleEdit = (id: string) => {
    setId(id);
    setEdit(true);
  }
  const handleCancel = (id: string) => {
    setId(id);
    setDelete(true);
  }
  const handleRenew = (id: string) => {
    console.log(id);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (results.length > 0) {
      setSearchSubs(results);
    } else {
      const subs = allSubscriptions.filter((m) => m.name.toLowerCase().includes(query));
      setSearchSubs(subs);
    }
    // console.log(results);
  }

  const handleChangeTabs = (category: Category) => {
    setSearch("");
    setSearchSubs([]);
    if (length > 0) {
      if (status === category) {
        setStatus("All")
        setLength(1)
      } else {
        setStatus(category);
        if (category !== 'All') {
          const newSubsLen =
            allSubscriptions.filter((subscription) => subscription.category === category);
          if (newSubsLen.length > 0)
            setLength(newSubsLen.length);
        } else {
          setLength(1);
          setSearchSubs([]);
        }
      }
    }
  }

  const handleX = () => {
    setSearch("")
    setSearchSubs([]);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) {
      setSearchSubs([]);
      setSearch(value)
    } else {
      setSearch(value)
    }
  }

  useEffect(() => {
    if (user?._id) {
      refetch();
      // console.log("Refetching");
    }
  }, [user, refetch]);

  useEffect(() => {
    setAllSubscriptions((data as Subscription[]))
    setLength((data?.length as number));
  }, [data])

  return (
    <>
      {edit && (
        <Model setting="edit">
          <EditSubscription setEdit={setEdit}
            allSubscriptions={allSubscriptions}
            setAllSubscriptions={setAllSubscriptions}
            subscription={allSubscriptions.find((subs) => subs._id === id)} />
        </Model>
      )}
      {del && (
        <Model setting="edit">
          <DeleteSubscription
            subscription={allSubscriptions.find((subs) => subs._id === id)}
            allSubscriptions={allSubscriptions}
            setAllSubscriptions={setAllSubscriptions}
            setDelete={setDelete} />
        </Model>
      )}
      <motion.main initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0, transition: { duration: .3 } }}
        className="p-10 dark:bg-gray-900 dark:text-white h-screen">
        <div className="p-2 space-y-5 w-1/2">
          <h3 className="text-3xl">Manage Subscriptions</h3>
          <div className="flex items-center gap-x-2 w-full">
            <form onSubmit={onSubmit} className="border-[.12em] border-[#BCC1CA] dark:border-gray-700 w-1/2 flex items-center rounded-lg shadow-2xs dark:bg-gray-800">
              <Search className="mx-2" />
              <Input className="border-none md:text-xl shadow-none dark:text-white"
                placeholder="Search Subscription"
                value={query}
                onChange={handleChange} />
              {query.length > 0 && (<X className="cursor-pointer mr-1.5 p-0.5" onClick={handleX} />)}
            </form>

            <motion.button whileTap={{ scale: 1.15, transition: { ease: "easeIn" } }}>
              <Button className="bg-[#636AE8] text-[1.1em] text-white px-4 py-2 rounded-lg hover:bg-[#4B51B8] cursor-pointer dark:bg-[#4B51B8] dark:hover:bg-[#636AE8]" onClick={() => navigate('/subscription/create-subs')}>
                Create Subscription
              </Button>
            </motion.button>
          </div>
        </div>

        <div className="flex items-center justify-start gap-1 p-1 gap-x-14 mt-3">
          {
            tabs.map((tab, _) => (
              <p key={_} className={`${tab.category === status ? tab.active : tab.idle} dark:text-gray-300`}
                onClick={() => handleChangeTabs(tab.category)}>
                {tab.icon}{tab.name}
              </p>
            ))
          }
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">
          {length > 0 ? searchedSubs.length > 0 ? searchedSubs.map((subscription) => (
            <SubscriptionCard
              key={subscription._id}
              subscription={subscription}
              onEdit={(id) => handleEdit(id)}
              onCancel={(id) => handleCancel(id)}
              onRenew={(id) => handleRenew(id)}
            />
          )) : allSubscriptions.map((subscription) => {
            if (status === 'All') {
              return (<SubscriptionCard
                key={subscription._id}
                subscription={subscription}
                onEdit={(id) => handleEdit(id)}
                onCancel={(id) => handleCancel(id)}
                onRenew={(id) => handleRenew(id)}
              />);
            } else if (subscription.category === status) {
              return (<SubscriptionCard
                key={subscription._id}
                subscription={subscription}
                onEdit={(id) => handleEdit(id)}
                onCancel={(id) => handleCancel(id)}
                onRenew={(id) => handleRenew(id)}
              />);
            } else if ((status !== 'entertainment' && status !== 'lifestyle' && status !== 'sports') && status === 'other') {
              return (<SubscriptionCard
                key={subscription._id}
                subscription={subscription}
                onEdit={(id) => handleEdit(id)}
                onCancel={(id) => handleCancel(id)}
                onRenew={(id) => handleRenew(id)}
              />);
            }
          }) : <p className="text-xl my-auto text-center md:col-span-3 lg:col-span-5 xl:col-span-5 dark:text-gray-400">you don't have {length == 0 ? "Any" : status} subscriptions yet</p>}
        </div>
      </motion.main>
    </>
  )
}

export default Subscriptions