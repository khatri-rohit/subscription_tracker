import { useState, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/Auth';
import { useUpdateUserAvatarMutation, useUpdateUserInfoMutation } from '@/services/users';
import { status } from '@/lib/types';

const profileFormSchema = z.object({
    firstName: z.string().min(2, "Name must be at least 2 characters long"),
    lastName: z.string().min(2, "Username must be at least 2 characters long"),
    email: z.string().email("Please enter a valid email address"),
});

const Profile = () => {
    const { user, imageUrl } = useAuth();

    const [saveBtn, setSaveBtn] = useState<boolean>(true);
    const [profileImage, setProfileImage] = useState<string>(() => {
        const imgpath = (user?.profileImage as string);
        if (imgpath.length > 0) {
            return `${imageUrl}/${imgpath}`
        } else {
            return '/img/blank-avatar.webp'
        }
    });

    const [status, setStatus] = useState<status>('success')

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [updateUserInfo] = useUpdateUserInfoMutation()
    const [updateUserAvatar] = useUpdateUserAvatarMutation()

    // Initialize with default values
    const defaultValues = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email
    };

    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: defaultValues
    });

    // Track form changes to enable/disable save button
    const handleFormChange = () => {
        const { firstName, lastName, email } = form.getValues();
        if (
            firstName !== defaultValues.firstName ||
            lastName !== defaultValues.lastName ||
            email !== defaultValues.email
        ) {
            setSaveBtn(false);
        } else {
            setSaveBtn(true);
        }
    };

    const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
        // e.preventDefault();
        // console.log("Profile form submitted with data:", data);
        console.log("Profile image:", profileImage);

        const { firstName, lastName, email } = data
        try {
            await updateUserInfo({
                _id: user?._id as string,
                firstName: firstName as string,
                lastName: lastName as string,
                email: email as string
            });

            toast.success("Profile Information Updated");
        } catch (error) {
            console.log(error);
        }
        setSaveBtn(true);
    };

    // const handleCancel = (e: FormEvent) => {
    //     e.preventDefault();
    //     form.reset();
    //     setSaveBtn(true);
    // }

    const handleProfilePictureClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setStatus('loading')
            try {
                const imageUrl = URL.createObjectURL(file);
                await updateUserAvatar({ _id: user?._id as string, profileImage: file });
                setProfileImage(imageUrl);
                setStatus('success');
                toast.success("Profile Picture Updated 🎊");

            } catch (error) {
                console.log(error);
                setStatus('error');
                toast.error("Something Went Wrong 🎊");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 dark:bg-gray-800 dark:text-white rounded-lg">
            <h1 className="text-3xl font-bold mb-8">
                Profile Settings <span className='text-sm font-light'>(reload if you can't see desired changes)</span>
            </h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                    Profile Picture
                </h2>
                <div className="flex items-center space-x-4">
                    <div
                        className="w-24 h-24 rounded-full bg-gray-700 cursor-pointer relative overflow-hidden"
                        onClick={handleProfilePictureClick}>
                        <img
                            src={profileImage.includes("blank-avatar") ? "/img/blank-avatar.webp" : profileImage}
                            width='100'
                            height='100'
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-40 transition-opacity">
                            <span className="text-white text-xs font-medium">
                                Change
                            </span>
                        </div>
                    </div>
                    <Input
                        name='profileImage'
                        type="file"
                        ref={fileInputRef}
                        accept=".jpg,.jpeg,.png"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
                {status === 'error' &&
                    (<p className="text-[.7em] text-red-500">Too Large File or Invalid Format</p>)}
                <div>
                    <Button
                        type="button"
                        className="px-6 mt-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={handleProfilePictureClick}>
                        Change Picture
                    </Button>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                    Profile Information
                </h2>
                <Form {...form}>
                    <form className="space-y-4" onChange={handleFormChange}
                        onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium dark:text-gray-300">
                                        First Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium dark:text-gray-300">
                                        Last Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium dark:text-gray-300">
                                        Email Address
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            {...field}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-4 mt-5">
                            <Button
                                type="submit"
                                disabled={saveBtn}
                                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
                {/* <Button
                    type="button"
                    className="px-6 py-2 text-gray-900 hover:text-white bg-white rounded-lg hover:bg-gray-600 transition-colors dark:text-gray-300 dark:bg-gray-900 dark:hover:bg-gray-600"
                    onClick={handleCancel}>
                    Cancel
                </Button> */}
            </div>
        </div>
    );
};

export default Profile;