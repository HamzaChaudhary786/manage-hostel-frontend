
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;




export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0();

    const checkoutSessionRequest = async (checkoutSessionRequest: any): Promise<any> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/room/checkout/create-checkout-session`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkoutSessionRequest),
        });

        if (!response.ok) {
            // Attempt to extract the error message from the response
            const errorData = await response.json();
            throw new Error(errorData.message || 'Unable to create checkout session');
        }

        return response.json();
    };

    const { mutateAsync: createCheckoutSession, isLoading, reset } = useMutation(checkoutSessionRequest, {
        onError: (error: any) => {
            // Show the error message in a toast
            toast.error(error.message || 'An unexpected error occurred');
            reset();
        },
    });

    return {
        createCheckoutSession,
        isLoading,
    };
};



export const useGetMyBooking = () => {

    const { getAccessTokenSilently } = useAuth0();


    const getMyBookingRequest = async () => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/room/booking`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create user');
        }

        return response.json();
    };

    const { data: booking, isLoading, isError } = useQuery("fetchMyBooking", getMyBookingRequest);

    return {
        isLoading,
        booking,
        isError
    };
};



export const useUpdateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateCheckoutSessionRequest = async (bookingId: any): Promise<any> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/room/checkout/create-checkout-session/${bookingId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Attempt to extract the error message from the response
            const errorData = await response.json();
            throw new Error(errorData.message || 'Unable to create checkout session');
        }

        return response.json();
    };

    const { mutateAsync: updateCheckoutSession, isLoading, reset } = useMutation(updateCheckoutSessionRequest, {
        onError: (error: any) => {
            // Show the error message in a toast
            toast.error(error.message || 'An unexpected error occurred');
            reset();
        },
    });

    return {
        updateCheckoutSession,
        isLoading,
    };
};




export const useGetMyHostelBookings = () => {

    const { getAccessTokenSilently } = useAuth0();



    const getMyRestaurantOrdersRequest = async (): Promise<any> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/room/my-hostel-booking`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get a restaurant');
        }

        return response.json();
    };

    const { data: bookings, isLoading, isError } = useQuery
        ("fetchMyHostelBookings", getMyRestaurantOrdersRequest);

    return {
        isLoading,
        bookings,
        isError,
    };
};