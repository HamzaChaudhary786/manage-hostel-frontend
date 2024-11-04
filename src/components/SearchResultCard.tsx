import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Link } from "react-router-dom";


type Props = {
    hostel: any;
}
const SearchResultCard = ({ hostel }: Props) => {

    return (
        <>
            <Link to={`/detail/${hostel?._id}`} className=" grid lg:grid-cols-[2fr_3fr] gap-5 group">

                <AspectRatio ratio={16 / 6}>
                    <img src={hostel.imageUrl} className=" w-full object-cover h-full" alt="" />


                </AspectRatio>
                <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
                        {
                            hostel?.name
                        }

                    </h3>
                    <h3 className="text-lg font-semibold tracking-tight mb-2">
                        City : {
                            hostel?.city
                        }
                    </h3>
                    <p>
                        {hostel.address}
                    </p>
                </div>
            </Link >
        </>
    )
}

export default SearchResultCard