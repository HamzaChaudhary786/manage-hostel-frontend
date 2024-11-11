import SearchBar from '@/components/SearchBar'
import LandingImage from '../assets/landing.webp'
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
            <div className="flex flex-col gap-12 w-full">

                <div className="grid  lg:grid-cols-1 gap-5 w-full relative items-center justify-items-center">
                    <div className='w-[calc(100%+2.5rem)] -ml-4 lg:w-[calc(100%+5rem)] lg:-m-6'>
                        <img src={LandingImage} className='w-full h-[90vh] object-cover ' />
                    </div>
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