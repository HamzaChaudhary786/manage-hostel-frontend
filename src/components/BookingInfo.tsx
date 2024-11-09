import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import { Button } from "./ui/button";
import { FaCalendarAlt } from 'react-icons/fa';
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useCreateCheckoutSession } from "@/api/bookingApi";
import LoadingButton from "./LoadingButton";


type Props = {
    ID: any;
    setID: (value: string) => void;
    room: any;
    hostel: any;

}
const BookingInfo = ({ ID, setID, room, hostel }: Props) => {

    console.log(room, "room");

    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const { createCheckoutSession, isLoading } = useCreateCheckoutSession()


    const getNumberOfNights = () => {
        if (!startDate || !endDate) return 0;
        const timeDiff = endDate.getTime() - startDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
    };

    // Calculate total price
    const getTotalPrice = () => {
        const nights = getNumberOfNights();

        // Check if the checkout date is the same as the check-in date
        if (nights === 0) {
            // Client checks out the same day, charge for one night
            return room.pricePerNight;
        } else {
            // Client stays multiple nights, charge accordingly
            return nights * room.pricePerNight;
        }
    };


    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault()


        const booking = {
            hostelId: hostel._id,
            roomId: ID,
            checkInDate: startDate?.toISOString(),
            checkOutDate: endDate?.toISOString(),
        }
        const data = await createCheckoutSession(booking)

        window.location.href = data.url;

    }


    return (
        <>
            <Dialog >
                <DialogTrigger onClick={() => setID(room?._id)} className="w-full">
                    <Button className="w-full">Booking</Button>
                </DialogTrigger>
                <DialogContent>

                    <form action="" onSubmit={handleBooking} className="space-y-4">

                        <h1>
                            Booking Details for {room?.type}
                        </h1>
                        <div className="date-range-selector">

                            <div>
                                <label>Start Date:</label>
                                <div className="flex flex-row relative items-center">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => {
                                            setStartDate(date || undefined);
                                            if (endDate && date && date > endDate) {
                                                setEndDate(undefined);
                                            }
                                        }}
                                        placeholderText="yyyy/MM/dd"
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="yyyy/MM/dd"
                                        className="input-field cursor-pointer"
                                    />
                                    <div className="absolute left-2">
                                        <FaCalendarAlt />
                                    </div>
                                </div>
                            </div>
                            <div className="date-picker">
                                <label>End Date:</label>
                                <div className="flex flex-row relative items-center">
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date || undefined)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        placeholderText="yyyy/MM/dd"

                                        dateFormat="yyyy/MM/dd"
                                        className="input-field cursor-pointer"
                                    />
                                    <div className="absolute left-2">
                                        <FaCalendarAlt />
                                    </div>
                                </div>
                            </div>

                            <h1>Total Price: {getTotalPrice()}$</h1>
                        </div>
                        <Button className="w-full" type="submit">
                            {isLoading ? (<><LoadingButton /></>) : (<><span> Booking Now</span></>)}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BookingInfo