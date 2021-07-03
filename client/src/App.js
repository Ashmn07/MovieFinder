import React,{useEffect,useContext,createContext,useReducer,Suspense,lazy} from 'react'
import './App.css';
import {reducer,initialState} from './reducer/userReducer'
import {BrowserRouter,Switch,Route,Redirect,useHistory} from 'react-router-dom'

const Signup = lazy(()=>import('./components/Signup'))
const Login = lazy(()=>import('./components/Login'))
const Movies = lazy(()=>import('./components/Movies'))
const Landing = lazy(()=>import('./components/Landing'))
const Home = lazy(()=>import('./components/Home'))
const WatchList = lazy(()=>import('./components/WatchList'))
const SearchMovie = lazy(()=>import('./components/SearchMovie'))
const TVshows = lazy(()=>import('./components/TVshows'))
const SearchTV = lazy(()=>import('./components/SearchTV'))
const MovieDetails = lazy(()=>import('./components/MovieDetails'))
const TVDetails = lazy(()=>import('./components/TVDetails'))

export const UserContext = createContext()

function Routing() {
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      console.log(user)
    }
    else{
      if(!history.location.pathname.startsWith('/reset')
      || !history.location.pathname.startsWith('/login')
      || !history.location.pathname.startsWith('/signup')
      )
      history.push('/')
    }
  },[])

  return (
    <Suspense
    fallback={
      <div
      className="flex justify-center items-center h-screen bg-bgGray text-white text-2xl"
      >
        <h1>Loading...</h1>
      </div>
    }
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Landing}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/movie/:movieId" component={MovieDetails}/>
        <Route exact path="/tv" component={TVshows} />
        <Route exact path="/tv/:tvId" component={TVDetails}/>
        <Route exact path="/searchmovie" component={SearchMovie} />
        <Route exact path="/searchtv" component={SearchTV} />
        <Route exact path="/list" component={WatchList}/>
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}

function App(){
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
