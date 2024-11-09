

const Footer = () => {
    return (
        <>
            <footer className="bg-gray-600 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0">
                        <div className="flex flex-col items-center md:items-start">
                            <h2 className="text-2xl font-bold">HostelManagement</h2>
                            <p className="text-gray-400 mt-2 text-center md:text-left">
                                Your reliable partner for hostel management and booking.
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row md:space-x-10 space-y-4 md:space-y-0">
                            <div>
                                <h3 className="font-semibold">Company</h3>
                                <ul className="mt-2 space-y-2">
                                    <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold">Support</h3>
                                <ul className="mt-2 space-y-2">
                                    <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold">Services</h3>
                                <ul className="mt-2 space-y-2">
                                    <li><a href="#" className="text-gray-400 hover:text-white">Booking</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Room Management</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">City Guide</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="my-6 border-t border-gray-700"></div>

                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                            <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm text-center md:text-right">
                                &copy; 2024 HostelManagement. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>



        </>
    )
}

export default Footer