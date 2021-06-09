import React from 'react'
import landing from '../images/land.jpg'

function Landing() {
    const landUrl = {
        background:`url(${landing})`,
        width:'100vw',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize: 'cover',
    }
    return (
    <div className="m-0 p-0 flex justify-center items-center bg-gradient-to-bl from-red-400 to-red-900 h-screen">
        <div className="bg-white rounded-lg flex h-3/4 w-3/4 md:w-3/4 lg:w-2/3 shadow-2xl">
            <div className="flex w-full">
                <div className="flex-1 h-full">
                <div className="self-center">
                <h4 className="text-center">Explore New Movies and TV Shows</h4>
                </div>
                </div>
                <div className="p-0 hidden lg:block lg:flex-1" style={landUrl}></div>
            </div>
        </div>
    </div>
    )
}

export default Landing
