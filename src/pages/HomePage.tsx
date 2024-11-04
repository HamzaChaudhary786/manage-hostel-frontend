import SearchBar from '@/components/SearchBar'
import LandingImage from '../assets/tourist.jpg'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const navigate = useNavigate()

    const handleSearchForm = (searchFormValues: any) => {
        // Add your search logic here

        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`
        })
    }

    return (
        <>
            <div className="flex flex-col gap-12 ">
                <div className="px-4 md:px-32 flex flex-col gap-5 text-center -mt-16">

                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-5 relative items-center justify-items-center">
                    <img src={LandingImage} className='w-full rounded-2xl h-[90vh] object-cover' />
                    <div className="flex flex-col items-center justify-center gap-4 text-center absolute">

                        <SearchBar
                            onSubmit={handleSearchForm}
                            placeHolder="Search by City or Town"
                            searchQuery=""
                        />

                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage