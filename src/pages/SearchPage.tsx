import { useSearchRestaurant } from "@/api/searchHostelApi";
import AmenitiesFilter from "@/components/AmenitiesFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SearchPage = () => {
    const [searchState, setSearchState] = useState<any>({
        searchQuery: "",
        page: 1,
        selectedAmenities: [],
        sortOption: "bestMatch",
    });
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { city } = useParams();
    const { results, isLoading } = useSearchRestaurant(searchState, city);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const setSelectedAmenities = (selectedAmenities: string[]) => {
        setSearchState((prev: any) => ({
            ...prev,
            selectedAmenities, // Fixed this line
            page: 1,
        }));
    };

    const setSearchQuery = (searchFormData: any) => {
        setSearchState((prev: any) => ({
            ...prev,
            searchQuery: searchFormData.searchQuery,
            page: 1,
        }));
    };

    const resetSearch = () => {
        setSearchState((prev: any) => ({
            ...prev,
            searchQuery: "",
            selectedAmenities: [],
            page: 1,
        }));
    };

    const setPage = (page: number) => {

        setSearchState((prev: any) => ({
            ...prev,
            page,
        }))

    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <AmenitiesFilter
                    onChange={setSelectedAmenities}
                    selectedAmenities={searchState.selectedAmenities}
                    isExpanded={isExpanded}
                    onExpandedClick={() => setIsExpanded((prevExpanded) => !prevExpanded)}
                />
            </div>
            <div className="main-content space-y-6" id="main-content">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeHolder="Search by cuisines or restaurant name"
                    onReset={resetSearch}
                />
                <div className="flex justify-between items-center flex-col lg:flex-row gap-3 space-y-6">
                    <SearchResultInfo total={results?.pagination?.total} city={city} />
                </div>
                <div className="space-y-5">
                    {results?.data.map((hostel: any) => (
                        <SearchResultCard key={hostel._id} hostel={hostel} />
                    ))}
                    {/* Uncomment the PaginationSelector once backend pagination is set up */}
                    <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
