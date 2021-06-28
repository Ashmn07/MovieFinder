import React,{useState,useEffect} from 'react'
import Card from './Card'
import Navbar from './Navbar'
import Banner from './Banner'
import Footer from './Footer'
import Paging from './Paging'

function Home() {

  const [page,setPage] = useState(1)
  const [pageLimit,setPageLimit] = useState(1)
  const [details,setDetails] = useState()
  const [banner,setBanner] = useState()

  const API_KEY = "d6119874269137f5b378b66f7d37305d";

  const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=${page}`

  const fetchDetails = async () => {
    console.log(trendingUrl)
    const result = await fetch(trendingUrl)
    const data = await result.json()
    setPageLimit(data.total_results)
    setDetails(data.results)
    const ppc = data.total_results/data.total_pages
    setBanner(data.results[Math.floor(Math.random()*ppc)])
  }

  useEffect(() => {
    fetchDetails()
  },[page])

  const pageChangeHandler = (data) =>{
    setPage(data)
    window.scroll(0,0)
  }

    return (
        <div className="bg-bgGray h-full w-full">
          <Navbar/> 
          <Banner banner={banner?banner:null}/>
          <span className="font-montserrat text-center p-3 mt-3 tracking-wider block text-white text-xl sm:text-4xl font-extrabold">TRENDING MOVIES</span>
          <div className="flex justify-center mb-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {
                details?details.map(detail => (
                  <Card detail={detail} key={detail.id}/>
                )):null
              }
            </div>
          </div>
          <Paging pageChangeHandler={pageChangeHandler} result={pageLimit} page={page}/>
          <Footer/>
        </div>
    )
}

export default Home
