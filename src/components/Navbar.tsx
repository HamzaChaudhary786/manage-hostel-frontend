import { Link } from 'react-router-dom'
import MainNav from './MainNav'

const Navbar = () => {
    return (
        <>
            <div className="border-b-2 border-b-orange-500 p-10">
                <div className="container mx-auto flex justify-between items-center">
                    <Link
                        to="/"
                        className="text-3xl font-bold tracking-tight text-orange-500"
                    >
                        MernHostel.com
                    </Link>
                    <div className="md:hidden">
                        {/* <MobileNav /> */}
                    </div>
                    <div className="hidden md:block">
                        <MainNav />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar