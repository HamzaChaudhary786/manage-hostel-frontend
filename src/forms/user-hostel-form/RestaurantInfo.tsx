import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {};

const RestaurantInfo = ({ }: Props) => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h1 className="text-2xl font-bold">Details</h1>
                <FormDescription>
                    Enter the details about your hostel, including name, email, location, and contact information.
                </FormDescription>
            </div>
         
            <div className="flex flex-col md:flex-row gap-6 w-full">


                <FormField control={control} name="name" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Hostel Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder="Enter hostel name" required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={control} name="email" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder="abc@gmail.com" required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            <div className="flex gap-4 ">
                <FormField control={control} name="city" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder="Enter city" required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={control} name="country" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder="Enter country" required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={control} name="contactNumber" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder="0307-XXXXXX" required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            <div>
                <FormField control={control} name="address" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Hostel Address</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder="Enter hostel address" required />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
        </div>
    );
};

export default RestaurantInfo;
