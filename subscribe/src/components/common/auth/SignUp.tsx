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
import { EyeIcon, MailIcon, X } from "lucide-react"

type FormValues = {
    email: string,
    password: string
}

const SignUp = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    return (
        <Model>
            <div className="bg-[#636AE8] w-[65%] h-[65%] flex">
                <div className="absolute right-10 top-10 cursor-pointer">
                    <X size={50} />
                </div>
                <div className="w-[50%]">
                    <img className="object-cover h-full" src="/img/signup-1.png" alt="girl-illestration" />
                </div>
                <div className="w-[50%] h-full flex flex-col p-10">
                    <p className="text-3xl text-white font-bold text-center">
                        Login
                    </p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 px-6 w-[80%] m-auto">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">
                                            Email
                                        </FormLabel>
                                        <div className="flex items-center border px-3 rounded-lg">
                                            <MailIcon color="white" />
                                            <Input className="border-none shadow-none text-white placeholder:text-gray-200"
                                                placeholder="Email" {...field} />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">
                                            Password
                                        </FormLabel>
                                        <div className="flex items-center border px-3 rounded-lg">
                                            <EyeIcon color="white" />
                                            <Input className="border-none shadow-none text-white placeholder:text-gray-200 outline-none focus:outline-none "
                                                type="password" placeholder="********" {...field} />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="w-full hover:bg-white/80 cursor-pointer bg-white text-black"
                                type="submit">
                                Submit
                            </Button>
                        </form>
                    </Form>

                    <div className="m-auto w-[80%]">
                        <p className="text-center text-white relative flex items-center justify-center before:content-[''] before:absolute before:left-0 before:w-[30%] before:h-[1px] before:bg-white/50 after:content-[''] after:absolute after:right-0 after:w-[30%] after:h-[1px] after:bg-white/50">
                            Or Continue With
                        </p>
                        <div className="icons flex justify-center gap-x-7 mt-4">
                            <div className="bg-white p-2 rounded-lg px-5">
                                <img src="/img/icons/google-svgrepo-com.svg" alt="google" className="w-10 h-10 cursor-pointer" />
                            </div>
                            <div className="bg-white p-2 rounded-lg px-5">
                                <img src="/img/icons/github-svgrepo-com.svg" alt="github" className="w-10 h-10 cursor-pointer" />
                            </div>
                            <div className="bg-white p-2 rounded-lg px-5">
                                <img src="/img/icons/twitter-svgrepo-com.svg" alt="twitter" className="w-10 h-10 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-white">
                        <p className="">Don't have an account? <span className="underline text-gray-300">Sign Up here</span></p>
                    </div>
                </div>
            </div>
        </Model>
    )
}

export default SignUp