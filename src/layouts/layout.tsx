import React from "react"


type Props = {
    children: React.ReactNode;

}

function layout({ children }: Props) {
    return (
        <>
            <div className="">

                <h1>Navbar</h1>
                <div className="container flex-1 mx-auto p-10 ">
                    {children}
                </div>
                <h2>Footer</h2>


            </div>

        </>
    )
}


export default layout
