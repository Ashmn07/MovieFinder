import React from 'react'

function Banner({banner}) {

    const bannerStyle = {
        backgroundImage: `linear-gradient(0deg, rgba(20,20,20,1) 4%, rgba(20,20,20,0.46) 100%),url("https://image.tmdb.org/t/p/original/${banner?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height:'70vh'
    }
    
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    return (
        <div className="pt-10 flex flex-col justify-between" style={bannerStyle}>
        <div className="pt-20 px-5">
          <span className="m-1 p-2 text-white md:p-5 font-bold text-xl md:text-5xl max-w-3xl font-montserrat">
            {banner?.title || banner?.original_title}
          </span>
          <div className="m-1 mt-3 mb-1 md:mt-6 md:mb-3 p-1">
          <span className="py-1 px-2 m-2 md:px-5 md:m-4 bg-bgButton text-white hover:text-black hover:bg-white cursor-pointer">More Info</span>
          <span className="py-1 px-2 m-2 md:px-5 md:m-4 bg-bgButton text-white hover:text-black hover:bg-white cursor-pointer">Add To List</span>
          </div>
          <div className="m-3 p-3 max-w-lg md:font-semibold text-white">
            {truncate(banner?.overview, 150)} 
          </div>
        </div>  
        {/* <div className="bg-gradient-to-t from-black h-5" /> */}
        </div>
    )
}

export default Banner
