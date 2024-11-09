import { useState } from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { isError } from "react-query";



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




    const [status, setStatus] = useState<any>(booking.status)


    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
                        <div>
                            Customer Name:
                            <span className="ml-2 font-normal">
                                {booking.name}
                            </span>

                        </div>

                    </CardTitle>

                    <Separator />
                </CardHeader>


            </Card >
        </>
    )
}

export default BookingItemCard