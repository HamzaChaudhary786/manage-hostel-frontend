import { useGetMyBooking } from "@/api/bookingApi"
import BookingTable from "@/components/BookingCard";

const BookingStatus = () => {
    const { booking, isLoading, isError } = useGetMyBooking()


    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>No Booking Found</div>
    }

    return (
        <>

            <div className="w-full space-y-6">
                <div className="alert-container">
                    <h1 className="alert-message my-4">
                        If Booking Status is Pending, it will be canceled in 30 minutes.
                    </h1>
                </div>

                <div className="overflow-x-auto">
                    <BookingTable bookings={booking} />
                </div>

            </div>
        </>
    )
}

export default BookingStatus