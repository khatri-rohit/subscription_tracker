import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios, { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { Circle, EyeIcon, MailIcon, X } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useAuth } from "@/context/Auth"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { isAuthenticated } from "@/features/slice"
// import { CodeResponse, useGoogleLogin } from "@react-oauth/google"
// import { toast } from "sonner"
// import { googleAuth } from "./api"

type FormValues = {
  email: string,
  password: string
}

type Status = 'loading' | 'error' | 'success'

interface ErrorResponse {
  error: string;
}

const SignIn = () => {
  const [status, setStatus] = useState<Status>('success')

  const navigate = useNavigate()
  const isAuth = useAppSelector((state) => state.rootReducers.isAuth)

  const dispatch = useAppDispatch()
  const { apiUrl, serverUri } = useAuth()

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
      const response = await axios.post(`${apiUrl}/auth/sign-in`, { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      // console.log(response.data);
      if (response.data) {
        setStatus("success");
        dispatch(isAuthenticated(true));
        navigate('/dashboard');
        window.location.reload()
      }
    } catch (error) {
      setStatus("error");
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const response = axiosError.response?.data as ErrorResponse;
        if (axiosError.response?.status === 404) {
          form.setError('email', { message: response.error });
        } else if (axiosError.response?.status === 401) {
          form.setError('password', { message: response.error });
        }
      }
    }
  }

  // const handleXLogin = async () => {
  //   window.location.href = "http://localhost:5500/auth/twitter";
  // }

  const handleGoogleLogin = async () => {
    window.location.href = `${serverUri}/auth/google`;
  };

  const handleGithubLogin = async () => {
    window.location.href = `${serverUri}/auth/github`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex justify-center items-center p-4"
    >
      <motion.div
        initial={{ x: 20 }}
        animate={{ x: 0 }}
        className="absolute right-4 sm:right-10 top-4 sm:top-5 cursor-pointer"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X size={25} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-[#636AE8] text-white w-full max-w-6xl rounded-xl shadow-2xl overflow-hidden md:grid md:grid-cols-2"
      >
        <motion.div
          variants={itemVariants}
          className="h-full flex flex-col p-6 sm:p-8 lg:p-10 w-full"
        >
          <motion.p
            variants={itemVariants}
            className="text-2xl sm:text-3xl text-white font-bold text-center mb-8"
          >
            Login
          </motion.p>

          <Form {...form}>
            <motion.form
              variants={itemVariants}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full max-w-md mx-auto"
            >
              {/* Form fields remain the same but wrapped in motion.div */}
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <div className="flex items-center border px-3 rounded-lg border-white bg-white/10 backdrop-blur-sm">
                        <MailIcon color="white" className="w-5 h-5" />
                        <Input
                          className="border-none shadow-none text-white text-sm md:text-base placeholder:text-gray-200 bg-transparent"
                          placeholder="Email"
                          {...field}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <div className="flex items-center border px-3 rounded-lg border-white bg-white/10 backdrop-blur-sm">
                        <EyeIcon color="white" className="w-5 h-5" />
                        <Input
                          className="border-none shadow-none text-white text-sm md:text-base placeholder:text-gray-200 bg-transparent"
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="w-full hover:bg-white/80 cursor-pointer bg-white text-black font-semibold"
                  type="submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ?
                    <Circle className="animate-spin mx-auto" size={20} /> :
                    "Sign In"
                  }
                </Button>
              </motion.div>
            </motion.form>
          </Form>

          <motion.div
            variants={itemVariants}
            className="mt-8 w-full max-w-md mx-auto"
          >
            <p className="text-center text-white text-sm relative flex items-center justify-center before:content-[''] before:absolute before:left-0 before:w-[20%] before:h-[1px] before:bg-white/50 after:content-[''] after:absolute after:right-0 after:w-[20%] after:h-[1px] after:bg-white/50">
              Or Continue With
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  className="w-full bg-white hover:bg-white/90 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src="/img/icons/google-svgrepo-com.svg"
                    alt="google"
                    className="w-6 h-6"
                  />
                  <span className="text-sm text-black">Login with Google</span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  className="w-full bg-white hover:bg-white/90 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                  onClick={handleGithubLogin}
                >
                  <img
                    src="/img/icons/github-svgrepo-com.svg"
                    alt="github"
                    className="w-6 h-6"
                  />
                  <span className="text-sm text-black">Login with GitHub</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-sm text-center mt-8"
          >
            Don't have an account?{" "}
            <NavLink
              to={'/signup'}
              className="hover:underline text-gray-50 font-semibold"
            >
              Sign up
            </NavLink>
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="hidden md:block relative h-full"
        >
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="object-cover h-full w-full"
            src="/img/signup-1.png"
            alt="girl-illustration"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default SignIn