import { formatDate } from "@/lib/utils"
import { motion } from 'motion/react'

interface Props {
    name: string,
    status: 'active' | 'cancelled' | 'expired' | undefined,
    renewalDate: Date
}

// Animation variants for consistent animations
const containerVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
            scale: {
                type: "spring",
                damping: 15,
                stiffness: 100
            }
        }
    },
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.2
        }
    }
}

const SubsOverview = ({ name, renewalDate, status }: Props) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="p-4 sm:p-5 rounded-lg bg-white dark:bg-gray-800 shadow-sm 
                      hover:shadow-md transition-shadow duration-200 
                      border border-gray-100 dark:border-gray-700 h-fit">
            <div className="space-y-3">
                <motion.p
                    className="text-lg sm:text-xl font-medium truncate"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    {name}
                </motion.p>

                <motion.p
                    className={`text-base sm:text-lg font-medium ${status === 'active'
                        ? "text-green-500"
                        : status === 'expired'
                            ? "text-red-500"
                            : "text-gray-500/80"
                        }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {status}
                </motion.p>

                <motion.p
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Renews: {formatDate(renewalDate)}
                </motion.p>
            </div>
        </motion.div>
    )
}

export default SubsOverview