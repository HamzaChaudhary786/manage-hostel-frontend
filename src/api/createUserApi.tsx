import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

export const useCreateMyUser = () => {

    const { getAccessTokenSilently } = useAuth0();


    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/auth`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create user');
        }

        return response.json();
    };

    const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createMyUserRequest);

    return {
        isLoading,
        isError,
        isSuccess,
        createUser,
    };
};



type UpdateMyUserRequest = {
    username: string;
    addressLine1: string;
    city: string;
    country: string;
    imageUrl: string;
};

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await fetch(`${API_BASE_URL}/api/auth`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user');
            }

            return response.json();
        } catch (error: any) {
            console.error("Error updating user:", error);
            throw error;
        }
    };

    const { mutateAsync: updateUser, isLoading, isSuccess, isError, error, reset } = useMutation(updateMyUserRequest, {
        onSuccess: () => {
            toast.success("User profile updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update user");
        },
        onSettled: () => {
            reset();
        },
    });

    return {
        isLoading,
        updateUser,
        isSuccess,
        isError,
        error,
    };
};




export const useGetMyUser = () => {

    const { getAccessTokenSilently } = useAuth0();

    const getMyUserRequest = async () => {

        const accessToken = await getAccessTokenSilently();


        const response = await fetch(`${API_BASE_URL}/api/auth`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },

        });

        if (!response.ok) {
            throw new Error('Failed to get user');
        }

        return await response.json();

    }

    const { data: currentUser, isLoading, error } = useQuery("fetchCurrentUser", getMyUserRequest)

    if (error) {

        toast.error(error.toString())
    }

    return {
        isLoading,
        currentUser,
    };


};