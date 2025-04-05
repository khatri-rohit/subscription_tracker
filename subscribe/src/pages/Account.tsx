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

const formSchema = z.object({
    password: z.string().min(8, "Your New Password is Should Be 8 Character Long").optional(),
    confirmPassword: z.string().min(8, "Your New Password is Should Be 8 Character Long").optional(),
});

const Account = () => {

    const { user } = useAuth();

    const [deleteUser] = useDeleteUserMutation();
    const [updatePassowrd] = useUpdatePassowrdMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const confirmSubmit = async () => {
        const { password, confirmPassword } = form.getValues()
        try {
            await updatePassowrd({
                _id: user?._id as string,
                password: password as string,
                confirmPassword: confirmPassword as string
            });

            toast.success("Password Changed");

        } catch (error) {
            toast.error("Check Your Password");
            console.log(error);
        }
    }

    const handleSubmit = async () => {
        try {
            await deleteUser({
                _id: user?._id
            })
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                Account Settings
            </h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Security</h2>

                <Form {...form}>
                    <form className="space-y-4">
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium text-gray-600">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter new password"
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300
                 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium text-gray-600">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter new password"
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300
                 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>

            <div className="flex justify-end space-x-4">
                <Button
                    className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                    onClick={() => form.reset()}>
                    Cancel
                </Button>
                <Button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer" onClick={confirmSubmit}>
                    Save Changes
                </Button>
            </div>

            <div className="my-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Dranger Zone
                </h2>
                <div className="py-2 flex justify-between">
                    <div>
                        <p className="text-[1em]">Delete My Account</p>
                        <p className="text-[0.9em]">Once you delte your account, there is no going back. Please be certain</p>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors cursor-pointer">
                        Delete
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Account