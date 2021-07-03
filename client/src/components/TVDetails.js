import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function TVDetails({match}) {
    const [tv,setTV] = useState()
    const [cast,setCast] = useState()

    const bannerStyle = {
        backgroundImage: `linear-gradient(0deg, rgba(20,20,20,1) 0%, rgba(20,20,20,0.8071603641456583) 100%),url("https://image.tmdb.org/t/p/original/${tv?.backdrop_path}")`,
        backgroundSize: "cover",
        objectFit:'contain',
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        // height:'90vh'
    }

    const API_KEY = "d6119874269137f5b378b66f7d37305d";
    let imgSrc=`https://image.tmdb.org/t/p/w300`
    let defSrc = 'https://www.tvnewz.com/img/films/poster-holder.jpg'

    useEffect(() => {
        const tvUrl = `https://api.themoviedb.org/3/tv/${match.params.tvId}?api_key=${API_KEY}&append_to_response=videos,credits`
        const fetchMovie = async () => {
            const result = await fetch(tvUrl)
            const data = await result.json()
            console.log(data)
            setTV(data)
            setCast(data.credits.cast)
        }
        fetchMovie()
    },[match.params.movieId])

    if (!tv) return(
        <div
        className="flex justify-center items-center h-screen bg-bgGray text-white text-2xl"
        >
          <h1>Loading...</h1>
        </div>
    );

    return (
        <div className="bg-bgGray h-full w-full min-h-screen">
            <Navbar/>
            <div className="pt-20 h-max" style={bannerStyle}>
                <div className="flex flex-col mx-7 sm:flex-row pt-14 md:mx-14">
                    <img src={tv?imgSrc+tv.poster_path:defSrc} alt={tv?.name} className="w-48 md:w-72 self-center my-5"/>
                        <div className="flex flex-1 flex-col items-center sm:items-start sm:px-5">
                            <span className="m-1 p-2 text-white md:p-5 font-bold text-xl md:text-5xl max-w-3xl font-montserrat">
                                {tv?.name || tv?.original_name}{" "}
                                <span>({tv?.first_air_date.substring(0, 4)})</span>
                            </span>
                            {tv?.number_of_episodes !== 0 ? (
                                <p className="text-white m-1 px-5 text-base sm:text-2xl">
                                Seasons {" : "}{tv?.number_of_seasons % 60}{" "}  Episodes {" : "} {tv?.number_of_episodes}{" "}
                                </p>
                            ) : (
                                <p></p>
                            )}{" "}
                             <div className="m-1 mt-2 px-3 text-sm sm:text-xl text-white flex">
                                {tv?.genres.slice(0, 4).map((m, i) => {
                                return (
                                    <p
                                    key={m.id * Math.floor(Math.random() * 100)}
                                    className="ml-3"
                                    >
                                    {m.name}
                                    </p>
                                );
                                })}
                            </div>
                            <div className="m-1 mt-3 md:mt-6 md:mb-3 p-1">
                                <span className="py-2 px-2 m-2 md:px-5 md:m-4 bg-bgButton text-white hover:text-black hover:bg-white cursor-pointer">Add To List</span>
                            </div>
                            <div className="mt-5 pb-5 sm:m-3 sm:p-3 text-base sm:text-xl text-white font-roboto">
                                {tv?.overview} 
                            </div>
                        </div> 
                </div>
            </div>
            <h1 className="mt-10 px-10 sm:px-20 text-lg sm:text-3xl font-bold font-montserrat text-white">Cast</h1>
            <div className="pb-16 flex px-10 sm:px-20 text-base sm:text-lg overflow-x-scroll scrollbar-hide">
                {cast?.map(c=>(
                    <div className="flex flex-col text-center m-5 min-w-max" key={c.cast_id}>
                        <img src={c.profile_path?`https://image.tmdb.org/t/p/w185${c.profile_path}`:defSrc} alt={c.name} className="w-24 sm:w-36 object-cover rounded-lg self-center"/>
                        <span className="text-white text-xs sm:text-lg font-montserrat font-bold mt-5">{c.character}</span>
                        <span className="text-white text-xs sm:text-base font-montserrat">{c.name || c.original_name}</span>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    )
}

export default TVDetails