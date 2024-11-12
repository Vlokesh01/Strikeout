import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Star from '../assets/download.png'
import { motion } from 'framer-motion';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const Navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', {
                username,
                password,
            });
            setSuccess("Account created successfully!");
            setError(null);
            Navigate('/login'); 
            console.log(response);
        } catch (err) {
            setError("Failed to register. Please try again.",err);
            setSuccess(null);
        }
    };

    return (
<motion.div className="flex flex-col items-center justify-center h-screen bg-[#3f434f]" 
 
>

     <motion.div className='motion ='
     initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}

     
     >       
    <h1 className="text-3xl font-bold text-[#cedff9] font-SourGummy mb-6 text-center">STRIKEOUT</h1>
    
    <form onSubmit={handleRegister} className="space-y-6 flex flex-col items-center">
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="enter username"
            className="border bg-[#d3e0fb] border-border rounded-full p-2 w-64 focus:outline-none focus:ring focus:ring-ring text-center placeholder:text-slate-900 placeholder:font-SourGummy"
        />

        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="enter password"
            className="border bg-[#d3e0fb] border-border rounded-full p-2 w-64 focus:outline-none focus:ring focus:ring-ring text-center placeholder:text-slate-900 placeholder:font-SourGummy"
        />

        <button
            type="submit"
            className="bg-[#d2dffb] text-secondary-foreground rounded-full p-2 w-24 font-SourGummy hover:bg-secondary/80"
        >
            Register
        </button>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}


        <p className="text-muted-foreground mt-4 text-[#d2dffb] text-center">
            already a user?{' '}
            <a href="/login" className="text-accent underline">
              login here 
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
          
</motion.div>






    )
};

export default Register;
