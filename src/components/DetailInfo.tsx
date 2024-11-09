import RoomsInfo from "./RoomsInfo"

type Props = {
    hostel: any
}
const DetailInfo = ({ hostel }: Props) => {
    return (
        <>
            <div className="relative ">
                <div className=" w-[calc(100%+5rem)] -ml-10">

                    <img src={hostel.imageUrl} className=" w-full object-cover h-[45vh]" alt="" />

                </div>

                <div className="absolute top-10 left-10 space-y-1 text-white">

                    <h1 className="text-6xl font-bold  text-stroke ">
                        {hostel.name}
                    </h1>
                    <p className="text-4xl font-bold text-stroke">
                        {hostel.address}
                    </p>
                    <h3 className="text-3xl font-bold text-stroke">
                        {hostel.city}
                    </h3>

                </div>

                <RoomsInfo hostel={hostel} />

            </div>
        </>
    )
}

export default DetailInfo