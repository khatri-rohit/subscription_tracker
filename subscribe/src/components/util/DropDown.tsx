import { useAppDispatch } from "@/app/store"
import { useAuth } from "@/context/Auth";
import { isAuthenticated } from "@/features/slice"
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

type Props = {
    setOpen: (open: boolean) => void
}

const DropDown = ({ setOpen }: Props) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const { apiUrl } = useAuth()

    const signOut = async () => {
        axios.defaults.withCredentials = true
        await axios.post(`${apiUrl}/auth/sign-out`)
        dispatch(isAuthenticated(false))
        setOpen(false)
        setTimeout(() => navigate('/'), 500)
    }

    return (
        <div className="absolute right-3 top-16 bg-gray-300 w-[200px] h-[120px] rounded-lg border p-3 text-end flex flex-col justify-around items-end text-gray-800 shadow-[3px] cursor-pointer">
            <NavLink to={'/dashboard/settings'}
                className="text-xl"
                onClick={() => {
                    setOpen(false);
                }}>
                Settings
            </NavLink>
            <ModeToggle />
            <p className="w-full text-[1em] border-t border-black"
                onClick={signOut}>
                Sign Out
            </p>
        </div>
    )
}

export default DropDown