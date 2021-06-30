import React,{useEffect,useContext,createContext,useReducer} from 'react'
import './App.css';
import {reducer,initialState} from './reducer/userReducer'
import Login from './components/Login';
import {BrowserRouter,Switch,Route,Redirect,useHistory} from 'react-router-dom'
import Signup from './components/Signup';
import Landing from './components/Landing';
import Home from './components/Home';
import Movies from './components/Movies';
import SearchMovie from './components/SearchMovie';

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
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Landing}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/search" component={SearchMovie} />
        <Redirect to="/" />
      </Switch>
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
