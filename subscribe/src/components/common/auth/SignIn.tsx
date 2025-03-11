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

const SignIn = () => {
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
      <div className="absolute md:right-10 right-5 md:top-10 top-5 cursor-pointer">
        <X size={25} />
      </div>
      <div className="bg-[#636AE8] md:w-[] lg:w-[65%] w-[85%] h-[65%] md:grid md:grid-cols-2">
        <div className="h-full flex flex-col p-10 w-full">
          <p className="text-3xl text-white font-bold text-center">
            Login
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 md:px-6 px-3 md:w-[80%] w-full m-auto">
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

          <div className="m-auto md:w-[80%]">
            <p className="text-center text-sm text-white relative flex items-center justify-center before:content-[''] before:absolute before:left-0 before:w-[20%] md:before:w-[15%] lg:before:w-[30%] before:h-[1px] before:bg-white/50 after:content-[''] after:absolute after:right-0 after:w-[20%] md:after:w-[15%] lg:after:w-[30%] after:h-[1px] after:bg-white/50">
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
          <div className="text-center text-white">
            <p className="text-sm lg:text-lg ">Don't have an account? <span className="hover:underline text-gray-300 cursor-pointer">Sign Up here</span></p>
          </div>
        </div>

        {/* <div className="w-[50%]"> */}
        <img className="hidden md:block object-cover h-full" src="/img/signup-1.png" alt="girl-illestration" />
        {/* </div> */}

      </div>
    </Model>
  )
}

export default SignIn