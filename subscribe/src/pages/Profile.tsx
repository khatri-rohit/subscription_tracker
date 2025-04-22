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
    const enable = user?.password?.includes("Thrid");

    const [saveBtn, setSaveBtn] = useState<boolean>(true);
    const [profileImage, setProfileImage] = useState<string>(() => {
        const imgpath = (user?.profileImage as string);
        if (imgpath.length > 0) {
            if (user?.profileImage.includes("google") || user?.profileImage.includes("github"))
                return imgpath;
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
        <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:text-white rounded-lg">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
                Profile Settings
                <span className='block sm:inline text-sm font-light mt-1 sm:mt-0 sm:ml-2'>
                    (reload if you can't see desired changes)
                </span>
            </h1>

            <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                    Profile Picture
                </h2>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div
                        className="w-32 h-32 sm:w-24 sm:h-24 rounded-full bg-gray-700 cursor-pointer relative overflow-hidden"
                        onClick={handleProfilePictureClick}>
                        <img
                            src={profileImage.includes("blank-avatar") ? "/img/blank-avatar.webp" : profileImage}
                            width='100'
                            height='100'
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-40 transition-opacity">
                            <span className="text-white text-sm sm:text-xs font-medium">
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
                    <div className="w-full sm:w-auto">
                        <Button
                            type="button"
                            className="w-full sm:w-auto px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={handleProfilePictureClick}>
                            Change Picture
                        </Button>
                        {status === 'error' && (
                            <p className="text-[.7em] text-red-500 mt-2 text-center sm:text-left">
                                Too Large File or Invalid Format
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                    Profile Information
                </h2>
                <Form {...form}>
                    <form className="space-y-4" onChange={handleFormChange}
                        onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                                className="mt-1 block w-full px-3 sm:px-4 py-2 border border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs sm:text-sm" />
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
                                                className="mt-1 block w-full px-3 sm:px-4 py-2 border border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs sm:text-sm" />
                                    </FormItem>
                                )}
                            />
                        </div>

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
                                            disabled={enable}
                                            className="mt-1 block w-full px-3 sm:px-4 py-2 border border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs sm:text-sm" />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end mt-6">
                            <Button
                                type="submit"
                                disabled={saveBtn}
                                className="w-full sm:w-auto px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Profile;