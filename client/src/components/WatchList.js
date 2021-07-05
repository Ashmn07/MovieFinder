import React,{useState,useEffect,useContext} from 'react'
import Navbar from './Navbar'
import {UserContext} from '../App'
import Footer from './Footer'
import MovieCard from './MovieCard'
import {Link} from 'react-router-dom'

function WatchList() {

    const [movies,setMovies] = useState()
    const [tv,setTV] = useState()
    const [show,setShow] = useState('movie')

    const {state,dispatch} = useContext(UserContext)

    useEffect(() => {
        console.log(state)
        setMovies(state.watchList.filter(list=>list.entType==="movie"))
        setTV(state.watchList.filter(list=>list.entType==="tv"))
    },[state])

    // useEffect(() => {console.log(movies)},[movies])
    // useEffect(() => {console.log(tv)},[tv])

    const MovieCardsDetails = () => {
        console.log(movies)
        return(
            <div className="flex justify-center mb-4 pb-12">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
               {movies?.map(m =>(
                     <div className="rounded shadow-card w-32 md:w-72 my-10 sm:mx-7 mx-3 flex flex-col justify-evenly transition duration-100 cursor-pointer transform hover:scale-105"
                     key={m.entId}>
                     <Link to={`/movie/${m.entId}`}>
                       <img src={m.entPic}
                       alt={m.entName}
                       className="w-32 md:w-72"
                       />
                       <div className="mt-2 mb-1 mx-2 md:mt-4 md:mb-2 md:mx-4 flex flex-col justify-between">
                         <span className="text-xs sm:text-lg font-montserrat text-white text-space tracking-wide "> {m.entName}</span>
                         <div className="flex justify-between mt-4 items-center">
                           <span className="text-white text-xs sm:text-lg">{m.entYear}</span>
                           <span className="text-white bg-red-600 p-1 sm:p-2 rounded-3xl text-xs sm:text-base flex items-center">{m.entRating}
                           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                           </svg>
                           </span>
                         </div>
                       </div>
                       </Link>
                     </div>
                ))}
                </div>
            </div>
        )
    }

    const TVCardsDetails = () => {
        console.log(tv)
        return(
            <div className="flex justify-center mb-4 pb-12">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
               {tv?.map(t =>(
                     <div className="rounded shadow-card w-32 md:w-72 my-10 sm:mx-7 mx-3 flex flex-col justify-evenly transition duration-100 cursor-pointer transform hover:scale-105"
                     key={t.entId}>
                     <Link to={`/tv/${t.entId}`}>
                       <img src={t.entPic}
                       alt={t.entName}
                       className="w-32 md:w-72"
                       />
                       <div className="mt-2 mb-1 mx-2 md:mt-4 md:mb-2 md:mx-4 flex flex-col justify-between">
                         <span className="text-xs sm:text-lg font-montserrat text-white text-space tracking-wide "> {t.entName}</span>
                         <div className="flex justify-between mt-4 items-center">
                           <span className="text-white text-xs sm:text-lg">{t.entYear}</span>
                           <span className="text-white bg-red-600 p-1 sm:p-2 rounded-3xl text-xs sm:text-base flex items-center">{t.entRating}
                           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                           </svg>
                           </span>
                         </div>
                       </div>
                       </Link>
                     </div>
                ))}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-bgGray h-full w-full min-h-screen">
        <Navbar/>
        <span className="font-montserrat text-center pt-20 p-3 tracking-wider block text-white text-xl sm:text-4xl font-extrabold">MY WATCH LIST</span>
        <ul className="flex justify-center list-none">
            <li className={`text-base sm:text-xl px-6 py-3 sm:py-4 sm:px-8 border-b-2 ${show==="movie" && "border-red-600 text-red-600 hover:border-white hover:text-white"} border-white text-white hover:border-red-600 hover:text-red-600 cursor-pointer`} onClick={()=>show==="tv"?setShow("movie"):null}>Movies</li>
            <li className={`text-base sm:text-xl px-6 py-3 sm:py-4 sm:px-8 border-b-2 ${show==="tv" && "border-red-600 text-red-600 hover:border-white hover:text-white"} border-white text-white hover:border-red-600 hover:text-red-600 cursor-pointer`} onClick={()=>show==="movie"?setShow("tv"):null}>TV Shows</li>
        </ul>
        {show==="movie" && <MovieCardsDetails/>}
        {show==="tv" && <TVCardsDetails/>}
        <Footer/>
        </div>
    )
}

export default WatchList
