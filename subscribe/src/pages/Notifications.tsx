import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { useUpdateEmailNotificationMutation } from "@/services/users";

import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/Auth";

const Notifications = () => {
    const { user } = useAuth()
    const [emailNotifications, setEmailNotifications] = useState(user?.notify ? "Enabled" : "Disabled");

    const [updateEmailNotification] = useUpdateEmailNotificationMutation()

    const handleNotification = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = emailNotifications === "Enabled";
        const change = value ? "Enabled" : "Disabled";
        console.log(emailNotifications);
        updateEmailNotification({ _id: user?._id as string, notify: value });
        toast.success(`Notifications are ${change}`)
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 dark:text-gray-200">Notifications</h1>
            <div className="mb-1">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 dark:text-gray-300">
                    Notification Preferences
                </h2>
                <form onSubmit={handleNotification} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                            Email Notifications
                        </label>
                        <select
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={emailNotifications}
                            onChange={(e) => setEmailNotifications(e.target.value)}>
                            <option value="Enabled">Enabled</option>
                            <option value="Disabled">Disabled</option>
                        </select>
                    </div>
                    {/* Uncomment if needed
            <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                    SMS Notifications
                </label>
                <select
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                    <option>Enabled</option>
                    <option>Disabled</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                    Push Notifications
                </label>
                <select
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                    <option>Enabled</option>
                    <option>Disabled</option>
                </select>
            </div>
            */}
                    <div className="flex justify-end space-x-4 mt-5">
                        <Button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Notifications