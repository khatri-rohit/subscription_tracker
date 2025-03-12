import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Model from "../../util/Model"
import { ALargeSmall, EyeIcon, MailIcon, X } from "lucide-react"

type FormValues = {
    firstName: string,
    LastName: string,
    email: string,
    password: string,
    Confpassword: string,
}

const SignUp = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            firstName: "",
            LastName: "",
            email: "",
            password: "",
            Confpassword: "",
        }
    })

    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    return (
        <Model>
            <div className="absolute md:right-10 right-5 md:top-10 top-5 cursor-pointer">
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
                                    name="LastName"
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                                placeholder="********" {...field} />
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
                                type="submit">
                                Register
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
                    <p className="text-sm lg:text-[1em] text-center pt-10 pb-5 md:pb-4">Already have an account? <span className="hover:underline text-gray-800 cursor-pointer">Login</span></p>

                </div>
            </div>
        </Model>
    )
}

export default SignUp