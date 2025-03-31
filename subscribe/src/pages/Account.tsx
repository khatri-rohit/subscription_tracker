import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const formSchema1 = z.object({
    firstName: z.string().min(2, "Name Atleast 2 Character Long").optional(),
    lastName: z.string().min(2, "Name Atleast 2 Character Long").optional(),
    email: z.string().min(2, "Name Atleast 2 Character Long").optional(),
});

const formSchema2 = z.object({
    password: z.string().min(8, "Your New Password is Should Be 8 Character Long").optional(),
    confirmPassword: z.string().min(8, "Your New Password is Should Be 8 Character Long").optional(),
});

const Account = () => {

    const { user } = useAuth();

    const [saveBtn1, setSaveBtn1] = useState<boolean>(true);

    const form1 = useForm<z.infer<typeof formSchema1>>({
        resolver: zodResolver(formSchema1),
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
        }
    });

    const form2 = useForm<z.infer<typeof formSchema2>>({
        resolver: zodResolver(formSchema2),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });


    const handleFormChange = () => {
        const { firstName, lastName } = form1.getValues()
        if (firstName !== user?.firstName || lastName !== user?.lastName) {
            setSaveBtn1(false);
        } else if (firstName === user?.firstName && lastName === user?.lastName) {
            setSaveBtn1(true);
        }
    }

    const handleSubmit = () => {

    }

    return (
        <div className="max-w-4xl mx-auto rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                Account Settings
            </h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Profile Information
                </h2>
                <Form {...form1}>
                    <form className="space-y-4" onChange={handleFormChange}>
                        <div className='flex items-center justify-between space-x-3'>
                            <FormField
                                control={form1.control}
                                name='firstName'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel className="block text-sm font-medium text-gray-600">First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter First Name"
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form1.control}
                                name='lastName'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel className="block text-sm font-medium text-gray-600">Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Last Name"
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300
                 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form1.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel title="you can't change you registered email"
                                        className="block text-sm font-medium text-gray-600">
                                        Email <span className='text-[10px]'>(you can't change you registered email)</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            title="you can't change you registered email"
                                            disabled
                                            placeholder="Enter Last Name"
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

                <div className="flex justify-end space-x-4 mt-5">
                    <Button disabled={saveBtn1}
                        onClick={handleSubmit}
                        className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Security</h2>

                <Form {...form2}>

                    <form className="space-y-4">
                        <FormField
                            control={form2.control}
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
                            control={form2.control}
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
                    className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    onClick={() => form2.reset()}>
                    Cancel
                </Button>
                <Button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    Save Changes
                </Button>
            </div>
        </div>
    )
}

export default Account