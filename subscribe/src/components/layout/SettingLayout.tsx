import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'

const SettingLayout = () => {
    const location = useLocation()
    const [isNavOpen, setIsNavOpen] = useState(false)

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    }

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    }

    const menuVariants = {
        hidden: { height: 0, opacity: 0 },
        visible: {
            height: "auto",
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" }
        }
    }

    // console.log(location.pathname.split('/'));

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 dark:from-zinc-800 dark:via-gray-800 dark:to-slate-900 p-4 sm:p-6 md:p-8 lg:p-10"
        >
            <motion.div
                variants={childVariants}
                className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 sm:p-6 md:p-8"
            >
                <motion.h1
                    variants={childVariants}
                    className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-6"
                >
                    Settings
                </motion.h1>
                <motion.p
                    variants={childVariants}
                    className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl"
                >
                    Customize your account settings, profile, and notifications here.
                    Choose an option from the sidebar to begin.
                </motion.p>

                <div className="flex flex-col md:flex-row md:space-x-6 lg:space-x-12 space-y-6 md:space-y-0">
                    {/* Sidebar Navigation */}
                    <motion.div
                        variants={childVariants}
                        className="w-full md:w-1/4 bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6"
                    >
                        {/* Mobile Toggle Button */}
                        <button
                            onClick={() => setIsNavOpen(!isNavOpen)}
                            className="w-full flex items-center justify-between text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4 md:hidden"
                        >
                            <span>Quick Navigation</span>
                            <motion.svg
                                animate={{ rotate: isNavOpen ? 180 : 0 }}
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                        </button>

                        {/* Desktop Title */}
                        <h2 className="hidden md:block text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
                            Quick Navigation
                        </h2>

                        {/* Navigation Links */}
                        <AnimatePresence>
                            <motion.ul
                                variants={menuVariants}
                                initial="hidden"
                                animate={isNavOpen ? "visible" : "hidden"}
                                className="space-y-3 sm:space-y-4 md:!h-auto md:!opacity-100"
                            >
                                {[
                                    { path: 'profile', label: 'Profile', color: 'green' },
                                    { path: '', label: 'Account', color: 'indigo' },
                                    { path: 'notifications', label: 'Notifications', color: 'yellow' }
                                ].map((item) => (
                                    <motion.li
                                        key={item.path}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <NavLink
                                            onClick={() => setIsNavOpen(false)} // Close menu on mobile after clicking
                                            className={(location.pathname.split('/')[3] === item.path || location.pathname.split('/').length === 2) ?
                                                `flex items-center text-base sm:text-lg text-white bg-${item.color}-600 transition-all py-2 px-4 rounded-md hover:bg-${item.color}-700 dark:bg-${item.color}-500 dark:hover:bg-${item.color}-600` :
                                                `flex items-center text-base sm:text-lg text-gray-800 hover:text-${item.color}-600 dark:hover:text-${item.color}-500 transition-all py-2 px-4 rounded-md hover:bg-${item.color}-50 dark:text-gray-300`
                                            }
                                            to={`/dashboard/settings${item.path ? '/' + item.path : ''}`}
                                        >
                                            <span>{item.label}</span>
                                        </NavLink>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </AnimatePresence>
                    </motion.div>

                    {/* Main Content Area */}
                    <motion.div
                        variants={childVariants}
                        className="flex-1 bg-white dark:bg-gray-800 shadow-md dark:border-2 border-white rounded-lg relative p-4 sm:p-6"
                    >
                        <Outlet />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default SettingLayout