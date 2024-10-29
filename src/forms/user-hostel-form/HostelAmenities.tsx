import { amenitiesList } from "@/commonComponents/AmenitiesList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import axios from 'axios';
import { useState } from "react";

type Props = {
    index: number;
    removeMenuItem: () => void;
}

const HostelAmenities = ({ index, removeMenuItem }: Props) => {
    const { control } = useFormContext();
    const [imageUrls, setImageUrls] = useState<string[]>([]); // Specify type as string[]

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
        const files = e.target.files ? Array.from(e.target.files) : [];

        if (files.length > 0) {
            const uploadedUrls = await uploadImagesToCloudinary(files);
            setImageUrls(uploadedUrls); // Store the URLs
            field.onChange(uploadedUrls); // Update form field with URLs
        } else {
            setImageUrls([]); // Reset URLs if no files are selected
            field.onChange(null); // Reset form field
        }
    };

    const uploadImagesToCloudinary = async (files: File[]) => {
        const urls: string[] = []; // Specify type as string[]
        const cloudName = 'dtqmhztoy'; // Replace with your Cloudinary cloud name
        const uploadPreset = 'MernEats'; // Replace with your upload preset

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', uploadPreset);

            try {
                const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);
                urls.push(response.data.secure_url); // Collect the URLs
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }

        return urls; // Return all uploaded URLs
    };

    return (
        <div className="flex flex-col gap-6">
            <FormField control={control} name={`rooms.${index}.type`} render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center gap-1">Type <FormMessage /></FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="Single && Double" className="bg-white" />
                    </FormControl>
                </FormItem>
            )} />

            <FormField control={control} name={`rooms.${index}.bedCount`} render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center gap-1">Bed Count <FormMessage /></FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="1, 2, 3" className="bg-white" />
                    </FormControl>
                </FormItem>
            )} />

            <FormField control={control} name={`rooms.${index}.pricePerNight`} render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center gap-1">Price ($) <FormMessage /></FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="8.00" className="bg-white" />
                    </FormControl>
                </FormItem>
            )} />

            <FormField control={control} name={`rooms.${index}.amenities`} render={({ field }) => (
                <FormItem>
                    <div className="grid md:grid-cols-5 justify-items-start items-start gap-1">
                        {amenitiesList.map((cuisine) => (
                            <FormItem key={cuisine} className="flex flex-row mt-2 space-x-1 items-center">
                                <FormControl>
                                    <Checkbox
                                        className="bg-white"
                                        checked={(field.value || []).includes(cuisine)} // Prevents accessing undefined
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                field.onChange([...new Set([...field.value || [], cuisine])]); // Ensure uniqueness
                                            } else {
                                                field.onChange((field.value || []).filter((value: string) => value !== cuisine));
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
                            </FormItem>
                        ))}
                    </div>
                </FormItem>
            )} />

            <FormField control={control} name={`rooms.${index}.images`} render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            className="bg-white"
                            type="file"
                            multiple
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => handleFileChange(e, field)}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />

            <Button type="button" onClick={removeMenuItem} className="bg-red-500 max-h-fit">Remove</Button>
        </div>
    );
}

export default HostelAmenities;
