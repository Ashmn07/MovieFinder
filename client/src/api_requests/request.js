const API_KEY = "d6119874269137f5b378b66f7d37305d";

const requests = {
    fetchTrending:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchTopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    // fetchActionMovies:`/discover/tv?api_key=${API_KEY}&with_genres=28`,
    // fetchComedyMovies:`/discover/tv?api_key=${API_KEY}&with_genres=35`,
    // fetchHorrorMovies:`/discover/tv?api_key=${API_KEY}&with_genres=27`,
    // fetchRomanceMovies:`/discover/tv?api_key=${API_KEY}&with_genres=10749`,
    // fetchDocumentaries:`/discover/tv?api_key=${API_KEY}&with_genres=99`,
}

export default requests;