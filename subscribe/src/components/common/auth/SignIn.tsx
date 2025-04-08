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
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/Auth"
import { useState } from "react"
import axios, { AxiosError } from "axios"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { isAuthenticated } from "@/features/slice"

type FormValues = {
  email: string,
  password: string
}

type Status = 'loading' | 'error' | 'success'

const SignIn = () => {
  const [status, setStatus] = useState<Status>('success')

  const navigate = useNavigate()
  const isAuth = useAppSelector((state) => state.rootReducers.isAuth)

  const dispatch = useAppDispatch()
  const { apiUrl } = useAuth()

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data: FormValues) => {
    if (isAuth) {
      alert("You already have a session running\nLog out and try again")
      return
    }
    try {
      const { email, password } = data;
      if (email.length == 0 || password.length == 0) {
        if (email.length == 0 && password.length == 0) {
          form.setError('email', { message: "Enter Email" });
          form.setError('password', { message: "Enter Password" });

        } else if (email.length == 0) {
          form.setError('email', { message: "Enter Email" });
        } else {
          form.setError('password', { message: "Enter Password" });
        }
        return
      }
      setStatus("loading");
      const response = await axios.post(
        `${apiUrl}/auth/sign-in`,
        { email, password },
        {
          withCredentials: true, // Enable this
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      console.log(response.data);
      if (response.data) {
        setStatus("success");
        dispatch(isAuthenticated(true));
        navigate('/dashboard');
      }
    } catch (error) {
      setStatus("error");
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          form.setError('email', { message: axiosError.response.data.error });
        } else if (axiosError.response?.status === 401) {
          form.setError('password', { message: axiosError.response.data.error });
        }
      }
    }
  }

  return (
    <Model>
      <div className="absolute right-10 top-5 cursor-pointer"
        onClick={() => navigate('/')}>
        <X size={25} />
      </div>
      <div className="bg-[#636AE8] text-white w-[90%] sm:w-[85%] lg:w-[65%] min-h-[80vh] lg:min-h-[65%] md:grid md:grid-cols-2">
        <div className="h-full flex flex-col p-10 w-full">
          <p className="text-3xl text-white font-bold text-center">
            Login
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 md:px-6 px-3 w-full xl:w-[80%] lg:w-[90%] m-auto pt-14 md:pt-0">
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
                      <Input className="border-none shadow-none text-black text-sm md:text-lg placeholder:text-gray-200"
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
                      <Input className="border-none shadow-none text-black text-sm md:text-lg placeholder:text-gray-200"
                        type="password" placeholder="********" {...field} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full hover:bg-white/80 cursor-pointer bg-white text-black"
                type="submit" disabled={status === 'loading'}>
                Submit
              </Button>
            </form>
          </Form>

          <div className="m-auto md:w-[80%] md:p-0 pt-10">
            <p className="text-center text-white text-sm relative flex items-center justify-center before:content-[''] before:absolute before:left-0 before:w-[10%] sm:before:w-[15%] md:before:w-[20%] before:h-[1px] before:bg-white/50 after:content-[''] after:absolute after:right-0 after:w-[10%] sm:after:w-[15%] md:after:w-[20%] after:h-[1px] after:bg-white/50">
              Or Continue With
            </p>
            <div className="icons flex items-center justify-center gap-x-7 mt-4">
              <div className="bg-white px-2 rounded-lg">
                <img src="/img/icons/google-svgrepo-com.svg" alt="google" className="w-10 h-10 cursor-pointer" />
              </div>
              <div className="bg-white px-2 rounded-lg">
                <img src="/img/icons/github-svgrepo-com.svg" alt="github" className="w-10 h-10 cursor-pointer" />
              </div>
              <div className="bg-white px-2 rounded-lg">
                <img src="/img/icons/twitter-svgrepo-com.svg" alt="twitter" className="w-10 h-10 cursor-pointer" />
              </div>
            </div>
          </div>

          <p className="text-sm lg:text-[1em] text-center pt-10 pb-5 md:pb-4">Don't have an account? <span className="hover:underline text-gray-300 cursor-pointer" onClick={() => navigate('/signup')}>SignUp here</span></p>

        </div>


        {/* <div className="w-[50%]"> */}
        <img className="hidden md:block object-cover h-full" src="/img/signup-1.png" alt="girl-illestration" />
        {/* </div> */}

      </div>
    </Model>
  )
}

export default SignIn