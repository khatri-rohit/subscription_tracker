import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"

import { Button } from "../ui/button"

const HeroSection = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-[90vh] relative z-10 px-4 sm:px-6 lg:px-8">
            <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 object-cover w-full h-full -z-10 backdrop-opacity-90"
                src="/img/hero.png"
                alt="living-room"
            />

            <div className="container mx-auto min-h-[90vh] flex flex-col items-start justify-center">
                <div className="w-full md:w-3/4 lg:w-2/3 py-12 md:py-20 lg:py-32 text-white">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-5 leading-tight">
                        Master Your Subscription
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-xl sm:text-2xl leading-7 mb-6 sm:mb-8 opacity-90">
                        Effortlessly track and manage all your subscriptions in one place.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}>
                        <Button
                            className="bg-[#636AE8] dark:text-white hover:bg-[#565ba9] 
                                     transition-all duration-300 cursor-pointer text-base sm:text-lg 
                                     font-[400] tracking-wide px-6 py-3 sm:px-8 sm:py-4
                                     hover:scale-105 transform">
                            <NavLink to={"/signup"}>
                                Get Started
                            </NavLink>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}

export default HeroSection