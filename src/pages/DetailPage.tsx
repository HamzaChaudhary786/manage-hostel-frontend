import { useGetSingleHostel } from "@/api/searchHostelApi"
import DetailInfo from "@/components/DetailInfo"
import { useParams } from "react-router-dom"

const DetailPage = () => {

    const { hostelId } = useParams()


    const { hostel, isLoading } = useGetSingleHostel(hostelId)

    if (isLoading) {
        return (
            <>
                Loading ...
            </>
        )
    }
    return (
        <>
            <div>
                <DetailInfo hostel={hostel} />
            </div>
        </>
    )
}

export default DetailPage