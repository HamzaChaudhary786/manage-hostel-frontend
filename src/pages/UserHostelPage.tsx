import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateMyHostel, useGetMyHostel, useUpdateMyHostel } from "../api/createHostelApi";
import UserHostelForm from "@/forms/user-hostel-form/UserHostelForm";
import BookingItemCard from "@/components/BookingItemCard";
import { useGetMyHostelBookings } from "@/api/bookingApi";
import { isError } from "react-query";

const UserHostelPage = () => {
    const { createHostel, isLoading: isCreateLoading } = useCreateMyHostel();

    const { updateHostel, isLoading: isUpdateLoading } = useUpdateMyHostel()
    const { bookings, isLoading ,isError } = useGetMyHostelBookings()

    const { hostel } = useGetMyHostel()

    const isEditing = !!hostel;

    console.log(hostel, "hostel");


    return (
        <>

            <Tabs defaultValue="bookings">
                <TabsList>
                    <TabsTrigger value="bookings">Bookings</TabsTrigger>
                    <TabsTrigger value="manage-hostel">Manage Restaurant</TabsTrigger>
                </TabsList>
                <TabsContent
                    value="bookings"
                    className="space-y-5 bg-gray-50 p-10 rounded-lg"
                >
                    <h2 className="text-2xl font-bold">{bookings?.length} active orders</h2>
                    {bookings?.map((booking: any, index: any) => (
                        <div key={index}>
                            <BookingItemCard booking={booking} isLoading={isLoading} isError={isError} />
                        </div>
                    ))}
                </TabsContent>
                <TabsContent value="manage-hostel">
                    <UserHostelForm hostel={hostel} onSave={isEditing ? updateHostel : createHostel} isLoading={isCreateLoading || isUpdateLoading} />

                </TabsContent>
            </Tabs>
        </>
    );
};

export default UserHostelPage;
