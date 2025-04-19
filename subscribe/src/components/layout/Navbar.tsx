import { useState } from "react";
import { NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react";
 
import { useAppSelector } from '@/app/store';
import ProfileBtn from "../Profile-btn";

const Navbar = () => {
    const { isAuth } = useAppSelector((state) => state.rootReducers);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="dark:bg-[#1c1d2d] dark:text-white">
            <nav className="dark:shadow-2xs dark:shadow-white shadow-lg">
                <div className="navbar flex items-center justify-between p-3 border-b-white border-b-2">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <img className="w-8 h-8 object-cover mx-1" src={'/img/icon.png'} alt="profile" />
                        <NavLink to={isAuth ? "/dashboard" : "/"}>
                            <h1 className="text-2xl md:text-4xl mx-1">Subscribe</h1>
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-5">
                        {isAuth && (
                            <>
                                <NavLink to={"/dashboard"}
                                    className={({ isActive }) => isActive ? 
                                        "text-lg lg:text-xl text-[#636AE8] dark:text-[#838aff] font-medium relative after:absolute after:-bottom-[13px] after:w-[115%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#838aff]" 
                                        : "text-lg lg:text-xl dark:text-gray-300"}>
                                    Dashboard
                                </NavLink>
                                <NavLink to={"/subscription"}
                                    className={({ isActive }) => isActive ? 
                                        "text-lg lg:text-xl text-[#636AE8] dark:text-[#838aff] font-medium relative after:absolute after:-bottom-[13px] after:w-[115%] after:-left-[8.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#838aff]" 
                                        : "text-lg lg:text-xl dark:text-gray-300"}>
                                    Subscriptions
                                </NavLink>
                            </>
                        )}
                        
                        {/* Desktop Auth Button */}
                        <div className="flex items-center justify-between gap-x-4">
                            {isAuth ? (
                                <ProfileBtn />
                            ) : (
                                <NavLink to={"/signin"}
                                    className="bg-[#636AE8] text-white hover:bg-[#565ba9] transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 text-base lg:text-lg font-medium px-4 py-2 rounded-lg">
                                    <img className="w-5 h-5" src="/img/newsletter.png" alt="signin" /> SignIn
                                </NavLink>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden px-4 pt-2 pb-3 space-y-2 bg-white dark:bg-[#1c1d2d] border-b dark:border-gray-700">
                        {isAuth && (
                            <>
                                <NavLink to={"/dashboard"}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => 
                                        `block px-3 py-2 rounded-md text-base font-medium ${
                                            isActive ? "text-[#636AE8] dark:text-[#838aff]" : "dark:text-gray-300"
                                        }`}>
                                    Dashboard
                                </NavLink>
                                <NavLink to={"/subscription"}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => 
                                        `block px-3 py-2 rounded-md text-base font-medium ${
                                            isActive ? "text-[#636AE8] dark:text-[#838aff]" : "dark:text-gray-300"
                                        }`}>
                                    Subscriptions
                                </NavLink>
                            </>
                        )}
                        
                        {/* Mobile Auth Button */}
                        {!isAuth && (
                            <NavLink to={"/signin"}
                                onClick={() => setIsOpen(false)}
                                className="block w-full bg-[#636AE8] text-white hover:bg-[#565ba9] transition-all duration-300 cursor-pointer text-center py-2 rounded-lg">
                                <span className="flex items-center justify-center gap-1.5">
                                    <img className="w-5 h-5" src="/img/newsletter.png" alt="signin" /> SignIn
                                </span>
                            </NavLink>
                        )}
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar