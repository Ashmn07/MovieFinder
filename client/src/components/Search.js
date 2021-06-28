import React,{useState,useEffect} from 'react'

function Search({setPage,getSearchDetails,page,API_KEY}) {
    const [search,setSearch] = useState('')

    useEffect(() => {
        searchMovie()
    },[page])

    const searchMovie = async () => {
        const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&${search!=''?`query=${search}&`:``}page=${page}`
        const result = await fetch(searchUrl)
        const data = await result.json()
        getSearchDetails(data)
    }

    return (
        <div className="flex justify-center mt-5">
            <div className="flex items-center justify-between w-9/10 md:w-3/4 lg:w-1/2 rounded-full bg-black">
                <input 
                className="flex-1 border-none outline-none mx-1 sm:mx-4 px-4 py-2 text-white bg-black" 
                placeholder="Search Movie" value={search} onChange={e=>setSearch(e.target.value)}
                onSubmit={()=>setPage(1)}
                />
                <div className="p-4 w-auto">
                <svg onClick={()=>setPage(1)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 cursor-pointer hover:text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </div>
            </div>
        </div>
    )
}

export default Search
