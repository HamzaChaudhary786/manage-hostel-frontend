import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import RoomAmenities from "./HostelAmenities";

const MenuSection = () => {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "rooms",
    });

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-2xl font-bold">Rooms</h1>
                <FormDescription>Create your own amenities</FormDescription>
            </div>

            <FormField
                control={control}
                name="rooms"
                render={() => (
                    <FormItem className="flex flex-col gap-2">
                        {fields.map((field, index) => (
                            <RoomAmenities
                                key={field.id} // Use field.id or a unique identifier
                                index={index}
                                removeMenuItem={() => remove(index)}
                            />
                        ))}
                    </FormItem>
                )}
            />

            <Button type="button" className="bg-green-500 w-full" onClick={() => append({ name: "", price: "" })}>
                Add Rooms
            </Button>
        </div>
    );
};

export default MenuSection;
