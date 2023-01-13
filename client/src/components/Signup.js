import React,{useState} from 'react'
import bgauth from '../images/bg-pop.jpg'
import {Link,useHistory} from 'react-router-dom'
import {toast} from 'tailwind-toast'

function Signup() {

    const[name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const history = useHistory()

    const createUser = (e) =>{
        e.preventDefault()
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast().danger().with({
                title:'Invalid Email',
                message:'',
                color:"red",
                tone:600,
                shape: 'square',
                positionX: 'end',
                positionY: 'top',
              }).show()
            return;
        }
        fetch("/api/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
            })
        }).then(res=>res.json())
        .then(data =>{
           if(data.err){
            toast().danger().with({
                title:data.err,
                message:'',
                color:"red",
                tone:600,
                shape: 'square',
                positionX: 'end',
                positionY: 'top',
              }).show()
            } 
            else{
                toast().success().with({
                    title:'User Signup Successful!',
                    message:'',
                    shape: 'square',
                    positionX: 'end',
                    positionY: 'top',
                }).show()
                history.push('/login')
            }
        })
    }

    const bgUrl = {
        background:`url(${bgauth})`,
        width:'30vw',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize: 'cover',
    }
    return (
    <div className="m-0 p-0 flex justify-center items-center bg-gradient-to-bl from-red-400 to-red-900 min-h-screen h-full">
        <div className="bg-white rounded-lg flex h-3/4 w-3/4 md:w-3/4 lg:h-2/3 lg:w-3/4 shadow-2xl">
            <div className="flex-1 self-center py-10">
                <div className="flex-col flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-8 w-8 text-red-600 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" 
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" 
                        clipRule="evenodd" />
                    </svg>
                    <h1 className="text-center text-red-600 font-bold mb-3 md:text-2xl lg:text-3xl font-kaushan">MovieFinder</h1>
                </div>
                <h2 className="text-center font-bold mb-3 md:text-xl lg:text-2xl">Signup</h2>
                <form className="flex flex-col items-center">
                    <div>
                        <label htmlFor="name"
                        className="block text-sm font-medium text-red-700">
                        Full Name    
                        </label>
                        <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className="my-1 form-input rounded-lg focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700" 
                        placeholder="Enter Name"
                        />
                    </div>
                     <div>
                        <label htmlFor="email"
                        className="mt-1 block text-sm font-medium text-red-700">
                        Email Address    
                        </label>
                        <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input rounded-lg my-1 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700" 
                        placeholder="Enter Password"
                        />
                    </div>
                    <button 
                    className="bg-red-500 hover:bg-red-700 text-white rounded mt-4 p-1 w-20"
                    onClick={(e)=>createUser(e)}>
                        Sign Up
                    </button>
                </form>
                <p className="text-center my-2">Already have an account? <Link to="/login" className="text-red-500 font-semibold hover:text-red-700">Login</Link></p>
            </div>
            <div className="p-0 hidden lg:block lg:flex-1" style={bgUrl}></div>
       </div>
    </div>
    )
}

export default Signup
