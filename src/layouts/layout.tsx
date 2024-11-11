import Footer from "@/components/Footer";
import Nabar from "@/components/Navbar";
import React from "react"


type Props = {
    children: React.ReactNode;

}

function layout({ children }: Props) {
    return (
        <>
            <div className="">

                <Nabar />
                <div className="container flex-1 min-h-screen mx-auto p-4 lg:p-10 ">
                    {children}
                </div>
                <Footer />


            </div>

        </>
    )
}


export default layout
