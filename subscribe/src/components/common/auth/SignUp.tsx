import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ALargeSmall, EyeIcon, MailIcon, X } from "lucide-react"
import axios from 'axios';
import { SyncLoader } from 'react-spinners'

import Model from "../../util/Model"
import { useAuth } from "@/context/Auth"
import { useAppDispatch } from "@/app/store";
import { isAuthenticated } from '@/features/slice';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";

type FormValues = {
    firstName: string,
    lastName: string,
    email: string,
    // otp: string,
    password: string,
    Confpassword: string,
}

type Status = 'loading' | 'error' | 'success'

const SignUp = () => {

    const [status, setStatus] = useState<Status>('success');

    const { apiUrl } = useAuth();
    const dispatch = useAppDispatch()

    const navigate = useNavigate();
    const form = useForm<FormValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
            // otp: "",
            email: "",
            password: "",
            Confpassword: "",
        }
    });

    const onSubmit = async (data: FormValues) => {
        try {
            setStatus("loading");
            const { email, firstName, lastName, password } = data;
            const request = await axios.post(`${apiUrl}/auth/sign-up`,
                { email, firstName, lastName, password }, {
                // withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const response = await request;
            setTimeout(() => setStatus("success"), 500);
            localStorage.setItem('isagi-kun', response.data?.data.token);
            navigate('/dashboard')
            dispatch(isAuthenticated(true))
            console.log(response);
        } catch (error) {
            setStatus("error");
            console.log(error);
        }
    }

    return (
        <Model>
            <div className="absolute right-10 top-5 cursor-pointer"
                onClick={() => navigate('/')}>
                <X size={25} />
            </div>
            <div className="bg-[#FFCF8D] w-[85%] md:w-[90%] lg:w-[75%] min-h-[80vh] lg:min-h-[65%] md:grid md:grid-cols-2">
                <img className="hidden md:block object-cover w-full h-full" src="/img/signIn.png" alt="girl-illestration" />

                <div className="h-full flex flex-col justify-between w-[85%] md:w-[90%] lg:w-[75%] m-auto">
                    <p className="md:text-3xl text-2xl text-center pt-7 text-[#5A3E2B] font-bold">
                        Create Account
                    </p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-3 m-auto grid grid-cols-1 text-black pt-10 md:p-0">
                            <div className="names flex space-x-2 w-full col-span-1">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    rules={{ required: "First name is required" }}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>
                                                First Name
                                            </FormLabel>
                                            <div className="flex items-center border border-[#5A3E2B] ps-1.5 md:px-3 rounded-lg">
                                                <ALargeSmall color="#5A3E2B" />
                                                <Input className="border-none shadow-none text-black text-sm md:text-lg placeholder:text-gray-500/50"
                                                    placeholder="First Name" {...field} />
                                            </div>
                                            {/* <FormMessage /> */}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    rules={{ required: "Last name is required" }}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>
                                                Last Name
                                            </FormLabel>
                                            <div className="flex items-center border border-[#5A3E2B] ps-1.5 md:px-3 rounded-lg">
                                                <ALargeSmall color="#5A3E2B" />
                                                <Input className="border-none shadow-none text-sm md:text-lg placeholder:text-gray-500/50"
                                                    placeholder="Last Name" {...field} />
                                            </div>
                                            {/* <FormMessage /> */}
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="email"
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email address"
                                    }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">
                                            Email
                                        </FormLabel>
                                        <div className="flex items-center border border-[#5A3E2B] ps-1.5 md:px-3 rounded-lg">
                                            <MailIcon color="#5A3E2B" />
                                            <Input className="border-none shadow-none text-sm md:text-lg placeholder:text-gray-500/50"
                                                placeholder="Email" {...field} />
                                        </div>
                                        {status === 'error' ? <p className="text-red-600 text-sm">Email Already Exists</p> : <FormMessage />}
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                control={form.control}
                                name="otp"
                                rules={{ required: "Password is important", maxLength: 6 }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">
                                            Verify Otp
                                        </FormLabel>
                                        <div className="flex items-center border border-[#5A3E2B] ps-1.5 md:px-3 rounded-lg">
                                            <KeyIcon color="#5A3E2B" />
                                            <Input className="border-none shadow-none text-sm md:text-lg placeholder:text-gray-500/50"
                                                placeholder="" {...field} />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}
                            <FormField
                                control={form.control}
                                name="password"
                                rules={{ required: "Password is important" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">
                                            Password
                                        </FormLabel>
                                        <div className="flex items-center border border-[#5A3E2B] ps-1.5 md:px-3 rounded-lg">
                                            <EyeIcon color="#5A3E2B" />
                                            <Input className="border-none shadow-none text-sm md:text-lg placeholder:text-gray-500/50"
                                                placeholder="********" type="password" {...field} />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="Confpassword"
                                rules={{
                                    required: "Re-enter your password before continue",
                                    validate: (value) => value === form.getValues('password') || "Password is not same"
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">
                                            Confirm Password
                                        </FormLabel>
                                        <div className="flex items-center border border-[#5A3E2B] ps-1.5 md:px-3 rounded-lg">
                                            <EyeIcon color="#5A3E2B" />
                                            <Input className="border-none shadow-none text-sm md:text-lg placeholder:text-gray-500/50"
                                                type="password"
                                                placeholder="********" {...field} />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="w-full hover:bg-white/80 cursor-pointer bg-white text-black"
                                type="submit" disabled={status === 'loading'}>
                                {status === 'loading' ? <SyncLoader
                                    color="#31363F"
                                    size={8}
                                /> : 'Register ? Verify'}
                            </Button>
                        </form>
                    </Form>

                    <div className="m-auto md:w-[80%] pt-10 md:p-0">
                        <p className="text-center text-[#3f291a] text-sm relative flex items-center justify-center before:content-[''] before:absolute before:left-0 before:w-[10%] sm:before:w-[15%] md:before:w-[20%] lg:before:w-[25%] before:h-[1px] before:bg-white/50 after:content-[''] after:absolute after:right-0 after:w-[10%] sm:after:w-[15%] md:after:w-[20%] lg:after:w-[25%] after:h-[1px] after:bg-white/50">
                            Or Continue With
                        </p>
                        <div className="icons flex justify-center gap-x-7 mt-4">
                            <div className="bg-white md:p-2 px-2 py-1 rounded-lg">
                                <img src="/img/icons/google-svgrepo-com.svg" alt="google" className="w-10 h-10 cursor-pointer" />
                            </div>
                            <div className="bg-white md:p-2 px-2 py-1 rounded-lg">
                                <img src="/img/icons/github-svgrepo-com.svg" alt="github" className="w-10 h-10 cursor-pointer" />
                            </div>
                            <div className="bg-white md:p-2 px-2 py-1 rounded-lg">
                                <img src="/img/icons/twitter-svgrepo-com.svg" alt="twitter" className="w-10 h-10 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <p className="text-sm lg:text-[1em] text-center pt-10 pb-5 md:pb-4">Already have an account? <span className="hover:underline text-gray-800 cursor-pointer" onClick={() => navigate('/signin')}>Login</span></p>

                </div>
            </div>
        </Model>
    )
}

export default SignUp