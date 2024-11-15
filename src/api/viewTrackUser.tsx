import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
// import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;




export const useViewTrackUser = () => {

    const { getAccessTokenSilently } = useAuth0();


    const trackViewRequest = async (viewTrackFormData: any) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/hostel/view-track`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(viewTrackFormData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create user');
        }

        return response.json();
    };

    const { mutate: trackViewUser, isLoading, isError } = useMutation(trackViewRequest);


    if (isError) {
        toast.error("we cannot track");
    }

    return {
        isLoading,
        trackViewUser,
    };
};





export const useGetViewTrackUser = (viewData: any) => {
    const { getAccessTokenSilently } = useAuth0();

    // Fetch data function
    const trackGetViewRequest = async () => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(
            `${API_BASE_URL}/api/hostel/view-track-data/${viewData.timeframe}/${viewData.hostelId}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch view track data');
        }

        return response.json();
    };

    // Using useQuery hook to fetch the data
    const { data: getTrackViewUser, isLoading, isError } = useQuery(
        ['fetchTrackView', viewData], // Make query key depend on viewData
        trackGetViewRequest,
        {
            enabled: Boolean(viewData.timeframe && viewData.hostelId), // Only trigger if necessary data is present
        }
    );

    // Error handling (only triggered when there is an error)
    useEffect(() => {
        if (isError) {
            toast.error("We cannot track the data.");
        }
    }, [isError]);

    return {
        isLoading,
        getTrackViewUser,
    };
};