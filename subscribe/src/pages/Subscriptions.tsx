import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { X, List, Rows4, Search, Sofa, Volleyball, Tv2, Circle } from "lucide-react"
import { motion } from 'motion/react'

import { Input } from "@/components/ui/input"

import SubscriptionCard from "@/components/common/SubscriptionCard"
import { Category, Pagination, Subscription, Tabs } from "@/lib/types"
import { useGetAllSubscriptionsQuery } from "@/services/subscriptions"
import { useAuth } from "@/context/Auth"
import EditSubscription from "@/components/util/EditSubscription"
import Model from "@/components/util/Model"
import DeleteSubscription from "@/components/util/DeleteSubscription"
import useSearch from "@/hooks/useSearch"
import { search } from '@/lib/search'
import { Button } from "@/components/ui/button"

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
    category: "Other",
    icon: <Rows4 color="#BBBBBB" />,
    idle: "cursor-pointer text-lg flex justify-center items-center w-[6%] gap-x-3 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[115%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]",
    active: "cursor-pointer text-lg flex justify-center items-center w-[6%] gap-x-3 relative after:absolute after:-bottom-[13px] after:w-[115%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]"
  },
]

const Subscriptions = () => {

  const navigate = useNavigate();
  const { user } = useAuth()
  // const location = useLocation()
  // console.log(user);

  const [edit, setEdit] = useState<boolean>(false);
  const [del, setDelete] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [paginationData, setPaginationData] = useState<Pagination | null>(null);

  const {
    data,
    refetch,
    isLoading,
    currentData
  } = useGetAllSubscriptionsQuery({
    userId: user?._id as string,
    page: currentPage,
    limit: itemsPerPage,
  }, {
    skip: !user?._id?.trim(),
    refetchOnMountOrArgChange: true,
  });

  // Pagination handlers
  const handleNextPage = () => {
    if (paginationData && currentPage < paginationData.pages) {
      setCurrentPage(prev => prev + 1);
    }
    console.log("Next page");
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }


  const [allSubscriptions, setAllSubscriptions] = useState<Subscription[]>([])

  const [status, setStatus] = useState<Category>('All')
  const [length, setLength] = useState<number>(1);

  const [query, setSearch] = useState<string>("")
  // const [searchedSubs, setSearchSubs] = useState<Subscription[]>([]);


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
      setAllSubscriptions(results);
    } else {
      const subs = allSubscriptions.filter((m) => m.name.toLowerCase().includes(query));
      setAllSubscriptions(subs)
    }
    // console.log(results);
  }

  const handleChangeTabs = (category: Category) => {
    setSearch("");
    setAllSubscriptions((currentData?.subscriptions as Subscription[]))
    if (length > 0) {
      if (status === category) {
        setStatus("All")
        setLength(1)
      } else {
        setStatus(category);
        if (category !== 'All') {
          const newSubsLen = allSubscriptions.filter((subscription) => subscription.category === category);
          if (newSubsLen.length > 0)
            setLength(newSubsLen.length);
        } else {
          setLength(1);
          setAllSubscriptions((currentData?.subscriptions as Subscription[]))
        }
      }
    }
  }

  const handleX = () => {
    setSearch("")
    setAllSubscriptions((currentData?.subscriptions as Subscription[]))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) {
      setAllSubscriptions((data?.subscriptions as Subscription[]))
      setSearch(value)
    } else {
      setSearch(value)
    }
  }

  useEffect(() => {
    if (user?._id) {
      refetch();
      console.log("Refetching");
    }
  }, [user, refetch]);

  useEffect(() => {
    console.log(data);
    setAllSubscriptions((data?.subscriptions as Subscription[]))
    setPaginationData(data?.pagination as Pagination)
    setLength((data?.subscriptions?.length as number));
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
        className="p-10 dark:bg-gray-900 dark:text-white min-h-screen">
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

            <motion.button className="bg-[#636AE8] text-[1.1em] text-white px-4 py-2 rounded-lg hover:bg-[#4B51B8] cursor-pointer dark:bg-[#4B51B8] dark:hover:bg-[#636AE8]"
              whileTap={{ scale: 1.15, transition: { ease: "easeIn" } }}
              onClick={() => navigate('/subscription/create-subs')}>
              Create Subscription
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

        {/* <Button
            onClick={handlePrevPage}
            disabled={currentPage <= 1 || isLoading || isFetching}
            className={`absolute top-1/2 transform -translate-y-1/2 ${currentPage <= 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            <ChevronsLeft />
          </Button> */}

        {/* <Button
            onClick={handleNextPage}
            disabled={!paginationData || currentPage >= paginationData.pages || isLoading || isFetching}
            className={`absolute top-1/2 right-0 transform -translate-y-1/2 ${!paginationData || currentPage >= paginationData.pages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            <ChevronsRight />
          </Button> */}
        <div className="w-full mx-auto relative flex flex-col justify-between space-y-1 min-h-[600px]">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6 lg:gap-4 md:gap-3 mt-10 mx-10">
            {isLoading ? (
              <p className="text-xl my-auto text-center md:col-span-3 lg:col-span-5 xl:col-span-5 dark:text-gray-400">
                <Circle className="animate-spin" />
              </p>
            ) : length > 0 ? allSubscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription._id}
                subscription={subscription}
                onEdit={(id) => handleEdit(id)}
                onCancel={(id) => handleCancel(id)}
                onRenew={(id) => handleRenew(id)}
              />
            )) : (
              <p className="text-2xl min-h-screen w-full flex justify-center items-center md:col-span-3 lg:col-span-5 xl:col-span-5 dark:text-slate-100">
                you don't have {length === 0 ? "any" : status} subscriptions yet
              </p>
            )}
          </div>

          {paginationData && length > 0 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <span className="text-sm dark:text-gray-300">
                Page {currentPage} of {paginationData.pages}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePrevPage}
                  disabled={currentPage <= 1 || isLoading}
                  className="dark:border-gray-600 dark:text-gray-300"
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={currentPage >= paginationData.pages || isLoading}
                  className="dark:border-gray-600 dark:text-gray-300"
                >
                  Next
                </Button>
              </div>
              <select
                className="border rounded p-1 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}>
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
                <option value="50">50 per page</option>
              </select>
              <span className="text-sm dark:text-gray-300">
                Showing {allSubscriptions.length} of {paginationData.total} items
              </span>
            </div>
          )}
        </div>


      </motion.main>
    </>
  )
}

export default Subscriptions

{/* {length > 0 ? (allSubscriptions.map((subscription) => (<SubscriptionCard
            key={subscription._id}
            subscription={subscription}
            onEdit={(id) => handleEdit(id)}
            onCancel={(id) => handleCancel(id)}
            onRenew={(id) => handleRenew(id)}
          />))) : (<p className="text-xl my-auto text-center md:col-span-3 lg:col-span-5 xl:col-span-5 dark:text-gray-400">you don't have {length == 0 ? "Any" : status} subscriptions yet</p>)} */}

// ? allSubscriptions.map((subscription) => (
//   <SubscriptionCard
//     key={subscription._id}
//     subscription={subscription}
//     onEdit={(id) => handleEdit(id)}
//     onCancel={(id) => handleCancel(id)}
//     onRenew={(id) => handleRenew(id)}
//   />
// ))