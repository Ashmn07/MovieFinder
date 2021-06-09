import React from 'react'
import bgauth from '../images/bg-pop.jpg'
import {Link} from 'react-router-dom'

function Login() {
    const bgUrl = {
        background:`url(${bgauth})`,
        width:'30vw',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize: 'cover',
        // opacity:0.8
    }
    return (
    <div className="m-0 p-0 flex justify-center items-center bg-gradient-to-bl from-red-400 to-red-900 h-screen">
        <div className="bg-white rounded-lg flex h-2/3 w-4/5 md:w-3/4 lg:w-3/4 shadow-2xl">
            <div className="flex-1 self-center">
                <div className="flex-col flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-8 w-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" 
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" 
                        clipRule="evenodd" />
                    </svg>
                    <h1 className="text-center text-red-600 font-bold mb-3 md:text-2xl lg:text-3xl">MovieFinder</h1>
                </div>
                <h2 className="text-center font-bold mb-3 md:text-xl lg:text-2xl">Login</h2>
                <form className="flex flex-col items-center">
                    <div>
                        <label htmlFor="email"
                        className="block text-sm font-medium text-red-700">
                        Email Address    
                        </label>
                        <input 
                        type="email" 
                        required
                        className="my-1 form-input rounded-lg focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700" 
                        placeholder="Enter Email"
                        />
                    </div>
                    <div>
                    <label htmlFor="password"
                        className="mt-1 block text-sm font-medium text-red-700">
                        Password    
                    </label>
                    <input 
                    type="password" 
                    required
                    className="form-input rounded-lg my-1 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700" 
                    placeholder="Enter Password"
                    />
                    </div>
                    <button className="bg-red-500 hover:bg-red-700 text-white rounded mt-4 p-1 w-20">
                        Log In
                    </button>
                </form>
                <p className="text-center my-2">Do not have an account? <Link to="/signup" className="text-red-500 font-semibold hover:text-red-700">Sign up!</Link></p>
            </div>
            <div className="p-0 hidden lg:block lg:flex-1" style={bgUrl}></div>
       </div>
    </div>
    )
}

export default Login
