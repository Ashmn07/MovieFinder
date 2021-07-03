import React,{useState,useEffect,useContext} from 'react'
import {useHistory,Link} from 'react-router-dom'
import { UserContext } from '../App'

function Navbar() {
    const [show,setShow] = useState(false)
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    
    const navChange = () => {
        if (window.scrollY > 80) {
          setShow(true);
        } else {
          setShow(false);
        }
      }

    useEffect(() => {
        window.addEventListener("scroll",navChange);
        return () => {
          window.removeEventListener("scroll",navChange);
        };
      }, []);

      const logoutHandler = (e) => {
          e.preventDefault();
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/')
      }

    return (
        <>
        <nav className={`${show?'bg-black':'bg-gradient-to-b from-black'} fixed w-screen z-10`}>
        <div className="mx-4 md:mx-6 md:my-1">
          <div className="flex justify-between p-1">
            <div className="flex space-x-8 md:space-x-6">
              <div className="flex items-center py-3 px-3">
                <svg xmlns="http://www.w3.org/2000/svg"
                 className="h-6 w-6 text-red-600 mr-1 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" 
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" 
                    clipRule="evenodd" />
                </svg>
                <span className="text-center text-red-600 font-bold ml-1 text-lg lg:text-xl">MovieFinder</span>
              </div>
              <div className="hidden sm:flex items-center space-x-4 md:space-x-2">
                <Link to="/home"><span className="py-3 px-2 text-gray-200 hover:text-white cursor-pointer font-semibold text-sm">Home</span></Link>
                <Link to="/movies"><span className="py-3 px-2 text-gray-200 hover:text-white cursor-pointer font-semibold text-sm">Movies</span></Link>
                <Link to="/tv"><span className="py-3 px-2 text-gray-200 hover:text-white cursor-pointer font-semibold text-sm">TV Shows</span></Link>
                <Link to="/list"><span className="py-3 px-2 text-gray-200 hover:text-white cursor-pointer font-semibold text-sm">My Watch List</span></Link>
              </div>
            </div>
            <div className="flex items-center mr-2">
              <span onClick={logoutHandler} className="py-1 px-3 bg-red-600 hover:bg-red-900 text-white text-base cursor-pointer font-semibold">Logout</span>
            </div>
          </div>
        </div>
      </nav>
      </> 
    )
}

export default Navbar
