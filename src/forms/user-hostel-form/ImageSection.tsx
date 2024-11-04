import useCloudinaryUploader from "@/commonComponents/CloudinaryCustomHook"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

const ImageSection = () => {
    const { control, watch } = useFormContext()

    const { handleSingleFileChange } = useCloudinaryUploader();

    const existingUrl = watch("imageUrl")
    return (
        <>
            <div className="space-y-3">
                <div className="space-y-3">
                    <h1 className="text-2xl font-bold ">
                        Hostel Image
                    </h1>
                </div>

                <div className="flex flex-col md:w-[50%] gap-8">

                    {
                        existingUrl && (

                            <img src={existingUrl} className="rounded-md h-[40vh] w-full object-cover" alt="" />


                        )
                    }
                    <FormField control={control} name="imageUrl" render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="bg-white "
                                    type="file"
                                    accept=".jpg, .jpeg, .png "
                                    onChange={(e) => handleSingleFileChange(e, field)} />

                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )} />

                </div>
            </div>
        </>
    )
}

export default ImageSection