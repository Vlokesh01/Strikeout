import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Star from '../assets/download.png'
import { motion } from 'framer-motion';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username,
                password,
            });
    
            // Save the access and refresh tokens to localStorage
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            localStorage.setItem('username', username);
    
            // Store the token in the state as well if needed
            setToken(response.data); // Assuming setToken is used to update the token in your AuthContext or component state
            setError(null); // Clear any previous errors
    
            console.log("Tokens:", response.data); // Log tokens to check if they're received
            console.log(token)
            // Navigate to the home page after successful login
            navigate('/home');
        } catch (err) {
            setError("Invalid username or password");
            console.error("Login error:", err); // Log the error to debug if needed
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#3f434f] space-x-2" 
        >
        <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      >
       
          <h1 className="text-3xl font-bold text-primary mb-6 text-[#cedff9] font-SourGummy text-center ">STRIKEOUT</h1>
           <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <input  type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required placeholder="enter username" 
            className="border border-border bg-[#d3e0fb]  rounded-full p-2 w-64 focus:outline-none focus:ring focus:ring-ring text-center placeholder:text-center placeholder:text-slate-900 placeholder:font-SourGummy" />

<input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    placeholder="enter password"
    className="border bg-[#d3e0fb] rounded-full border-border p-2 w-64 focus:outline-none focus:ring focus:ring-ring text-center placeholder:text-center placeholder:text-slate-900 placeholder:font-SourGummy"
/>

            <button className="bg-secondary text-secondary-foreground rounded-full p-2 w-24 hover:bg-secondary/80 bg-[#d2dffb] font-SourGummy">log in</button>
          </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          <p className="text-muted-foreground mt-4 text-[#d2dffb] text-center ">
            not a user?{' '}
            <a href="/register" className="text-accent underline">
              register here
            </a>
          </p>
          </form>
          </motion.div>
          <motion.div className="absolute top-10 left-10 right-10 flex justify-between p-4"
          initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
          
          
          >
            <img  alt="star" src={Star} className='flex h-36 absolute top-[-30px] right-[10px]' />
            <img  alt="star" src={Star} className='h-36 absolute top-[450px] left-[10px]'/>
          </motion.div>
        </div> 

);
};

export default Login;


{/*  
    

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </form>

                {token && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800">Tokens</h3>
                        <pre className="text-xs text-gray-700 break-words">
                            Access Token: {token.access}
                        </pre>
                        <pre className="text-xs text-gray-700 break-words">
                            Refresh Token: {token.refresh}
                        </pre>
                    </div>
                )}
            </div>
        </div>
        */} 

{/* 
    
  <div className="flex flex-col items-center justify-center h-screen bg-background">
          <h1 className="text-3xl font-bold text-primary mb-6">STRIKEOUT</h1>
           <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <input  type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required placeholder="enter username" 
            className="border border-border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-ring" />

            <input type="password" 
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
            placeholder="enter password" className="border border-border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-ring" />
            <button className="bg-secondary text-secondary-foreground rounded-lg p-2 w-64 hover:bg-secondary/80">log in</button>
          </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          <p className="text-muted-foreground mt-4">
            Not a user?{' '}
            <a href="#" className="text-accent">
              Create an account
            </a>
          </p>
          </form>
          <div className="absolute top-0 left-0 right-0 flex justify-between p-4">
            <img undefinedhidden="true" alt="star" src="https://openui.fly.dev/openui/24x24.svg?text=⭐" />
            <img undefinedhidden="true" alt="star" src="https://openui.fly.dev/openui/24x24.svg?text=⭐" />
          </div>
        </div>  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    */}