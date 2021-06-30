import React,{useEffect} from 'react'
import landing from '../images/land.jpg'
import {Link,useHistory} from 'react-router-dom'

function Landing() {
    const landUrl = {
        background:`url(${landing})`,
        width:'100vw',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize: 'cover',
    }
    const history = useHistory()
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            history.push('/home')
        }
      },[])
    return (
    <div className="m-0 p-0 flex justify-center items-center bg-gradient-to-bl from-red-400 to-red-900 h-screen">
        <div className="bg-white rounded-lg flex h-3/5 w-3/4 md:w-3/4 lg:w-2/3 shadow-2xl">
            <div className="flex w-full">
                <div className="flex-1 flex flex-col">
                    <h1 className="align-start text-red-600 font-bold m-3 text-2xl md:text-3xl lg:text-4xl">
                    MovieFinder</h1>
                    <h4 className="text-center font-serif text-lg my-4 py-3 mx-2 px-1 md:text-4xl md:m-7 md:p-7 lg:text-3xl">
                    Do you want to explore the new Movies and TV Shows that have come out?</h4>
                    <h6 className="text-center font-serif text-md mx-2 px-2 md:text-3xl md:mb-2 md:mx-7 md:px-7 lg:text-2xl">
                    All you need to do so is to signup below ! </h6>
                    <div className="flex justify-center mt-2">
                        <Link to="/login">
                            <button className="bg-red-500 hover:bg-white text-white hover:text-red-500 border-2 hover:border-red-500 rounded mt-4 p-1 w-20 mx-2">
                                Log In
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="bg-white hover:bg-red-500 text-red-500 hover:text-white border-2 border-red-500 rounded mt-4 p-1 w-20 mx-2">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="p-0 hidden lg:block lg:flex-1" style={landUrl}></div>
            </div>
        </div>
        
    </div>
    )
}

export default Landing
