import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";

import { useUpdateEmailNotificationMutation } from "@/services/users";
import { useAuth } from "@/context/Auth";

const Notifications = () => {
    const { user } = useAuth()
    const [emailNotifications, setEmailNotifications] = useState(user?.notify ? "Enabled" : "Disabled");
    const [updateEmailNotification] = useUpdateEmailNotificationMutation()

    const handleNotification = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = emailNotifications === "Enabled";
        const change = value ? "Enabled" : "Disabled";
        updateEmailNotification({ _id: user?._id as string, notify: value });
        toast.success(`Notifications are ${change}`)
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800 rounded-lg"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h1
                className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 dark:text-gray-200"
                variants={itemVariants}
            >
                Notifications
            </motion.h1>
            <motion.div
                className="mb-1"
                variants={itemVariants}
            >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 dark:text-gray-300">
                    Notification Preferences
                </h2>
                <form onSubmit={handleNotification} className="space-y-4">
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                    >
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            Email Notifications
                        </label>
                        <select
                            className="mt-1 block w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                                     dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300
                                     transition-all duration-200 ease-in-out"
                            value={emailNotifications}
                            onChange={(e) => setEmailNotifications(e.target.value)}
                        >
                            <option value="Enabled">Enabled</option>
                            <option value="Disabled">Disabled</option>
                        </select>
                    </motion.div>

                    <motion.div
                        className="flex justify-end space-x-4 mt-5"
                        variants={itemVariants}
                    >
                        <motion.button
                            className="w-full sm:w-auto px-4 sm:px-6 py-2 text-white bg-blue-600 rounded-lg 
                                     hover:bg-blue-700 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Save Changes
                        </motion.button>
                    </motion.div>
                </form>
            </motion.div>
        </motion.div>
    )
}

export default Notifications;