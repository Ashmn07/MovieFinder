import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import MovieCard from './MovieCard'
import Navbar from './Navbar'
import Footer from './Footer'
import Paging from './Paging'
import {API_KEY} from '../App'

function Movies() {

  const [page,setPage] = useState(1)
  const [pageLimit,setPageLimit] = useState(1)
  const [details,setDetails] = useState()
  const [genres,setGenres] = useState([])
  const [selectedGenres,setSelectedGenres] = useState([])
  const [selectedGenresIds,setSelectedGenresIds] = useState('')

  const fetchDetails = async () => {
    const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}${selectedGenresIds!==''?`&with_genres=${selectedGenresIds}`:''}&language=en-US&sort_by=popularity.desc&page=${page}`
    const result = await fetch(discoverUrl)
    const data = await result.json()
    setDetails(data.results)
    setPageLimit(data.total_results)
  }

  useEffect(() => {
    if(selectedGenres.length>0){
    const tempIds = selectedGenres.map(genres => genres.id)
    const ids = tempIds.reduce((curr,next)=>curr+","+next)
    setSelectedGenresIds(ids)
    }
  },[selectedGenres])

  useEffect(() => {
    page===1?fetchDetails():setPage(1)
  },[selectedGenresIds])


  useEffect(() => {
    const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    const fetchGenres = async () => {
        const result = await fetch(genresUrl)
        const data = await result.json()
        setGenres(data.genres)
    }
    fetchGenres()
  },[])

  
  useEffect(() => {
    fetchDetails()
},[page])

  const pageChangeHandler = (data) =>{
    setPage(data)
    window.scroll(0,0)
  }

  const handleGenre = (genre) => {
    if(selectedGenres.includes(genre)){
      setSelectedGenres(selectedGenres.filter(genres => genres.id!==genre.id))
      setGenres([...genres,genre])
    }
    else{
      setSelectedGenres([...selectedGenres,genre])
      setGenres(genres.filter(genres => genres.id!==genre.id))
    }
  }

    return (
        <div className="bg-bgGray h-full w-full min-h-screen">
          <Navbar/> 
          <div className="pt-10"/>
          <div className="flex justify-between items-center p-3 mt-8 mx-6 sm:mx-16">
          <span className="font-montserrat text-center tracking-wider block text-white text-lg sm:text-4xl font-extrabold">DISCOVER MOVIES</span>
          <Link to="/searchmovie">
            <div className="flex py-1 px-1 sm:px-3 bg-bgGray border-2 border-red-600 text-red-600  items-center hover:text-bgGray hover:bg-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 cursor-pointer stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="px-1 sm:px-2 text-sm sm:text-lg cursor-pointer font-semibold">Search</span>
            </div>
          </Link>
          </div>
          <div className="flex justify-center mt-5"/>
        <div className="relative">
          <div className="flex items-center px-10 sm:px-20 text-base sm:text-lg whitespace-nowrap space-x-3 sm:space-x-6 overflow-x-scroll scrollbar-hide">
            {
              selectedGenres.map(selGenre =>(
                <h2 
                key={selGenre.id}
                onClick={()=>handleGenre(selGenre)}
                className="px-3 py-1 sm:px-4 cursor-pointer text-white rounded-full transition duration-100 transform  bg-red-600 hover:bg-red-800"
                >
                  {selGenre.name}
                </h2> 
              ))
            }
            {
              genres.map((genre)=>(
              <h2 
              key={genre.id}
              onClick={()=>handleGenre(genre)}
              className="last:pr-24 px-3 py-1 sm:px-4 cursor-pointer text-white rounded-full transition duration-100 transform  bg-gray-600 hover:bg-gray-800"
              >
                {genre.name}
              </h2> 
              ))
            }
          </div>
          <div className="absolute top-0 right-0 bg-gradient-to-l from-bgGray h-20 w-1/6" />
        </div>
          <div className="flex justify-center mb-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {
                details?details.length!==0?details.map(detail => (
                  <MovieCard detail={detail} key={detail.id}/>
                )):<span className="text-center text-red-600 text-2xl">No Results Available for given selection</span>:null
              }
            </div>
          </div>
         {(details && pageLimit>20)?<Paging pageChangeHandler={pageChangeHandler} result={pageLimit} page={page}/>:null}
          <Footer/>
        </div>
    )
  }

export default Movies
