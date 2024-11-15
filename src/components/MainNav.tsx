
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './ui/button'
import UsernameMenu from '../components/UsernameMenu'
import { Link, useNavigate } from 'react-router-dom'
import { useGetMyHostel } from '@/api/createHostelApi'

const MainNav = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0()
    const { hostel } = useGetMyHostel()
    const navigate = useNavigate()

    console.log(hostel, "hostel hahaha");

    return (
        <div className='flex space-x-2 items-center'>
            {
                isAuthenticated ? (
                    <>
                        <Link to="/booking-status" className=' font-bold hover:text-orange-500 cursor-pointer'>
                            Booking Status
                        </Link>

                        {hostel?.data && (
                            <div className='hover:text-orange-500 font-bold cursor-pointer' onClick={() => {
                                navigate('/dashboard', { state: { hostelId: hostel?.data._id } }); // Adjust index as needed
                            }}>
                                Dashboard
                            </div>
                        )}

                        <UsernameMenu />

                    </>
                ) : <Button variant="ghost" className='font-bold hover:text-orange-500 hover:bg-white'
                    onClick={async () => await loginWithRedirect()}>
                    Login
                </Button>
            }

        </div >
    )
}

export default MainNav