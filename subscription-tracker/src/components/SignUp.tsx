import { Resolver, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type FormValues = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

type FieldError = {
    type: 'required' | 'minLength' | 'validate',
    message: string
}

const resolver: Resolver<FormValues> = async (values) => {
    const errors: Record<string, FieldError> = {}; // first is message type and second is type object which is any (FieldError) for proper type safty

    if (!values.name) {
        errors.name = {
            type: "required",
            message: "This is required!"
        };
    }
    if (!values.email) {
        errors.email = {
            type: "required",
            message: "This is required!"
        };
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(values.email)) {
        errors.email = {
            type: "validate",
            message: "Please use a Gmail address"
        };
    }

    if (!values.password) {
        errors.password = {
            type: "required",
            message: "This is required!"
        };
    } else if (values.password.length < 8) {
        errors.password = {
            type: "minLength",
            message: "Password must be 8 characters"
        };
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = {
            type: "required",
            message: "This is required!"
        };
    } else if (values.password && values.confirmPassword !== values.password) {
        errors.confirmPassword = {
            type: "validate",
            message: "The passwords don't match"
        };
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors
    };
};

const SignUp = () => {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({ resolver })

    const onSubmit = async (data: FormValues) => {
        try {
            console.log("Request Sent");
            const response = await fetch('http://localhost:5500/api/v1/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Something Went Wrong\nUser Already Exists in DB');
            }
            const result = await response.json();
            console.log('User created:', result);
            console.log(document.cookie);
            navigate('/');

        } catch (error) {
            console.error('Error creating user:', error);
            alert("User Already Exists");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">

            <form className="bg-white p-10 rounded-xl shadow-lg w-[450px] space-y-6"
                onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create Account</h2>
                <div className="space-y-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Name"
                            {...register("name")}
                        />
                        {errors?.name && <p className="text-red-400">{errors?.name?.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                            {...register("email")}
                        />
                        {errors?.email && <p className="text-red-400">{errors?.email?.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        {errors?.password && <p className="text-red-400">{errors?.password?.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 !my-2"
                            placeholder="Confirm your password"
                            {...register("confirmPassword")}
                        />
                        {errors?.confirmPassword && <p className="text-red-400">{errors?.confirmPassword?.message}</p>}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-8 font-semibold"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUp