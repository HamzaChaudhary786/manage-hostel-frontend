import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";



type Props = {
    booking: any;
    isLoading: boolean;
    isError: any;
}

const BookingItemCard = ({ booking, isLoading, isError }: Props) => {


    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!booking) {
        return <div>No booking found.</div>
    }
    if (isError) {
        return <div>No booking found.</div>
    }




    console.log(booking, "booking");


    return (
        <>
            <Card>
                <CardHeader className="gap-4">
                    <CardTitle className="grid md:grid-cols-3 gap-4 justify-between mb-3">
                        <div>
                            Customer Name:
                            <span className="ml-2 font-normal">
                                {booking.user.username}
                            </span>

                        </div>
                        <div>
                            Address:
                            <span className="ml-2 font-normal">
                                {booking.user.addressLine1}
                            </span>
                        </div>
                        <div>
                            Status:
                            <span className="ml-2 font-normal">
                                {booking.status}
                            </span>
                        </div>

                    </CardTitle>

                    <Separator />


                    <CardTitle className="grid md:grid-cols-3 gap-4 justify-between mb-3">
                        <div>
                            Room Id:
                            <span className="ml-2 font-normal">
                                {booking.roomId}
                            </span>

                        </div>
                        <div>
                            Start Date:
                            <span className="ml-2 font-normal">
                                {booking.checkInDate}
                            </span>
                        </div>
                        <div>
                            End Date:
                            <span className="ml-2 font-normal">
                                {booking.checkOutDate}
                            </span>
                        </div>

                    </CardTitle>

                </CardHeader>





            </Card >
        </>
    )
}

export default BookingItemCard