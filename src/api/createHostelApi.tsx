
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



export const useCreateMyHostel = () => {

    const { getAccessTokenSilently } = useAuth0();


    const createMyHostelRequest = async (hostelFormData: any) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/hostel`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hostelFormData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create user');
        }

        return response.json();
    };

    const { mutate: createHostel, isLoading, isError, isSuccess } = useMutation(createMyHostelRequest);

    if (isSuccess) {
        toast.success("Hostel created successfully!");
    }
    if (isError) {
        toast.error("Failed to create hostel!");
    }

    return {
        isLoading,
        createHostel,
    };
};




export const useUpdateMyHostel = () => {

    const { getAccessTokenSilently } = useAuth0();


    const updateMyHostelRequest = async (hostelFormData: any) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/hostel`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hostelFormData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create user');
        }

        return response.json();
    };

    const { mutate: updateHostel, isLoading, isError, isSuccess } = useMutation(updateMyHostelRequest);

    if (isSuccess) {
        toast.success("Hostel updated successfully!");
    }
    if (isError) {
        toast.error("Failed to update hostel!");
    }

    return {
        isLoading,
        updateHostel,
    };
};





export const useGetMyHostel = () => {

    const { getAccessTokenSilently } = useAuth0();


    const getMyHostelRequest = async () => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/hostel`, {
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

    const { data: hostel, isLoading } = useQuery("fetchMyHostel", getMyHostelRequest);

    return {
        isLoading,
        hostel,
    };
};