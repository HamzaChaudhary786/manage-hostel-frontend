import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Dot } from "lucide-react";
import { Button } from "./ui/button";
import { useUpdateCheckoutSession } from "@/api/bookingApi";
import LoadingButton from "./LoadingButton";


type Props = {
    book: any
}
const BookingCard = ({ book }: Props) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { updateCheckoutSession, isLoading } = useUpdateCheckoutSession()

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % book.room.images.length
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + book.room.images.length) % book.room.images.length
        );
    };






    const handleBooking = async (bookingId: string) => {

        const data = await updateCheckoutSession(bookingId)

        window.location.href = data.url;


    }


    console.log(book, "Booking data updated");



    return (
        <>


            <Card key={book._id} className="space-x-0 space-y-0">
                <CardHeader title={book.room.type} />



                <CardContent className="space-y-2">


                    {/* Image display with navigation buttons */}
                    <div className="relative">
                        <img
                            src={book.room.images[currentImageIndex]}
                            alt={`book image ${currentImageIndex + 1}`}
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                            <button onClick={prevImage} className="p-2 bg-white rounded-l-lg shadow-md">
                                <FaChevronLeft />
                            </button>
                        </div>
                        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                            <button onClick={nextImage} className="p-2 bg-white rounded-r-lg shadow-md">
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                    <CardTitle>{book.room.type}</CardTitle>

                    <div className="flex flex-row items-center skew-x-2 space-x-2">
                        {book.room.amenities.map((amenity: any, amenityIndex: any) => (
                            <React.Fragment key={amenityIndex}>
                                <CardTitle>{amenity}</CardTitle>
                                {amenityIndex < book.room.amenities.length - 1 && <Dot />}
                            </React.Fragment>
                        ))}
                    </div>
                    <div>
                        status: {book.status}
                    </div>
                    <CardDescription>Price Per Night: {book.room.pricePerNight}$</CardDescription>

                    <div>
                        {
                            book.status === "pending" && (
                                <Button className="w-full" onClick={() => handleBooking(book.bookingId)}>
                                    {isLoading ? (<><LoadingButton /></>) : (<><span> Booking</span></>)}
                                </Button>

                            )

                        }
                    </div>




                </CardContent>


            </Card >


        </>
    )
}

export default BookingCard