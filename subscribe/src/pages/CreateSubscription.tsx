import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CalendarIcon } from "lucide-react"
import { BeatLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { motion } from 'motion/react'

import { cn, platforms } from "@/lib/utils"
import { CreateSubscriptions } from "@/lib/types"
import { useCreateSubscriptionMutation } from "@/services/subscriptions"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { AxiosError } from "axios"

const formSchema = z.object({
    platformId: z.string().min(1, "Please select a platform"),
    customPlatform: z.string().optional(),
    price: z.number().min(1, "Price is required"),
    currency: z.enum(["INR", "USD", "EUR", "GBP"]),
    frequency: z.enum(["monthly", "daily", "weekly", "yearly"]),
    category: z.string().min(1, "Category is required").toLowerCase(),
    paymentMethod: z.string().min(1, "Payment method is required"),
    startDate: z.date().refine(
        (date) => date <= new Date(),
        { message: "Start date cannot be in the  future" }
    )
});

const CreateSubscription = () => {

    const navigate = useNavigate()
    const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

    const [createSubscription, { isError, isLoading }] = useCreateSubscriptionMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // status: "active",
            currency: "INR",
            frequency: "monthly",
            platformId: "",
            customPlatform: ""
        }
    });

    // Watch for platform changes
    const selectedPlatform = form.watch("platformId");

    // Update UI when platform changes
    useEffect(() => {
        setShowCustomInput(selectedPlatform === "Other");
        if (selectedPlatform !== "other") {
            form.setValue("customPlatform", "");
        }
        console.log(selectedPlatform);
    }, [selectedPlatform, form]);


    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            const { platformId, price, currency, category, frequency, paymentMethod, startDate, customPlatform } = values;
            const name: string = platformId === 'Other' ? (customPlatform as string) : platformId;

            if (platformId === 'Other' && (customPlatform?.trim()?.length as number) <= 0) {
                throw new Error("Subscription Name is Required");
            } else if (platformId === 'Other' && (customPlatform?.trim()?.length as number) <= 3) {
                throw new Error("Enter a valid subscription name");
            }
            const newSubscription: CreateSubscriptions = {
                name,
                price,
                category,
                currency,
                frequency,
                paymentMethod,
                startDate
            }
            await createSubscription(newSubscription)
            if (!isError && !isLoading)
                navigate('/subscription')
        } catch (error) {
            const axiosError = error as AxiosError;
            form.setError("customPlatform", { message: axiosError.message })
        }
    }

    // <motion.div
    //     initial={{ opacity: 0, y: 20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ delay: 0.4, duration: 0.5 }}
    // >
    //     <motion.div
    // initial={{ opacity: 0, y: 20 }}
    // animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5, ease: "easeOut" }}
    //     className="max-w-3xl mx-auto px-6 py-8 h-screen"
    // >
    //         <motion.div
    //             initial={{ opacity: 0, x: -20 }}
    //             animate={{ opacity: 1, x: 0 }}
    //             transition={{ delay: 0.2, duration: 0.5 }}
    //             className="mb-10"
    //         >

    return (

        <motion.div initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, height: "100vh" }}
            className="max-w-3xl mx-auto px-6 py-8 h-0">
            <motion.div initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Create New Subscription</h1>
                <p className="text-gray-500 mt-3 text-lg dark:text-gray-400">Add a new subscription to track your expenses</p>
            </motion.div>

            <Form {...form}>
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Platform Selection - Full Width */}
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="platformId"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-base font-medium text-gray-900 dark:text-white">
                                        Select Platform
                                    </FormLabel>
                                    <FormControl className="w-full">
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setShowCustomInput(value === "other");
                                            }}
                                            value={field.value}>
                                            <SelectTrigger className="h-12 text-base px-4 w-full">
                                                <SelectValue placeholder="Select a platform" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {platforms.map((platform) => (
                                                    <SelectItem
                                                        key={platform.id}
                                                        value={platform.name}
                                                        className="text-base py-3"
                                                    >
                                                        {platform.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />

                        {showCustomInput && (
                            <FormField
                                control={form.control}
                                name="customPlatform"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium text-gray-900 dark:text-white">Platform Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter platform name"
                                                className="h-12 text-base px-4 bg-[#1b1f27]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm" />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-gray-900 dark:text-white">Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-12 text-base px-4 w-full">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Entertainment" className="text-base py-3">Entertainment</SelectItem>
                                            <SelectItem value="sports" className="text-base py-3">Sports</SelectItem>
                                            <SelectItem value="Lifestyle" className="text-base py-3">Lifestyle</SelectItem>
                                            <SelectItem value="other" className="text-base py-3">Others</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="frequency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-gray-900 dark:text-white">Billing Frequency</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-12 text-base px-4 w-full">
                                                <SelectValue placeholder="Select frequency" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="monthly" className="text-base py-3">Monthly</SelectItem>
                                            <SelectItem value="yearly" className="text-base py-3">Yearly</SelectItem>
                                            <SelectItem value="weekly" className="text-base py-3">Weekly</SelectItem>
                                            <SelectItem value="daily" className="text-base py-3">Daily</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-gray-900 dark:text-white">Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            className="h-12 text-base px-4 dark:bg-[#1b1f27]"
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="currency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-gray-900 dark:text-white">Currency</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-12 text-base px-4 w-full">
                                                <SelectValue placeholder="Select currency" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="INR" className="text-base py-3">INR</SelectItem>
                                            <SelectItem value="USD" className="text-base py-3">USD</SelectItem>
                                            <SelectItem value="EUR" className="text-base py-3">EUR</SelectItem>
                                            <SelectItem value="GBP" className="text-base py-3">GBP</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-gray-900 dark:text-white">Payment Method</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-12 text-base px-4 w-full">
                                                <SelectValue placeholder="Select payment method" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Credit Card" className="text-base py-3">Credit Card</SelectItem>
                                            <SelectItem value="Debit Card" className="text-base py-3">Debit Card</SelectItem>
                                            <SelectItem value="UPI" className="text-base py-3">UPI</SelectItem>
                                            <SelectItem value="Net Banking" className="text-base py-3">Net Banking</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-gray-900 dark:text-white">Start Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "h-12 text-base px-4 w-full pl-3 text-left font-normal dark:bg-[#1b1f27]",
                                                        !field.value && "text-muted-foreground"
                                                    )}>
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-6 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-12 px-6 text-base cursor-pointer"
                            disabled={isLoading}
                            onClick={() => form.reset()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="h-12 px-8 text-base bg-primary hover:bg-primary/90 cursor-pointer"
                            disabled={isLoading}
                        >
                            {isLoading ? <BeatLoader size={10} color="#ffffff" /> : 'Create Subscription'}
                        </Button>
                    </div>
                </motion.form>
            </Form>
        </motion.div>
    )
}

export default CreateSubscription