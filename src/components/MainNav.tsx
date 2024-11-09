
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './ui/button'
import UsernameMenu from '../components/UsernameMenu'
import { Link } from 'react-router-dom'

const MainNav = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0()
    return (
        <div className='flex space-x-2 items-center'>
            {
                isAuthenticated ? (
                    <>
                        <Link to="/booking-status" className=' font-bold hover:text-orange-500 cursor-pointer'>
                            Booking Status
                        </Link>
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