import { useEffect, useState } from "react";
import { List, Music, Podcast, Search, Video } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/app/store";
import { useGetAllSubscriptionsQuery } from '@/services/subscriptions'
import { setSubscription } from '@/features/slice'
import { useAuth } from "@/context/Auth.tsx";

import { Input } from "@/components/ui/input"

import SubsOverview from "@/components/common/SubsOverview.tsx";
import { FadeLoader } from "react-spinners";
import { Subscription } from "@/lib/types";

const Dashborad = () => {

  const { user } = useAuth()
  const dispatch = useAppDispatch()
  const { subscriptions } = useAppSelector((state) => state.rootReducers)

  const [filterSubscirpion, setFilterSubscription] = useState<Subscription[]>([]);

  const {
    isLoading,
    data,
    // error,
    isError
  } = useGetAllSubscriptionsQuery(user?._id, {
    skip: !user?._id.trim(),
  });

  // const isLoading = true
  // const isError = true

  useEffect(() => {
    // console.log("isLoading -> " + isLoading);
    // console.log("isError -> " + isError);
    // console.log("Error -> " + error);

    if (data !== undefined) {
      dispatch(setSubscription(data))
      setFilterSubscription(data)
    }
  }, [data])

  return (
    <section className="p-10">
      <div className="p-2 space-y-5 w-fit">
        <h3 className="text-3xl">Subscription Overview</h3>
        {/* Search Overview */}
        <div className="flex items-center gap-x-2 w-full">
          <div className="border-[.12em] border-[#BCC1CA] min-w-[75%] flex items-center rounded-lg shadow-2xs">
            <Search className="mx-2" />
            <Input className="border-none md:text-xl shadow-none"
              placeholder="Search Subscription" />
          </div>
          <div className="tags text-[1em] flex items-center justify-between gap-x-2">
            <span className="bg-gray-100 font-light px-2 rounded-2xl">
              Active
            </span>
            <span className="bg-blue-100 text-blue-500 font-light px-2 rounded-2xl">
              Pending
            </span>
            <span className="bg-red-100 text-red-500 font-light px-2 rounded-2xl">
              Expired
            </span>
          </div>
        </div>
      </div>

      {/* All Subscriptions */}
      <div className={isError || isLoading ? "h-52 flex items-center justify-center" : "grid grid-cols-2 md:gap-5 gap-2 lg:gap-3 md:grid-cols-3 lg:grid-cols-4"}>
        {isError && <p className="text-2xl text-red-500">Something Went Wrong</p>}
        {!isError && (isLoading ? <FadeLoader
          color="#141010"
          height={19}
          width={6}
        /> :
          subscriptions?.map((subscription) => (
            <SubsOverview key={subscription._id} name={subscription.name} renewalDate={subscription.renewalDate} status={subscription.status} />
          )))
        }
      </div>

      <div className="p-2 space-y-5 mt-8">
        {/* Search Overview */}
        <div className="p-2 space-y-5 w-fit">
          <h3 className="text-3xl">Filter & Search Subscriptions</h3>
          {/* Search Overview */}
          <div className="flex items-center gap-x-2 w-full">
            <div className="border-[.12em] border-[#BCC1CA] w-full flex items-center rounded-lg shadow-2xs">
              <Search className="mx-2" />
              <Input className="border-none md:text-xl shadow-none"
                placeholder="Search Subscription" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-evenly w-1/2 gap-1">
          <p className="text-lg flex justify-center items-center w-[25%] gap-x-1 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[115%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]">
            <List color="#BBBBBB" />All
          </p>
          <p className="text-lg flex justify-center items-center w-[25%] gap-x-1 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[115%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]">
            <Music color="#BBBBBB" />Music
          </p>
          <p className="text-lg flex justify-center items-center w-[25%] gap-x-1 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[115%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]">
            <Video color="#BBBBBB" /> Video
          </p>
          <p className="text-lg flex justify-center items-center w-[25%] gap-x-1 relative hover:after:absolute hover:after:-bottom-[13px] hover:after:w-[115%] hover:after:-left-[6.5px] hover:after:block hover:after:h-[3px] hover:after:rounded-b-4xl hover:after:bg-[#636AE8]">
            <Podcast color="#BBBBBB" />Podcasts
          </p>
        </div>
      </div>

      {/* All Subscriptions */}
      <div className={!isError || !isLoading ? "grid grid-cols-2 md:gap-5 gap-2 lg:gap-3 md:grid-cols-3 lg:grid-cols-4" : "h-52 flex items-center justify-center"}>
        {isError && <p className="text-2xl text-red-500">Something Went Wrong</p>}
        {!isError && isLoading ? <FadeLoader
          color="#141010"
          height={19}
          width={6}
        /> :
          filterSubscirpion?.map((subscription) => (
            <SubsOverview key={subscription._id} name={subscription.name} renewalDate={subscription.renewalDate} status={subscription.status} />
          ))
        }
      </div>

    </section>
  )
}

export default Dashborad