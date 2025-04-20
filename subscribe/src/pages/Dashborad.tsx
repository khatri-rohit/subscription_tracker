import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { List, Loader, Music, Search, Sofa, Video, X } from "lucide-react"
import { motion } from 'motion/react'

import { useAppDispatch, useAppSelector } from "@/app/store";
import { useGetAllSubscriptionsQuery } from '@/services/subscriptions'
import { setSubscription } from '@/features/slice'
import { useAuth } from "@/context/Auth.tsx";
import SubsOverview from "@/components/common/SubsOverview.tsx";
import { Category, Subscription, SubsStatus, Tabs } from "@/lib/types";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

const tabs: Tabs[] = [
  {
    category: "All",
    name: "All",
    idle: "cursor-pointer text-lg flex justify-center items-center w-[25%] gap-x-1 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[100%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]",
    active: "cursor-pointer text-lg flex justify-center items-center w-[25%] gap-x-1 relative after:absolute after:-bottom-[13px] after:w-[100%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]",
    icon: <List color="#BBBBBB" />
  },
  {
    category: "entertainment",
    name: "Entertainment",
    idle: "cursor-pointer text-lg flex justify-center items-center w-[25%] gap-x-1 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[100%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]",
    active: "cursor-pointer text-lg flex justify-center items-center w-[25%] gap-x-1 relative after:absolute after:-bottom-[13px] after:w-[100%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]",
    icon: <Music color="#BBBBBB" />
  },
  {
    category: "sports",
    name: "Sports",
    idle: "cursor-pointer text-lg flex justify-center items-center w-[25%] gap-x-1 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[100%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]",
    active: "cursor-pointer text-lg flex justify-center items-center w-[25%] gap-x-1 relative after:absolute after:-bottom-[13px] after:w-[100%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]",
    icon: <Video color="#BBBBBB" />
  },
  {
    category: "lifestyle",
    name: "Lifestyle",
    idle: "cursor-pointer text-lg flex justify-center items-center w-[25%] gap-x-1 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[100%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]",
    active: "cursor-pointer text-lg flex justify-center items-center w-[25%] gap-x-1 relative after:absolute after:-bottom-[13px] after:w-[100%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]",
    icon: <Sofa color="#BBBBBB" />
  },
]

const Dashborad = () => {

  const { user } = useAuth()
  const dispatch = useAppDispatch()

  const [filterSubscirpion, setFilterSubscription] = useState<Subscription[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const [category, setCategory] = useState<Category>("All");
  const [status, setStatus] = useState<SubsStatus>("All");
  const [length, setLength] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [filterSearch, setFilterSearch] = useState<string>("");

  const {
    isLoading,
    data,
    isError
  } = useGetAllSubscriptionsQuery({ userId: user?._id as string }, {
    skip: !user?._id.trim(),
  });

  const handleChangeStatus = (newStatus: SubsStatus) => {
    if (status === newStatus) {
      setStatus("All")
      setLength(1)
    } else {
      setStatus(newStatus);
      const newSubsLen = subscriptions.filter((subscription) => subscription.status === newStatus);
      setLength(newSubsLen.length);
    }
  }

  const handleChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // console.log(value);
    if (value.length === 0) {
      setSearch(value)
      setSubscriptions(data?.subscriptions as Subscription[])
    } else {
      setSearch(value)
    }
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length > 0) {
      const subs = subscriptions.filter((m) => m.name.toLowerCase().includes(search));
      setSubscriptions(subs);
      setLength(subs.length)
    }
  }

  const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) {
      setFilterSearch(value)
      setFilterSubscription(data?.subscriptions as Subscription[])
    } else {
      setFilterSearch(value)
    }
  }

  const handleFilterSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filterSearch.length > 0) {
      const subs = filterSubscirpion.filter((m) => m.name.toLowerCase().includes(filterSearch));
      setFilterSubscription(subs);
    }
  }

  const handleX1 = () => {
    setSearch("");
    setSubscriptions(data?.subscriptions as Subscription[]);
  }

  const handleX2 = () => {
    setFilterSearch("");
    setFilterSubscription(data?.subscriptions as Subscription[]);
  }

  const isAuth = useAppSelector((state) => state.rootReducers.isAuth)

  useEffect(() => {
    if (data) {
      dispatch(setSubscription(data?.subscriptions))
      setSubscriptions(data?.subscriptions);
      setFilterSubscription(data?.subscriptions);
      setLength(data?.subscriptions.length);
    }
  }, [data, isAuth, dispatch])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 md:p-8 lg:p-10 dark:bg-gray-900 min-h-screen"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 sm:space-y-5 w-fit">
        <h3 className="text-3xl dark:text-white">Subscription Overview</h3>
        {/* Search Overview */}
        <div className="flex items-center gap-x-2 w-full">
          <form onSubmit={handleSearch} className="border-[.12em] border-[#BCC1CA] min-w-[75%] flex items-center rounded-lg shadow-2xs dark:border-gray-600 dark:bg-[#2E2E2E]">
            <Search className="mx-2" />
            <Input className="border-none md:text-xl shadow-none  dark:text-white"
              placeholder="Search Subscription"
              value={search}
              onChange={handleChange1} />
            {search.length > 0 && (<X className="cursor-pointer mr-1.5 p-0.5" onClick={handleX1} />)}
          </form>

          {(data?.subscriptions.length as number) > 0 && (<div className="tags text-[1em] flex items-center justify-between gap-x-2">
            <span className={`bg-gray-100 font-light px-2 rounded-2xl cursor-pointer ${status === 'active' ? "font-semibold" : "font-light"} dark:bg-gray-600 dark:text-white`}
              onClick={() => handleChangeStatus("active")}>
              Active
            </span>
            <span className={`bg-blue-100 text-blue-500 px-2 rounded-2xl cursor-pointer ${status === 'cancelled' ? "font-semibold" : "font-light"} dark:bg-blue-600 dark:text-white`}
              onClick={() => handleChangeStatus("cancelled")}>
              Pending
            </span>
            <span className={`bg-red-100 text-red-500 px-2 rounded-2xl cursor-pointer ${status === 'expired' ? "font-semibold" : "font-light"} dark:bg-red-600 dark:text-white`}
              onClick={() => handleChangeStatus("expired")}>
              Expired
            </span>
          </div>)}
        </div>
      </motion.div>

      {/* All Subscriptions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`mt-6 ${isError || isLoading
          ? "h-52 flex items-center justify-center"
          : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 min-h-[30vh]"}`}>
        {isError && (<p className="text-2xl text-red-500 my-auto text-center">Something Went Wrong </p>)}
        {!isError && (isLoading ? <Loader size={45} className='animate-spin opacity-75 text-black dark:text-white' /> :
          length > 0 ? (subscriptions?.map((subscription) => {
            if (subscription.status === status) {
              return (<SubsOverview key={subscription._id} name={subscription.name}
                renewalDate={subscription.renewalDate as Date} status={subscription.status} />)
            } else if (status === "All") {
              return <SubsOverview key={subscription._id} name={subscription.name}
                renewalDate={subscription.renewalDate as Date} status={subscription.status} />
            }
          })) : <p className="text-xl flex items-center justify-center text-center md:col-span-3 lg:col-span-4 min-h-[30vh]">
            You don't have {length == 0 ? "Any" : status} subscriptions
          </p>)
        }
        {(data?.subscriptions.length === 0 || !data) && !isLoading && (!isError) && <NavLink to={'/subscription/create-subs'}
          className="text-xl my-auto text-center md:col-span-3 lg:col-span-4">
          <Button variant={"secondary"}
            className="text-xl rounded-lg cursor-pointer p-5 dark:bg-white dark:text-gray-900">
            Create Reminder Now
          </Button>
        </NavLink>}
      </motion.div>

      <motion.div
        className="p-2 space-y-5 mt-8 mb-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="p-2 space-y-5 w-full sm:w-fit" variants={itemVariants}>
          <h3 className="text-2xl sm:text-3xl font-semibold dark:text-white">
            Filter & Search Subscriptions
          </h3>
          <div className="flex items-center gap-x-2 w-full max-w-2xl">
            <form onSubmit={handleFilterSearch}
              className="border-[.12em] border-[#BCC1CA] w-full flex items-center rounded-lg shadow-2xs dark:border-gray-600 dark:bg-gray-700 transition-all duration-300 hover:shadow-md">
              <Search className="mx-2" />
              <Input
                value={filterSearch}
                onChange={handleChange2}
                className="border-none text-base sm:text-lg md:text-xl shadow-none dark:text-white w-full"
                placeholder="Search Subscription"
              />
              {filterSearch.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <X className="cursor-pointer mr-1.5 p-0.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
                    onClick={handleX2}
                  />
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex items-center justify-start sm:justify-evenly w-full sm:w-1/2 gap-2 pb-2"
          variants={itemVariants}>
          {tabs.map((tab, index) => (
            <motion.p
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${tab.category === category ? tab.active : tab.idle
                } text-sm sm:text-base whitespace-nowrap`}
              onClick={() => setCategory(tab.category)}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.name}</span>
            </motion.p>
          ))}
        </motion.div>

        {/* All Subscriptions */}
        <motion.div
          className={isError || isLoading
            ? "h-52 flex items-center justify-center"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 min-h-56"}
          variants={itemVariants}
        >
          {isError && (
            <motion.p
              className="text-xl sm:text-2xl text-red-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              Something Went Wrong
            </motion.p>
          )}

          {!isError && (isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader size={45} className='animate-spin opacity-75 text-black dark:text-white' />
            </motion.div>
          ) : (
            filterSubscirpion.length > 0 && filterSubscirpion?.map((subscription, index) => {
              if (subscription.category === category || category === 'All') {
                return (
                  <motion.div
                    key={subscription._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SubsOverview
                      name={subscription.name}
                      renewalDate={subscription.renewalDate as Date}
                      status={subscription.status}
                    />
                  </motion.div>
                );
              }
            })
          ))}

          {filterSubscirpion.length === 0 && !isLoading && (
            <motion.p
              className="text-lg sm:text-xl my-auto text-center col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              You don't have {length == 0 ? "Any" : category} subscriptions
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </motion.main >
  )
}

export default Dashborad