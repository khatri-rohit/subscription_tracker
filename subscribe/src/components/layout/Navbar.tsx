import { NavLink } from "react-router-dom"

import { useAppSelector } from '@/app/store';
import { Button } from "../ui/button"
import ProfileBtn from "../Profile-btn";

const Navbar = () => {

    const { isAuth } = useAppSelector((state) => state.rootReducers);

    return (
        <header className="dark:bg-[#1c1d2d] dark:text-white">
            <nav className="dark:shadow-2xs dark:shadow-white shadow-lg">
                <div className="navbar flex items-center justify-between p-3 border-b-white border-b-2">
                    <div className="nav-left flex items-end justify-between">
                        <div className="flex items-center">
                            <img className="object-cover mx-1" src={'/img/icon.png'} alt="profile" />
                            <NavLink to={isAuth ? "/dashboard" : "/"}>
                                <h1 className="text-4xl mx-1">Subscribe</h1>
                            </NavLink>
                        </div>
                        <div className="navbar px-6 space-x-5">
                            {isAuth && (
                                <>
                                    <NavLink to={"/dashboard"}
                                        className={({ isActive }) => isActive ? "text-xl text-[#636AE8] dark:text-[#838aff] font-medium relative after:absolute after:-bottom-[13px] after:w-[115%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#838aff]" : "text-xl dark:text-gray-300"}>
                                        Dashboard
                                    </NavLink>
                                    <NavLink to={"/subscription"}
                                        className={({ isActive }) => isActive ? "text-xl text-[#636AE8]  dark:text-[#838aff] font-medium relative after:absolute after:-bottom-[13px] after:w-[115%] after:-left-[8.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#838aff]" : "text-xl dark:text-gray-300"}>
                                        Subscriptions
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="nav-right flex items-center justify-between gap-x-4">
                        {
                            isAuth ?
                                (<>
                                    <ProfileBtn />
                                </>) :
                                (

                                    <Button className="bg-[#636AE8] dark:text-white hover:bg-[#565ba9] transition-all duration-300 cursor-pointer">
                                        <NavLink to={"/signin"} className="flex items-center justify-center gap-1.5 text-lg font-medium">
                                            <img src="/img/newsletter.png" /> SignIn
                                        </NavLink>
                                    </Button>
                                )
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar