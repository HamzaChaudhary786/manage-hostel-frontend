import LoadingButton from "../../components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().optional(),
    username: z.string().min(1, "Name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    addressLine1: z.string().min(1, "Address Line 1 is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    imageUrl: z.string().min(1, "Image URL is required"), // Make imageUrl optional since it might be uploaded
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User;
    onSave: (userProfileData: any) => void;
    isLoading: boolean;
    title?: string;
    buttonText?: string;
};

const UserProfileForm = ({
    onSave,
    isLoading,
    title = "User Profile",
    buttonText = "Submit",
    currentUser,
}: Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    });

    useEffect(() => {
        form.reset(currentUser);
    }, [currentUser, form]);

    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [Image, setImage] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        if (file) {
            setProfileImage(file);
            const imageUrlData = URL.createObjectURL(file);
            setImage(imageUrlData)
        }
    };
    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('addressLine1', data.addressLine1);
        formData.append('city', data.city);
        formData.append('country', data.country);
        formData.append('phoneNumber', data.phoneNumber);

        // Append the image file if a new one has been selected.
        if (profileImage) {
            formData.append('imageFile', profileImage); // Ensure this matches the multer field name
        }

        // Pass the FormData to the onSave function
        await onSave(formData);
    };


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 bg-gray-50 rounded-lg md:p-10"
            >
                <div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <FormDescription>
                        View and change your profile information here
                    </FormDescription>
                </div>
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={Image ? Image : currentUser.imageUrl} // Show new image or existing image
                            alt="Profile Avatar"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg cursor-pointer"
                            onClick={handleAvatarClick}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled className="bg-white" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Username Field */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Address, Phone, City, Country Fields */}
                <div className="flex flex-col md:flex-row gap-4">
                    <FormField
                        control={form.control}
                        name="addressLine1"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Submit Button */}
                {isLoading ? (
                    <LoadingButton />
                ) : (
                    <Button type="submit" className="bg-orange-500">
                        {buttonText}
                    </Button>
                )}
            </form>
        </Form>
    );
};

export default UserProfileForm;
