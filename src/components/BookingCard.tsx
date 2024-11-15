import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Dot } from "lucide-react";
import { Button } from "./ui/button";
import { useUpdateCheckoutSession } from "@/api/bookingApi";
import LoadingButton from "./LoadingButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"; // Assuming you're using ShadCN UI

type Props = {
    bookings: any[]; // Array of bookings
};

const BookingTable = ({ bookings }: Props) => {
    const { updateCheckoutSession, isLoading } = useUpdateCheckoutSession();

    const handleBooking = async (bookingId: string) => {
        const data = await updateCheckoutSession(bookingId);
        window.location.href = data.url;
    };

    console.log(bookings, "update");


    return (
        <Table className="min-w-full">
            <TableHeader>
                <TableRow>
                    <TableHead>Room Type</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Amenities</TableHead>
                    <TableHead>Booking Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price Per Night</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings.map((book) => (
                    <TableRow key={book._id}>
                        <TableCell>{book.room.type}</TableCell>

                        {/* Image Display */}
                        <TableCell>
                            <img
                                src={book.room.images[0]} // Displaying the first image only
                                alt={`Room image`}
                                className="w-24 h-12 object-cover"
                            />
                        </TableCell>

                        {/* Amenities */}
                        <TableCell>
                            <div className="flex flex-wrap items-center space-x-2">
                                {book.room.amenities.map((amenity: string, amenityIndex: number) => (
                                    <React.Fragment key={amenityIndex}>
                                        <span>{amenity}</span>
                                        {amenityIndex < book.room.amenities.length - 1 && <Dot />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div>
                                {new Date(book.checkInDate).toLocaleDateString("en-US")} to {new Date(book.checkOutDate).toLocaleDateString("en-US")}
                            </div>

                        </TableCell>

                        {/* Status */}
                        <TableCell>{book.status}</TableCell>

                        {/* Price Per Night */}
                        <TableCell>{book.room.pricePerNight}$</TableCell>

                        {/* Actions */}
                        <TableCell className="flex space-x-2 items-center justify-center ">
                            {book.status === "pending" && (
                                <Button className="w-full" onClick={() => handleBooking(book.bookingId)}>
                                    {isLoading ? <LoadingButton /> : <span>Booking</span>}
                                </Button>
                            )}
                            <button className="p-2 bg-blue-500 rounded text-white hover:bg-blue-700">
                                <FaEdit />
                            </button>
                            <button className="p-2 bg-red-500 rounded text-white hover:bg-red-700">
                                <FaTrash />
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BookingTable;

