import { useEffect } from "react"
import RoomsInfo from "./RoomsInfo"
import { useViewTrackUser } from "@/api/viewTrackUser"

type Props = {
    hostel: any
}
const DetailInfo = ({ hostel }: Props) => {

    const { trackViewUser, isLoading } = useViewTrackUser()

    useEffect(() => {

        const ViewUser = async () => {

            let viewData = {
                hostelId: hostel._id
            }

            trackViewUser(viewData);


        }


        ViewUser()

    }, [])

    if (isLoading) return <p>Loading...</p>
    return (
        <>
            <div className="relative ">
                <div className=" w-[calc(100%+2rem)] -ml-4 lg:w-[calc(100%+5rem)] lg:-ml-10">

                    <img src={hostel.imageUrl} className=" w-full object-cover h-[45vh]" alt="" />

                </div>

                <div className="absolute top-20 lg:top-10  lg:left-10 space-y-1 text-white">

                    <h1 className="text-4xl lg:text-6xl font-bold  text-stroke ">
                        {hostel.name}
                    </h1>
                    <p className="text-3xl lg:text-4xl font-bold text-stroke">
                        {hostel.address}
                    </p>
                    <h3 className="text-2xl  lg:text-3xl font-bold text-stroke">
                        {hostel.city}
                    </h3>

                </div>

                <RoomsInfo hostel={hostel} />

            </div>
        </>
    )
}

export default DetailInfo