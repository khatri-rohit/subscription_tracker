import { NavLink } from "react-router-dom"
import { Button } from "../ui/button"

const UnlockPremium = () => {
    return (
        <div className="py-24">
            <div className="w-8/12 bg-[#e5e6ff] dark:bg-gray-800 m-auto text-center py-16 rounded-xl transition-colors duration-500">
                <h5 className="text-2xl text-[#454efc] dark:text-purple-400 font-semibold">
                    Unlock Premium Content
                </h5>
                <p className="py-3 text-gray-800 dark:text-gray-300">
                    Join now to access exclusive articles and features tailored just for you.
                </p>
                <Button className="bg-[#636AE8] hover:bg-[#565ba9] dark:bg-purple-600 dark:hover:bg-purple-700 text-white transition-all duration-300 cursor-pointer">
                    <NavLink to={"/signup"}>
                        Sign Up Now
                    </NavLink>
                </Button>
            </div>
        </div>

    )
}

export default UnlockPremium