import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (searchState: any, city?: string) => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedAmenities", searchState.selectedAmenities.join(",")); // Ensure backend reads this correctly
    params.set("sortOption", searchState.sortOption);

    const createSearchRequest = async (): Promise<any> => {
        const response = await fetch(`${API_BASE_URL}/api/hostel/search/${city}?${params.toString()}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Failed to get hostels");
        }

        return response.json();
    };

    const { data: results, isLoading } = useQuery(["searchHostels", searchState], createSearchRequest, { enabled: !!city });

    return {
        isLoading,
        results,
    };
};




export const useGetSingleHostel = (hostelId?: string) => {


    const singleHostelRequest = async (): Promise<any> => {
        const response = await fetch(`${API_BASE_URL}/api/hostel/${hostelId}`, {
            method: 'GET',
            
          

        });

        if (!response.ok) {
            throw new Error('Failed to get a restaurant');
        }

        return response.json();
    };

    const { data: hostel, isLoading } = useQuery("fetchHostelById", singleHostelRequest, { enabled: !!hostelId })

    return {
        isLoading,
        hostel,
    };
};