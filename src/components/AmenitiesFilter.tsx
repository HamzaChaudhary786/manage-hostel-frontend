import { amenitiesList } from "@/commonComponents/AmenitiesList";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
    onChange: (value: any) => void;
    selectedAmenities: string[];
    isExpanded: boolean;
    onExpandedClick: (value: any) => void;
};

const AmenitiesFilter = ({ onChange, isExpanded, onExpandedClick, selectedAmenities }: Props) => {
    const handleAmenitiesReset = () => {
        onChange([]);
    };

    const handleAmenitiesChange = (event: React.FormEvent<HTMLInputElement>) => {
        const clickedAmenity = event.currentTarget.value;
        const isChecked = event.currentTarget.checked;
        const newAmenitiesList = isChecked
            ? [...selectedAmenities, clickedAmenity]
            : selectedAmenities.filter((amenity) => amenity !== clickedAmenity);

        onChange(newAmenitiesList);
    };

    return (
        <>
            <div className="flex justify-between px-2 items-center">
                <div className="text-md font-semibold mb-2">Filter By Amenities</div>
                <div className="text-sm font-semibold mb-2 underline cursor-pointer" onClick={handleAmenitiesReset}>
                    Reset Filter
                </div>
            </div>

            <div className="space-y-2 flex flex-col">
                {amenitiesList.slice(0, isExpanded ? amenitiesList.length : 7).map((amenity) => {
                    const isSelected = selectedAmenities.includes(amenity);
                    return (
                        <div className="flex" key={amenity}>
                            <input
                                type="checkbox"
                                id={`amenity_${amenity}`}
                                className="hidden"
                                value={amenity}
                                checked={isSelected}
                                onChange={handleAmenitiesChange}
                            />
                            <Label
                                htmlFor={`amenity_${amenity}`}
                                className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                                    isSelected ? "border border-green-600 text-green-600" : "border border-slate-300"
                                }`}
                            >
                                {isSelected && <Check size={20} strokeWidth={3} />}
                                {amenity}
                            </Label>
                        </div>
                    );
                })}
            </div>

            <Button variant="outline" className="mt-4 flex-1" onClick={onExpandedClick}>
                {isExpanded ? (
                    <span className="flex flex-row items-center">
                        View Less <ChevronUp />
                    </span>
                ) : (
                    <span className="flex flex-row items-center">
                        View More <ChevronDown />
                    </span>
                )}
            </Button>
        </>
    );
};

export default AmenitiesFilter;
