import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, } from "sonner"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { useAuth } from '@/context/Auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useDeleteUserMutation, useUpdatePassowrdMutation } from '@/services/users';
import { useState } from 'react';
import { status } from '@/lib/types';
import { Circle } from 'lucide-react';
import DeleteAccountConfirmation from '@/components/util/DeleteAccount';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from '@/features/slice';
import { useAppDispatch } from '@/app/store';

const formSchema = z.object({
    password: z.string().min(8, "Your New Password is Should Be 8 Character Long").optional(),
    confirmPassword: z.string().min(8, "Your New Password is Should Be 8 Character Long").optional(),
});

const Account = () => {

    const { user,apiUrl } = useAuth();
    const navigate = useNavigate()
    
    const dispatch = useAppDispatch()
    
    const [status, setStatus] = useState<status>("success")
    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(false);

    const [deleteUser] = useDeleteUserMutation();
    const [updatePassowrd] = useUpdatePassowrdMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const confirmSubmit = async (data: z.infer<typeof formSchema>) => {
        const { password, confirmPassword } = data
        try {
            setStatus("loading")
            if (!password?.trim() || !confirmPassword?.trim()) {
                if (!password) {
                    form.setError("password", { message: "Enter Password" })
                    setStatus("error")
                    return
                } else if (!confirmPassword) {
                    form.setError("confirmPassword", { message: "Enter New Password" })
                    setStatus("error")
                    return
                }
            }
            await updatePassowrd({
                _id: user?._id as string,
                password: password as string,
                confirmPassword: confirmPassword as string
            });

            setStatus("success")
            toast.success("Password Changed");

        } catch (error) {
            setStatus("error")
            toast.error("Check Your Password");
            console.log("Error In Passowrd");
            console.log(error);
        }
    }

    const handleSubmit = async () => {
        try {
            axios.defaults.withCredentials = true
            await axios.post(`${apiUrl}/auth/sign-out`)
            await deleteUser({
                _id: user?._id
            })
            dispatch(isAuthenticated(false))
            setLoad(true);
            setTimeout(() => {
                navigate("/");
                localStorage.clear();
                window.location.reload();
            }, 1000)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {show && (<div className="h-full bg-white/50 dark:bg-zinc-700/50 absolute w-full rounded-2xl">
                <DeleteAccountConfirmation load={load} setShow={setShow} onDelete={handleSubmit} />
            </div>)}
            <div className="max-w-4xl mx-auto rounded-lg p-8 bg-white dark:bg-gray-800">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 dark:text-gray-200">
                    Account Settings
                </h1>
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 dark:text-gray-300">Security</h2>

                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(confirmSubmit)}>
                            <FormField
                                control={form.control}
                                name='password'
                                rules={{ required: "Enter current password" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Current Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Current password"
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='confirmPassword'
                                rules={{ required: "Enter New password" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Enter New Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="New password"
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm" />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end space-x-4">
                                <Button
                                    className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                                    onClick={() => form.reset()}>
                                    Cancel
                                </Button>
                                <Button disabled={status === 'loading'}
                                    className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                                    {status === 'loading' ? <Circle className='animate-spin' size={50} /> : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

                <div className="my-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 dark:text-gray-300">
                        Danger Zone
                    </h2>
                    <div className="py-2 flex justify-between">
                        <div>
                            <p className="text-[1em]">Delete My Account</p>
                            <p className="text-[0.9em]">Once you delete your account, there is no going back. Please be certain</p>
                        </div>
                        <Button
                            onClick={() => setShow(true)}
                            className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors cursor-pointer">
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account