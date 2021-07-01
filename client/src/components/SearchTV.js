import React,{useState,useEffect} from 'react'
import TVCard from './TVCard'
import Navbar from './Navbar'
import Footer from './Footer'
import Paging from './Paging'

function SearchTV() {
  const [search,setSearch] = useState('')
  const [page,setPage] = useState(1)
  const [details,setDetails] = useState()
  const [result,setResult] = useState(1)

  const API_KEY = "d6119874269137f5b378b66f7d37305d";

 
useEffect(() => {
    if(search!==''){
        searchTV()
    }
},[page])

const searchHandler = (e) =>{
  e.preventDefault()
  if(page === 1) searchTV()
  else setPage(1)
}

const searchTV = async () => {
    const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&${search!=''?`query=${search}&`:``}page=${page}`
    const result = await fetch(searchUrl)
    const data = await result.json()
    setResult(data.total_results)
    setDetails(data.results)
  }

const pageChangeHandler = (data) =>{
    setPage(data)
    window.scroll(0,0)
}

    return (
        <div className="bg-bgGray h-full w-full min-h-screen">
          <Navbar/> 
          <div className="pt-10"/>
          <span className="font-montserrat text-center p-3 mt-3 tracking-wider block text-white text-xl sm:text-4xl font-extrabold">SEARCH TV SHOWS</span>
          <div className="flex justify-center mt-5">
            <div className="flex items-center justify-between w-9/10 md:w-3/4 lg:w-1/2 rounded-full bg-black">
                <form onSubmit={searchHandler}>
                  <input 
                  className="flex-1 border-none outline-none mx-1 sm:mx-4 px-4 py-2 text-white bg-black" 
                  placeholder="Search TV Shows" value={search} onChange={e=>setSearch(e.target.value)}
                  />
                </form>
                <div className="p-4 w-auto">
                <svg onClick={searchHandler} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 cursor-pointer hover:text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </div>
            </div>
        </div>
          <div className="flex justify-center mb-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {
                details?details.map(detail => (
                  <TVCard detail={detail} key={detail.id}/>
                )):null
              }
            </div>
          </div>
         {details?<Paging pageChangeHandler={pageChangeHandler} result={result} page={page}/>:null}
          <Footer/>
        </div>
    )
}

export default SearchTV
