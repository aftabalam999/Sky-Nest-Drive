import React from 'react'
import imageUrl from '../assets/404.png'
const PageNotFound = () => {
    // const imageUrl = "https://cdn-icons-png.flaticon.com/512/2748/2748558.png"

    return (
            <div className="bg-white w-full h-screen flex items-center justify-center flex-col rounded-2xl mt-2 p-4 pb-40 text-gray-600">
            <div>
                <h2 className="text-9xl font-bold">404</h2>
                <p>Don't worry it's just 404 page not found</p>
            </div>
            <img src={imageUrl} alt="404 Error" />
            <div id="info">
                <h3>This page could not be found, but don't worry! Check out our home page.</h3>
            </div>
        </div >
    )
}

export default PageNotFound