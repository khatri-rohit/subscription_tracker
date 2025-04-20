import { motion } from "motion/react"
import { NavLink } from "react-router-dom"

import { Button } from "../ui/button"

const UnlockPremium = () => {
    return (
        <div className="py-12 md:py-24 px-4 md:px-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-10/12 lg:w-8/12 bg-[#e5e6ff] dark:bg-gray-800 m-auto text-center py-8 md:py-16 px-4 rounded-xl transition-colors duration-500"
            >
                <motion.h5
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl text-[#454efc] dark:text-purple-400 font-semibold">
                    Unlock Premium Content
                </motion.h5>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="py-3 text-sm md:text-base text-gray-800 dark:text-gray-300"
                >
                    Join now to access exclusive articles and features tailored just for you.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <Button className="bg-[#636AE8] hover:bg-[#565ba9] dark:bg-purple-600 dark:hover:bg-purple-700 text-white transition-all duration-300 cursor-pointer">
                        <NavLink to={"/signup"}>
                            Sign Up Now
                        </NavLink>
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default UnlockPremium