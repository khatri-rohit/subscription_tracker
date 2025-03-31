import { NavLink, Outlet, useLocation } from 'react-router-dom'

const SettingLayout = () => {
    const location = useLocation()

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 p-10">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-2xl p-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Settings</h1>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                    Customize your account settings, profile, and notifications here.
                    Choose an option from the sidebar to begin.
                </p>

                <div className="flex space-x-12">
                    <div className="w-1/4 bg-white  rounded-lg p-6 space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Quick Navigation
                        </h2>
                        <ul className="space-y-4">
                            <li>
                                <NavLink
                                    className={location.pathname.split('/').length === 3 ? "flex items-center text-lg text-white bg-indigo-500 transition-colors py-2 px-4 rounded-md hover:bg-indigo-50 hover:text-indigo-500" : "flex items-center text-lg text-indigo-600 transition-colors py-2 px-4 rounded-md  hover:bg-indigo-50"}
                                    to="/dashboard/settings"
                                >
                                    <span>Account</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={location.pathname.split('/')[3] === 'notifications' ? "flex items-center text-lg text-white bg-yellow-600 transition-colors py-2 px-4 rounded-md hover:bg-yellow-50 hover:text-yellow-600" : "flex items-center text-lg text-gray-800 hover:text-yellow-600 transition-colors py-2 px-4 rounded-md hover:bg-yellow-50"}
                                    to="/dashboard/settings/notifications"
                                >
                                    <span>Notifications</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={location.pathname.split('/')[3] === 'profile' ? "flex items-center text-lg text-white bg-green-600 transition-colors py-2 px-4 rounded-md hover:bg-green-50 hover:text-green-600" : "flex items-center text-lg text-gray-800 hover:text-green-600 transition-colors py-2 px-4 rounded-md hover:bg-green-50"}
                                    to="/dashboard/settings/profile"
                                >
                                    <span >Profile</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="flex-1 bg-white shadow-md rounded-lg p-8">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingLayout