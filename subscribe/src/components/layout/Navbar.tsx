import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react";

import { useAppSelector } from '@/app/store';

import { Button } from "../ui/button"
import Setting from "../util/Setting";
import DropDown from "../util/DropDown";

const Navbar = () => {

    const navigate = useNavigate();
    const isAuth = useAppSelector((state) => state.isAuth);
    const [open, setOpen] = useState<boolean>(false);

    return (
        <header>
            {open && (<Setting setOpen={setOpen}>
                <DropDown setOpen={setOpen} />
            </Setting>)}
            <nav className="shadow-lg">
                <div className="navbar flex items-center justify-between p-3">
                    <div className="nav-left flex items-end justify-between">
                        <div className="flex items-center">
                            <img className="object-cover mx-1" src="/img/icon.png" alt="brand-icon" />
                            <NavLink to={isAuth ? "/dashboard" : "/"}>
                                <h1 className="text-4xl mx-1">SubScribe</h1>
                            </NavLink>
                        </div>
                        <div className="navbar px-6 z-0 space-x-5">
                            {isAuth && (
                                <>
                                    <NavLink to={"/dashboard"}
                                        className={({ isActive }) => isActive ? "text-xl text-[#636AE8] font-medium relative after:absolute after:-bottom-[13px] after:w-[115%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]" : "text-xl"}>
                                        Dashboard
                                    </NavLink>
                                    <NavLink to={"/subscription"}
                                        className={({ isActive }) => isActive ? "text-xl text-[#636AE8] font-medium relative after:absolute after:-bottom-[13px] after:w-[115%] after:-left-[8.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]" : "text-xl"}>
                                        Subscriptions
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="nav-right flex items-center justify-between gap-x-4 ">
                        {
                            isAuth ?
                                (<>
                                    {/* <Settings /> */}
                                    <div className="image z-10">
                                        <img src="/img/blank-avatar.webp" alt="avatar"
                                            onClick={() => setOpen(prev => !prev)}
                                            className="object-contain w-10 rounded-full cursor-pointer" />
                                    </div>
                                </>) :
                                (
                                    <Button className="bg-[#636AE8] hover:bg-[#565ba9] transition-all duration-300 cursor-pointer"
                                        onClick={() => navigate('/signup')}>
                                        <img src="/img/newsletter.png" /> SignUp
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