import React,{useState,useEffect,useRef} from 'react'
import Card from './Card'
import Navbar from './Navbar'
import Footer from './Footer'
import Paging from './Paging'

function Movies() {

  const [page,setPage] = useState(1)
  const [pageLimit,setPageLimit] = useState(1)
  const [details,setDetails] = useState()
  const [genres,setGenres] = useState([])
  const [selectedGenres,setSelectedGenres] = useState([])
  const [selectedGenresIds,setSelectedGenresIds] = useState('')

  const API_KEY = "d6119874269137f5b378b66f7d37305d";

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
        console.log(data)
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
          {/* <Banner banner={banner}/> */}
          <div className="pt-10"/>
          <span className="font-montserrat text-center p-3 mt-3 tracking-wider block text-white text-xl sm:text-4xl font-extrabold">DISCOVER MOVIES</span>
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
                  <Card detail={detail} key={detail.id}/>
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
