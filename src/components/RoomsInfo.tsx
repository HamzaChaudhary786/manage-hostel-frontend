
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Dot } from "lucide-react";
import React, { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import BookingInfo from "./BookingInfo";



type Props = {
    hostel: any;

}
const RoomsInfo = ({ hostel }: Props) => {

    const [ID, setID] = useState<string>();


    console.log(hostel, "hostel");


    return (
        <>
            <h1 className="mt-16 text-3xl font-bold" >Rooms </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-around gap-8 mt-16">
                {hostel.rooms.map((room: any) => {
                    // State to manage the current image index
                    const [currentImageIndex, setCurrentImageIndex] = useState(0);

                    const nextImage = () => {
                        setCurrentImageIndex((prevIndex) =>
                            (prevIndex + 1) % room.images.length
                        );
                    };

                    const prevImage = () => {
                        setCurrentImageIndex((prevIndex) =>
                            (prevIndex - 1 + room.images.length) % room.images.length
                        );
                    };


                    return (
                        <Card key={room._id}>
                            <CardHeader title={room.type} />

                            <CardContent className="space-y-2">


                                {/* Image display with navigation buttons */}
                                <div className="relative">
                                    <img
                                        src={room.images[currentImageIndex]}
                                        alt={`Room image ${currentImageIndex + 1}`}
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
                                <CardTitle>{room.type}</CardTitle>

                                <div className="flex flex-row items-center skew-x-2 space-x-2">
                                    {room.amenities.map((amenity: any, amenityIndex: any) => (
                                        <React.Fragment key={amenityIndex}>
                                            <CardTitle>{amenity}</CardTitle>
                                            {amenityIndex < room.amenities.length - 1 && <Dot />}
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div>
                                    Rating
                                </div>
                                <CardDescription>Price Per Night: {room.pricePerNight}$</CardDescription>

                                <BookingInfo ID={ID} setID={setID} room={room} hostel={hostel} />


                            </CardContent>


                        </Card>
                    );
                })}



            </div >
        </>
    )
}

export default RoomsInfo