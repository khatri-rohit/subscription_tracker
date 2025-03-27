import { useAppDispatch } from "@/app/store"
import { isAuthenticated } from "@/features/slice"
import { useNavigate } from "react-router-dom";

type Props = {
    setOpen: (open: boolean) => void
}

const DropDown = ({ setOpen }: Props) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const signOut = async () => {
        localStorage.clear()
        await new Promise(resolve => setTimeout(() => {
            dispatch(isAuthenticated(false));
            setOpen(false);
            navigate('/');
        }, 100));
    }

    return (
        <div className="absolute right-3 top-16 bg-gray-300 w-[200px] h-[100px] rounded-lg border p-3 text-end flex flex-col justify-around text-gray-800 shadow-[3px] cursor-pointer">
            <p className="text-xl">Settings</p>
            <p className="text-[1em] border-t border-black" onClick={signOut}>Sign Out</p>
        </div>
    )
}

export default DropDown