import React,{useState,useEffect,useContext} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import {toast} from 'tailwind-toast'
import { UserContext,API_KEY } from '../App'

function MovieDetails({match}) {
    const [movie,setMovie] = useState()
    const [cast,setCast] = useState()
    const {state,dispatch} = useContext(UserContext)

    const addToList = async () => {
        const result = await fetch('/api/addtolist',{
            method: 'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                id:movie.id,
                year:movie.release_date.substring(0, 4),
                name:movie.title,
                type:'movie',
                rating:(movie.vote_average%1===0)?movie.vote_average+".0":movie.vote_average,
                img:imgSrc+movie.poster_path
            })
        })
        const data = await result.json()
        if(data.err){
            toast().danger().with({
                title:'Could not Add',
                message:`${data.err}`,
                color:"red",
                tone:600,
                shape: 'square',
                positionX: 'end',
                positionY: 'top',
              }).show()
        }
        else{
            dispatch({type:"UPDATE",payload:data.watchList})
            toast().success().with({
                title:'Added to Watch List!',
                message:'',
                shape: 'square',
                positionX: 'end',
                positionY: 'top',
              }).show()
        }
    }

    const removefromList = async () => {
        const result = await fetch('/api/removefromlist',{
            method: 'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                id:movie.id,
                type:'movie',
            })
        })
        const data = await result.json()
        if(data.err){
            toast().danger().with({
                title:'Could not Remove',
                message:`${data.err}`,
                color:"red",
                tone:600,
                shape: 'square',
                positionX: 'end',
                positionY: 'top',
              }).show()
        }
        else{
            dispatch({type:"UPDATE",payload:data.watchList})
            toast().success().with({
                title:'Removed from Watch List!',
                message:'',
                shape: 'square',
                positionX: 'end',
                positionY: 'top',
              }).show()
        }
    }

    const bannerStyle = {
        backgroundImage: `linear-gradient(0deg, rgba(20,20,20,1) 0%, rgba(20,20,20,0.8071603641456583) 100%),url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        objectFit:'contain',
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
    }

    let imgSrc=`https://image.tmdb.org/t/p/w300`
    let defSrc = 'https://www.movienewz.com/img/films/poster-holder.jpg'

    useEffect(() => {
        const movieUrl = `https://api.themoviedb.org/3/movie/${match.params.movieId}?api_key=${API_KEY}&append_to_response=videos,credits`
        const fetchMovie = async () => {
            const result = await fetch(movieUrl)
            const data = await result.json()
            setMovie(data)
            setCast(data.credits.cast)
        }
        fetchMovie()
    },[match.params.movieId])

    if (!movie) return(
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
                    <img src={movie?imgSrc+movie.poster_path:defSrc} alt={movie?.title} className="w-48 md:w-72 self-center my-5"/>
                        <div className="flex flex-1 flex-col items-center sm:items-start sm:px-5">
                            <span className="m-1 p-2 text-white md:p-5 font-bold text-xl md:text-5xl max-w-3xl font-montserrat">
                                {movie?.title || movie?.original_title}{" "}
                             {movie?.release_date?<span>({movie.release_date.substring(0, 4)})</span>:null}
                            </span>
                            {movie?.runtime !== 0 ? (
                                <p className="text-white m-1 px-5 text-sm sm:text-xl">
                                {Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m{" "}
                                </p>
                            ) : (
                                <p></p>
                            )}{" "}
                             <div className="m-1 mt-2 px-3 text-sm sm:text-xl text-white flex">
                                {movie?.genres.slice(0, 4).map((m, i) => {
                                return (
                                    <p
                                    keyy={i}
                                    className="ml-3"
                                    >
                                    {m.name}
                                    </p>
                                );
                                })}
                            </div>
                            <div className="m-1 mt-3 md:mt-6 md:mb-3 p-1">
                            {state?.watchList?.find((w)=>{if(w.entId==movie.id){return true} else {return false}})
                                ?
                                <span onClick={removefromList} className="py-2 px-2 m-2 md:px-5 md:m-4 bg-white text-black hover:bg-bgButton hover:text-white cursor-pointer">Remove from List</span>
                                :
                                <span onClick={addToList} className="py-2 px-2 m-2 md:px-5 md:m-4 bg-bgButton text-white hover:text-black hover:bg-white cursor-pointer">Add To List</span>
                            }
                            </div>
                            <div className="mt-5 pb-5 sm:m-3 sm:p-3 text-base sm:text-xl text-white font-roboto">
                                {movie?.overview} 
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

export default MovieDetails