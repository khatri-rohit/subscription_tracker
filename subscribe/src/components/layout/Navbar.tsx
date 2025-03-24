import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Settings } from "lucide-react"
import { useAppSelector } from '@/app/store';

const Navbar = () => {

    const navigate = useNavigate();
    const isAuth = useAppSelector((state) => state.isAuth);

    return (
        <header>
            <nav className="shadow-lg">
                <div className="navbar flex items-center justify-between p-3">
                    <div className="nav-left flex items-end justify-between">
                        <div className="flex items-center">
                            <img className="object-cover mx-1" src="/img/icon.png" alt="brand-icon" />
                            <NavLink to={"/"}>
                                <h1 className="text-4xl mx-1">SubScribe</h1>
                            </NavLink>
                        </div>
                        <div className="navbar px-6">
                            {isAuth && (
                                <NavLink to={"/dashboard"} className={({ isActive }) => isActive ? "text-xl text-[#636AE8] font-medium relative after:absolute after:-bottom-[13px] after:w-[115%] after:-left-[6.5px] after:block after:h-[3px] after:rounded-b-4xl after:bg-[#636AE8]" : "text-xl"}>
                                    Dashboard
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <div className="nav-right flex items-center justify-between gap-x-2">
                        {
                            isAuth ?
                                (<>
                                    <Settings />
                                    <div className="image">
                                        <img src="/img/blank-avatar.webp" alt="avatar" className="object-contain w-10 rounded-full" />
                                    </div>
                                </>) :
                                (<Button className="bg-[#636AE8] hover:bg-[#565ba9] transition-all duration-300 cursor-pointer" onClick={() => navigate('/signup')}>
                                    <img src="/img/newsletter.png" /> SignUp
                                </Button>)
                        }

                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar