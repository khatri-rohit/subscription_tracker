import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { List, Music, Search, Sofa, Video, X } from "lucide-react"
import { FadeLoader } from "react-spinners";

import { Category, Subscription, SubsStatus, Tabs } from "@/lib/types";
import SubsOverview from "@/components/common/SubsOverview.tsx";
import { setSubscription } from '@/features/slice'
import { useGetAllSubscriptionsQuery } from '@/services/subscriptions'
import { useAppDispatch } from "@/app/store";
import { useAuth } from "@/context/Auth.tsx";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

const tabs: Tabs[] = [
  {
    category: "All",
    name: "All",
    idle: "text-lg flex justify-center items-center w-[25%] gap-x-1 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[100%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]",
    active: "text-lg flex justify-center items-center w-[25%] gap-x-1 relative after:absolute after:-bottom-[13px] after:w-[100%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]",
    icon: <List color="#BBBBBB" />
  },
  {
    category: "entertainment",
    name: "Entertainment",
    idle: "text-lg flex justify-center items-center w-[25%] gap-x-1 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[100%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]",
    active: "text-lg flex justify-center items-center w-[25%] gap-x-1 relative after:absolute after:-bottom-[13px] after:w-[100%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]",
    icon: <Music color="#BBBBBB" />
  },
  {
    category: "sports",
    name: "Sports",
    idle: "text-lg flex justify-center items-center w-[25%] gap-x-1 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[100%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]",
    active: "text-lg flex justify-center items-center w-[25%] gap-x-1 relative after:absolute after:-bottom-[13px] after:w-[100%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]",
    icon: <Video color="#BBBBBB" />
  },
  {
    category: "lifestyle",
    name: "Lifestyle",
    idle: "text-lg flex justify-center items-center w-[25%] gap-x-1 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[100%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]",
    active: "text-lg flex justify-center items-center w-[25%] gap-x-1 relative after:absolute after:-bottom-[13px] after:w-[100%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]",
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
  } = useGetAllSubscriptionsQuery(user?._id, {
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

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length > 0) {
      const subs = subscriptions.filter((m) => m.name.toLowerCase().includes(search));
      setSubscriptions(subs);
    }
  }

  const handleChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) {
      setSearch(value)
      setSubscriptions(data as Subscription[])
    } else {
      setSearch(value)
    }
  }

  const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) {
      setFilterSearch(value)
      setFilterSubscription(data as Subscription[])
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
    setSubscriptions(data as Subscription[]);
  }

  const handleX2 = () => {
    setFilterSearch("");
    setFilterSubscription(data as Subscription[]);
  }

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setSubscription(data))
      setSubscriptions(data);
      setFilterSubscription(data);
      setLength(data.length);
      // console.log(data);
    }
  }, [data, dispatch])

  return (
    <section className="p-10">
      <div className="p-2 space-y-5 w-fit">
        <h3 className="text-3xl">Subscription Overview</h3>
        {/* Search Overview */}
        <div className="flex items-center gap-x-2 w-full">
          <form onSubmit={handleSearch} className="border-[.12em] border-[#BCC1CA] min-w-[75%] flex items-center rounded-lg shadow-2xs">
            <Search className="mx-2" />
            <Input className="border-none md:text-xl shadow-none"
              placeholder="Search Subscription"
              value={search}
              onChange={handleChange1} />
            {search.length > 0 && (<X className="cursor-pointer mr-1.5 p-0.5" onClick={handleX1} />)}
          </form>

          {(data?.length as number) > 0 && (<div className="tags text-[1em] flex items-center justify-between gap-x-2">
            <span className={`bg-gray-100 font-light px-2 rounded-2xl cursor-pointer ${status === 'active' ? "font-semibold" : "font-light"}`}
              onClick={() => handleChangeStatus("active")}>
              Active
            </span>
            <span className={`bg-blue-100 text-blue-500 px-2 rounded-2xl cursor-pointer ${status === 'cancelled' ? "font-semibold" : "font-light"}`}
              onClick={() => handleChangeStatus("cancelled")}>
              Pending
            </span>
            <span className={`bg-red-100 text-red-500 px-2 rounded-2xl cursor-pointer ${status === 'expired' ? "font-semibold" : "font-light"}`}
              onClick={() => handleChangeStatus("expired")}>
              Expired
            </span>
          </div>)}
        </div>
      </div>

      {/* All Subscriptions */}
      <div className={isError || isLoading ? "h-52 flex items-center justify-center" : "grid grid-cols-2 md:gap-5 gap-2 lg:gap-3 md:grid-cols-3 lg:grid-cols-4 min-h-56"}>
        {isError && <p className="text-2xl text-red-500 my-auto text-center">Something Went Wrong</p>}
        {!isError && (isLoading ? <FadeLoader
          color="#141010"
          height={19}
          width={6}
        /> :
          length > 0 ? (subscriptions?.map((subscription) => {
            if (subscription.status === status) {
              return (<SubsOverview key={subscription._id} name={subscription.name} renewalDate={subscription.renewalDate} status={subscription.status} />)
            } else if (status === "All") {
              return <SubsOverview key={subscription._id} name={subscription.name} renewalDate={subscription.renewalDate} status={subscription.status} />
            }
          })) : <p className="text-xl my-auto text-center md:col-span-3 lg:col-span-4">You don't have {length == 0 ? "Any" : status} subscriptions</p>)
        }
        {data?.length === 0 && <NavLink to={'/subscription/create-subs'}
          className="text-xl my-auto text-center md:col-span-3 lg:col-span-4">
          <Button variant={"secondary"}
            className="text-xl rounded-lg cursor-pointer p-5">
            Create Reminder Now
          </Button>
        </NavLink>}
      </div>

      <div className="p-2 space-y-5 mt-8 mb-3">
        {/* Search Overview */}
        <div className="p-2 space-y-5 w-fit">
          <h3 className="text-3xl">Filter & Search Subscriptions</h3>
          {/* Search Overview */}
          <div className="flex items-center gap-x-2 w-full">
            <form onSubmit={handleFilterSearch} className="border-[.12em] border-[#BCC1CA] w-full flex items-center rounded-lg shadow-2xs">
              <Search className="mx-2" />
              <Input value={filterSearch}
                // onChange={(e) => setFilterSearch(e.target.value)}
                onChange={handleChange2}
                className="border-none md:text-xl shadow-none"
                placeholder="Search Subscription" />
              {filterSearch.length > 0 &&
                (<X className="cursor-pointer mr-1.5 p-0.5" onClick={handleX2} />)}
            </form>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-evenly w-1/2 gap-1">
          {
            tabs.map((tab, _) => (
              <p key={_} className={tab.category === category ? tab.active : tab.idle}
                onClick={() => setCategory(tab.category)} >
                {tab.icon}{tab.name}
              </p>
            ))
          }
        </div>
      </div>

      {/* All Subscriptions */}
      <div className={isError || isLoading ? "h-52 flex items-center justify-center" : "grid grid-cols-2 md:gap-5 gap-2 lg:gap-3 md:grid-cols-3 lg:grid-cols-4 min-h-56"}>
        {isError && <p className="text-2xl text-red-500">Something Went Wrong</p>}
        {!isError && (isLoading ? <FadeLoader
          color="#141010"
          height={19}
          width={6}
        /> :
          filterSubscirpion.length > 0 && filterSubscirpion?.map((subscription) => {
            if (subscription.category === category) {
              return <SubsOverview key={subscription._id} name={subscription.name}
                renewalDate={subscription.renewalDate} status={subscription.status} />
            } else if (category === 'All') {
              return <SubsOverview key={subscription._id} name={subscription.name}
                renewalDate={subscription.renewalDate} status={subscription.status} />
            }
          }))
        }
        {
          filterSubscirpion.length === 0 && (<p className="text-xl my-auto text-center md:col-span-3 lg:col-span-4">You don't have {length == 0 ? "Any" : category} subscriptions</p>)
        }
      </div>

    </section >
  )
}

export default Dashborad