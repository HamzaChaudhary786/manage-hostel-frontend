import { amenitiesList } from "@/commonComponents/AmenitiesList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import useCloudinaryUploader from "@/commonComponents/CloudinaryCustomHook";

type Props = {
    index: number;
    removeMenuItem: () => void;
}

const HostelAmenities = ({ index, removeMenuItem }: Props) => {
    const { control, watch } = useFormContext();
    const existingUrl = watch("rooms")

    const { handleMultipleFileChange } = useCloudinaryUploader();
  

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
                            <FormItem key={cuisine} className="flex flex-row mt-2 space-x-2 items-center">
                                <FormControl>
                                    <Checkbox
                                        className="bg-white mt-[10px]"
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

            <div>
                {existingUrl && existingUrl[index]?.images?.length > 0 ? (
                    <div className="room-images space-x-4 space-y-4">

                        <div className="image-gallery grid grid-cols-3 gap-6">
                            {existingUrl[index].images.map((imageUrl: string, imageIndex: number) => (
                                <AspectRatio key={imageIndex} ratio={16 / 9}>
                                    <img
                                        src={imageUrl}
                                        className="rounded-md h-full w-full object-cover"
                                        alt={`Room ${index + 1} - Image ${imageIndex + 1}`}
                                    />
                                </AspectRatio>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No images available for this room</p>
                )}
            </div>


            <FormField control={control} name={`rooms.${index}.images`} render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            className="bg-white"
                            type="file"
                            multiple
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => handleMultipleFileChange(e, field)}
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
