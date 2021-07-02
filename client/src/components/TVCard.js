import React from 'react'
import {Link} from 'react-router-dom'

function TVCard({detail}) {
    let imgSrc;
    if(detail.poster_path){
      imgSrc =`https://image.tmdb.org/t/p/w300${detail.poster_path}`
    }
    else{
      imgSrc = 'https://www.movienewz.com/img/films/poster-holder.jpg'
    }
    return (
    <div className="rounded shadow-card w-32 md:w-72 my-10 sm:mx-7 mx-3 flex flex-col justify-evenly transition duration-100 cursor-pointer transform hover:scale-105">
        <Link to={`/tv/${detail.id}`}>
        <img src={imgSrc}
        alt={detail?.original_title}
        className="w-32 md:w-72"
        />
        <div className="mt-2 mb-1 mx-2 md:mt-4 md:mb-2 md:mx-4 flex flex-col justify-between">
          <span className="text-xs sm:text-lg font-montserrat text-white text-space tracking-wide "> {detail?.name || detail?.original_name}</span>
          <div className="flex justify-between mt-4 items-center">
            <span className="text-white text-xs sm:text-lg">{detail?detail.first_air_date?.substr(0,4):null}</span>
            <span className="text-white bg-red-600 p-1 sm:p-2 rounded-3xl text-xs sm:text-base flex items-center">{detail?(detail.vote_average%1==0)?detail.vote_average+".0":detail.vote_average:null}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            </span>
          </div>
        </div>
        </Link>
      </div>
    )
}

export default TVCard
