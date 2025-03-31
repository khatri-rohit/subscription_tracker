import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/Auth";
import { useUpdateEmailNotificationMutation } from "@/services/users";
import { FormEvent, useState } from "react";

const Notifications = () => {
    const { user } = useAuth()
    const [emailNotifications, setEmailNotifications] = useState("Enabled");

    const [updateEmailNotification] = useUpdateEmailNotificationMutation()

    const handleNotification = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = emailNotifications === "Enabled";
        console.log(emailNotifications);
        updateEmailNotification({ _id: user?._id as string, notify: value });
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Notifications</h1>
            <div className="mb-1">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Notification Preferences
                </h2>
                <form onSubmit={handleNotification} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Email Notifications
                        </label>
                        <select
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={emailNotifications}
                            onChange={(e) => setEmailNotifications(e.target.value)}>
                            <option value="Enabled">Enabled</option>
                            <option value="Disabled">Disabled</option>
                        </select>
                    </div>
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-600">
                            SMS Notifications
                        </label>
                        <select
                            className="mt-1 block w-full px-4 py-2 border border-gray-300
               rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Enabled</option>
                            <option>Disabled</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Push Notifications
                        </label>
                        <select
                            className="mt-1 block w-full px-4 py-2 border border-gray-300
               rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Enabled</option>
                            <option>Disabled</option>
                        </select>
                    </div> */}
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