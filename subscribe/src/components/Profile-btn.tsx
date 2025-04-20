import { MonitorCog, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from 'motion/react'
import axios, { AxiosError } from "axios";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuSub,
    DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu"

import { useAuth } from "@/context/Auth";
import { useAppDispatch } from "@/app/store";
import { isAuthenticated } from "@/features/slice";
import { useTheme } from "./theme-provider";

function ProfileBtn() {
    const navigation = useNavigate();
    const { setTheme } = useTheme()
    const { user, imageUrl } = useAuth()
    const img = user?.profileImage ? (user.profileImage.includes("google") || user?.profileImage.includes("github")) ? user?.profileImage : (imageUrl + "/" + user?.profileImage) : '/img/blank-avatar.webp';
    console.log(img);

    const dispatch = useAppDispatch();
    const { apiUrl } = useAuth()

    const signOut = async () => {
        try {
            axios.defaults.withCredentials = true
            await axios.post(`${apiUrl}/auth/sign-out`)
            dispatch(isAuthenticated(false))
            setTimeout(() => navigation('/'), 1000)
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(axiosError.cause);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.div className="image z-10 rounded-full"
                    whileHover={{ y: -2, boxShadow: "3px 3px 1px #212121" }}
                    whileTap={{ scale: 1.1, transition: { duration: .3 } }}>
                    <img src={img} alt="avatar"
                        className="object-cover w-10 h-10 rounded-full cursor-pointer" />
                </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-3">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigation("/dashboard/settings/profile")}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigation("/dashboard/settings")}>
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem className="flex justify-between"
                                onClick={() => setTheme("light")}>
                                Light <Sun />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-between"
                                onClick={() => setTheme("dark")}>
                                Dark <Moon />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-between"
                                onClick={() => setTheme("system")}>
                                System <MonitorCog />
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <a className="w-full"
                        href="https://github.com/khatri-rohit/subscription_tracker">
                        GitHub
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <a className="w-full"
                        href="mailto:rohitkhatri.dev@gmail.com"
                        rel="noopener noreferrer"
                        aria-label="Send support email">
                        Support
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileBtn;