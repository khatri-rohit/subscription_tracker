
const SignUp = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form className="bg-white p-10 rounded-xl shadow-lg w-[450px] space-y-6">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create Account</h2>
                <div className="space-y-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Confirm your password"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-8 font-semibold"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUp