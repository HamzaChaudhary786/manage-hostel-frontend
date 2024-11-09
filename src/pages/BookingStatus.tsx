import { useGetMyBooking } from "@/api/bookingApi"
import BookingCard from "@/components/BookingCard";

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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {
                        booking.map((book: any) => {
                            return <BookingCard key={book._id} book={book} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default BookingStatus