import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RestaurantInfo from "./RestaurantInfo";
import AmenitiesSection from "../user-hostel-form/AmenitiesSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

type Props = {
    onSave: (hostelFormData: FormData) => void;
    isLoading: boolean;
};

// Room schema definition
const roomSchema = z.object({
    type: z.string().min(1, "Room type is required"),
    bedCount: z.string().min(1, "Bed count must be at least 1"),
    pricePerNight: z.string().min(1, "Price per night must be greater than 0"),
    images: z.array(z.string()).nonempty("At least one image URL is required"),
    amenities: z.array(z.string()).nonempty("At least one amenity is required"),
});

// Main form schema definition
const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    contactNumber: z.string().min(1, "Contact number is required"),
    address: z.string().min(1, "Address Line 1 is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    email: z.string().optional(),
    rooms: z.array(roomSchema), // Array of room schemas
});

// Type for the form data based on the schema
export type UserFormData = z.infer<typeof formSchema>;

const UserHostelForm = ({ onSave, isLoading }: Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
    });

    // Handle form submission
    const handleSubmit = async (formJsonData: UserFormData) => {
        // Adjusting formJsonData to match the required format
        const adjustedData = {
            name: formJsonData.name,
            contactNumber: formJsonData.contactNumber,
            address: formJsonData.address,
            city: formJsonData.city,
            country: formJsonData.country,
            email: formJsonData.email,
            rooms: formJsonData.rooms.map(room => ({
                type: room.type.charAt(0).toUpperCase() + room.type.slice(1), // Capitalizing room type
                bedCount: room.bedCount, // Converting bedCount to a number
                pricePerNight: room.pricePerNight, // Converting pricePerNight to a number
                availability: "available", // Assuming availability is always available
                images: room.images,
                amenities: room.amenities
            }))
        };

        console.log("Form submitted", adjustedData); // Log adjusted form data before processing
        await onSave(adjustedData); // Send the adjusted data to the backend
    };




    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 bg-gray-50 rounded-lg md:p-10"
            >
                <RestaurantInfo />
                <AmenitiesSection />

                {isLoading ? (
                    <LoadingButton />
                ) : (
                    <Button type="submit">Submit</Button>
                )}
            </form>
        </Form>
    );
};

export default UserHostelForm;
