/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ALargeSmall, EyeIcon, MailIcon, X } from "lucide-react"
import axios, { AxiosError } from 'axios';
import { SyncLoader } from 'react-spinners'
import { motion } from 'motion/react';

import { useAuth } from "@/context/Auth"
import { useAppDispatch, useAppSelector } from "@/app/store";
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
// import { toast } from "sonner";

type FormValues = {
    firstName: string,
    lastName: string,
    email: string,
    // otp: string,
    password: string,
    Confpassword: string,
}

type Status = 'loading' | 'error' | 'success'

interface ErrorResponse {
    error: string;
}
const SignUp = () => {

    const [status, setStatus] = useState<Status>('success');

    const { apiUrl, serverUri } = useAuth();
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector((state) => state.rootReducers.isAuth)

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
        if (isAuth) {
            alert("You already have a session running\nLog out and try again")
            return
        }

        try {
            const { email, firstName, lastName, password } = data;
            setStatus("loading");
            const response = await axios.post(`${apiUrl}/auth/sign-up`,
                { email, firstName, lastName, password }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log(response);
            setTimeout(() => setStatus("success"), 500);
            dispatch(isAuthenticated(true))
            navigate('/dashboard', { replace: true })
        } catch (error) {
            setStatus("error");
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                const response = axiosError.response?.data as ErrorResponse;
                console.log(axiosError.response);
                console.log(response.error);
                if (axiosError.response?.status === 401) {
                    form.setError('email', { message: response.error });
                } else if (axiosError.response?.status === 400) {
                    form.setError('password', { message: response.error });
                } else if (axiosError.response?.status === 409) {
                    form.setError('email', { message: response.error });
                }
            }
        }
    }

    // const handleXLogin = async () => {
    //     window.location.href = "http://localhost:5500/auth/twitter";
    // }

    const handleGithubLogin = async () => {
        window.location.href = `${serverUri}/auth/github`;
        // getLoggedInUser()
    };

    const handleGoogleAuth = async () => {
        window.location.href = `${serverUri}/auth/google`;
        // getLoggedInUser()
    };

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
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen flex justify-center items-center p-4"
        >
            <motion.div
                className="absolute right-4 sm:right-10 top-4 sm:top-5 cursor-pointer"
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <X size={25} />
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="bg-[#FFCF8D] w-[95%] sm:w-[85%] md:w-[90%] lg:w-[75%] min-h-[80vh] lg:min-h-[65%] md:grid md:grid-cols-2 rounded-xl overflow-hidden"
            >
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="hidden md:block object-cover w-full h-full"
                    src="/img/signIn.png"
                    alt="girl-illustration"
                />

                <motion.div
                    variants={itemVariants}
                    className="h-full flex flex-col justify-between w-[90%] sm:w-[85%] md:w-[90%] lg:w-[75%] m-auto py-6 md:py-8"
                >
                    <motion.p
                        variants={itemVariants}
                        className="md:text-3xl text-2xl text-center text-[#5A3E2B] font-bold"
                    >
                        Create Account
                    </motion.p>

                    <Form {...form}>
                        <motion.form
                            variants={itemVariants}
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 grid grid-cols-1 text-black mt-8 md:mt-0"
                        >
                            <motion.div variants={itemVariants} className="names flex flex-col sm:flex-row gap-4 sm:space-x-2 w-full col-span-1">
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
                            </motion.div>

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
                                        <FormMessage />
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
                                rules={{ required: "Password is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">
                                            Password
                                        </FormLabel>
                                        <div className="flex items-center border border-[#5A3E2B] ps-1.5 md:px-3 rounded-lg">
                                            <EyeIcon color="#5A3E2B" />
                                            <Input className="border-none shadow-none text-sm md:text-lg placeholder:text-gray-500/50"
                                                placeholder="********"
                                                type="password" {...field} />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="Confpassword"
                                rules={{
                                    required: "Verify password before continue",
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
                            <motion.div variants={itemVariants}>
                                <Button
                                    className="w-full hover:bg-white/80 cursor-pointer bg-white text-black transition-all duration-300"
                                    type="submit"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? <SyncLoader color="#31363F" size={8} /> : 'Register'}
                                </Button>
                            </motion.div>
                        </motion.form>
                    </Form>

                    <motion.div
                        variants={itemVariants}
                        className="m-auto w-full md:w-[90%] mt-8 md:mt-0"
                    >
                        <motion.p variants={itemVariants} className="text-center text-[#3f291a] text-sm relative flex items-center justify-center before:content-[''] before:absolute before:left-0 before:w-[10%] sm:before:w-[15%] md:before:w-[20%] lg:before:w-[25%] before:h-[1px] before:bg-white/80 after:content-[''] after:absolute after:right-0 after:w-[10%] sm:after:w-[15%] md:after:w-[20%] lg:after:w-[25%] after:h-[1px] after:bg-white/80">
                            Or Continue With
                        </motion.p>

                        <motion.div variants={itemVariants} className="icons flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-x-7 mt-4">
                            <Button
                                className="bg-white px-4 py-2 rounded-lg w-full sm:flex-1 cursor-pointer hover:bg-gray-50 transition-all duration-300"
                                onClick={handleGoogleAuth}>
                                <img src="/img/icons/google-svgrepo-com.svg" alt="google" className="w-8 h-8 inline-block mr-2" />
                                <span className="hidden sm:inline text-black">Login with Google</span>
                            </Button>
                            <Button
                                className="bg-white px-4 py-2 rounded-lg w-full sm:flex-1 cursor-pointer hover:bg-gray-50 transition-all duration-300"
                                onClick={handleGithubLogin}
                            >
                                <img src="/img/icons/github-svgrepo-com.svg" alt="github" className="w-8 h-8 inline-block mr-2" />
                                <span className="hidden sm:inline text-black">Login with GitHub</span>
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-sm lg:text-base text-center mt-8 md:mt-4"
                    >
                        Already have an account? {" "}
                        <motion.span
                            className="hover:underline text-gray-800 cursor-pointer"
                            onClick={() => navigate('/signin')}
                            whileHover={{ scale: 1.05 }}
                        >
                            Login
                        </motion.span>
                    </motion.p>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default SignUp