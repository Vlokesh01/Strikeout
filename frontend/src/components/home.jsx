import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from './popup';
import { FaSignOutAlt, FaTrash } from "react-icons/fa";
import { motion } from 'framer-motion';
import Bear from '../assets/WhatsApp_Image_2024-11-11_at_23.09.52_79eff967-removebg-preview (1).png'

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  


  const token = localStorage.getItem('accessToken');  // Get the token from localStorage
//2 Username
useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);


  // 1. Fetch Todos (GET)
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/todos/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Create a Todo (POST)
  const createTodo = async () => {
    if (!newTodo.title) {
      alert('Please provide a title');
      return;
    }
  
    const data = {
      title: newTodo.title,
    };
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/create/', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setTodos([...todos, response.data]); // Add the new todo to the list
      setNewTodo({ title: '' });
      closePopup(); // Clear the form after submission
    } catch (err) {
      setError('Failed to create todo');
      console.error(err);
    }
  };
  // 3. Delete a Todo (DELETE)
  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete/${todoId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setTodos(todos.filter(todo => todo.id !== todoId));  // Remove the deleted todo from the state
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };
  // 4. Logout 
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login')
  };
  return (
 <div className="flex flex-col h-screen bg-[#3f434f] ">
  <motion.div className="top flex justify-between items-center mb-4 mx-6 text-6xl h-20 text-white"
   initial={{ y: -100,}}
      animate={{ y: 0, }}
      transition={{
        duration: 0.8,
        delay: 0.4,
        ease: [0, 0.71, 0.2, 1.01]
      }}
  >
    <motion.h1 className="text-3xl font-bold font-SourGummy "
      whileHover={{ scale: [null, 1, 1.1] }}
      transition={{ duration: 0.3 }}
    >Hello, {username} !</motion.h1>
    <motion.h1 className="text-2xl font-bold font-SourGummy cursor-pointer" onClick={handleLogout}
     whileHover={{ scale: [null, 1, 1.4] }}
     transition={{ duration: 0.3 }}
    >
    <FaSignOutAlt className="text-1xl" />
    </motion.h1>
  </motion.div>
  <motion.div className="middle flex flex-col flex-1 p-4"
  initial={{ opacity:0,y: -100,}}
      animate={{opacity:1, y: 0, }}
      transition={{
        duration: 1,
        delay: 0.8,
        ease: [0, 0.71, 0.2, 1.01]
      }}
  >
    {error && <p className="text-red-500 mb-4">{error}</p>}
    {loading && <p className="text-gray-500 mb-4">Loading...</p>}
    {/* Todo List */}
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2 text-center text-white font-SourGummy"
      >Today Tasks To do ... </h2>
      <ul className="list-none space-y-2 text-center">
        {todos.map(todo => (
          <motion.li key={todo.id} className="flex justify-between font-SourGummy  items-center text-center py-2 px-4 rounded-full bg-[#a5abc1] text-black hover:bg-[#bec5de]"
          initial={{ opacity: 0, x:-100 }}
      animate={{ opacity: 1, x: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01]
      }
      }
          
          >
            <span className="text-gray-700">{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}
             >
            <FaTrash className="text-1xl" 
            />
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
    {/* New Todo Form */}
   
    {/* Popup */}
    <div className="flex flex-col items-center justify-center"
    >
      <button
        onClick={openPopup}
        className="px-4 py-2 font-SourGummy h-[40px] w-[100%] bg-[#8c7f9d] text-white rounded-full hover:bg-[#9d8bb5]"
      >
       new task +
      </button>

      <div
       > {/* Full pink background */}
  <Popup isOpen={isPopupOpen} onClose={closePopup} 
  
  >
    <div className="bg-[#bd9dcf] p-6" 
     
    > {/* Remove any white backgrounds */}
      <div className="w-full">
        <h2 className="font-bold text-3xl text-[#7f6b95] font-SourGummy text-center">New task</h2>
        <input
          type="text"
          placeholder="enter task"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          className="border bg-[#cacfec] border-border rounded-full p-2 w-full focus:outline-none font-SourGummy  text-center placeholder:text-slate-900 placeholder:font-SourGummy mt-4"
        />
      </div>
      <div className='btn flex items-center justify-center align-middle'>

     
      <button
        onClick={createTodo}
        className="mt-6 w-[200px] px-4 py-2 bg-[#cbd3ec] text-black rounded-full hover:bg-[#dbe2f7] font-SourGummy text-center"
      >
        create
      </button>
    </div>
    </div>
  </Popup>
</div>
    </div>
  </motion.div>

  <motion.div className="absolute top-10 left-10 right-10 flex justify-between p-4"
          initial={{ opacity: 0, x:-100 }}
      animate={{ opacity: 1, x: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.8,
        ease: [0, 0.71, 0.2, 1.01]
      }} >
            <img  alt="star" src={Bear} className='flex h-[350px] absolute top-[290px] left-[-65px] overflow-hidden overscroll-none overflow-x-hidden' />
          </motion.div>


</div>


  );
};

export default TodoApp;
