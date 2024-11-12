// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import PrivateRoutes from './Utils/privateroutes';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Private route wrapper */}
                    <Route element={<PrivateRoutes />}>
                        <Route path="" element={<Home />} />
                    </Route>
                    
                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
