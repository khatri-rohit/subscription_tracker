import { useEffect, useState } from "react";
import { Subscription } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, parseISO } from "date-fns";
// import { BeatLoader } from "react-spinners";
import { CalendarIcon } from "lucide-react";
import { cn, platforms } from "@/lib/utils";

// UI Components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "react-hook-form";


interface Props {
    subscription?: Subscription,
    setEdit: (edit: boolean) => void
}

// Form validation schema
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
        { message: "Start date cannot be in the future" }
    ),
});

const EditSubscription = ({ subscription, setEdit }: Props) => {

    // const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [showCustomInput, setShowCustomInput] = useState(false);

    // Convert the date value to proper format for form initialization
    const getInitialDate = () => {
        if (!subscription?.startDate) return new Date();

        // If it's already a Date object, return it directly
        if (subscription.startDate instanceof Date) {
            return subscription.startDate;
        }

        // If it's a string in ISO format, parse it
        try {
            return parseISO(subscription.startDate);
        } catch (error) {
            console.error("Error parsing date:", error);
            return new Date(); // Fallback to current date
        }
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            platformId: subscription?.name || "",
            customPlatform: "",
            price: subscription?.price || 0,
            currency: subscription?.currency || "INR",
            frequency: subscription?.frequency || "monthly",
            category: subscription?.category || "",
            paymentMethod: subscription?.paymentMethod || "",
            startDate: getInitialDate(),
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Form values:", values);
        // Implement your submission logic here
        setEdit(false);
    }

    const date = form.watch("startDate");

    useEffect(() => {
        console.log("Current date value:", date);
    }, [date]);

    return (
        <div className="border p-3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="platformId"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-base font-medium">
                                        Select Platform
                                    </FormLabel>
                                    <FormControl className="w-full">
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setShowCustomInput(value === "Other");
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
                                                        className="text-base py-3">
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
                                        <FormLabel className="text-base font-medium">Platform Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter platform name"
                                                className="h-12 text-base px-4"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">Category</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-12 text-base px-4 w-full">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="entertainment" className="text-base py-3">Entertainment</SelectItem>
                                            <SelectItem value="sports" className="text-base py-3">Sports</SelectItem>
                                            <SelectItem value="lifestyle" className="text-base py-3">Lifestyle</SelectItem>
                                            <SelectItem value="Other" className="text-base py-3">Others</SelectItem>
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
                                    <FormLabel className="text-base font-medium">Billing Frequency</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
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
                                    <FormLabel className="text-base font-medium">Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            className="h-12 text-base px-4"
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
                                    <FormLabel className="text-base font-medium">Currency</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
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
                                    <FormLabel className="text-base font-medium">Payment Method</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
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
                                    <FormLabel className="text-base font-medium">Start Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "h-12 text-base px-4 w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
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
                                                disabled={(date) => date > new Date()}
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
                    <div className="flex justify-end gap-4 pt-2 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-10 px-5 text-base cursor-pointer"
                            onClick={() => setEdit(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="h-10 px-5 text-base bg-primary hover:bg-primary/90 cursor-pointer"
                        >
                            Confirm
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default EditSubscription