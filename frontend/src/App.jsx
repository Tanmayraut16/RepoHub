import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import SignUp from './Pages/SignUp.jsx';
import Likes from './Pages/Likes.jsx';
import Explore from './Pages/Explore.jsx';
import Sidebar from './components/Sidebar.jsx';
// import CosmicBackground from './components/CosmicBackground'; // Import CosmicBackground

const App = () => {
  return (
      <div className='flex text-white'>
        <Sidebar />
        <div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/likes' element={<Likes />} />
          </Routes>
          <Toaster />
        </div>
      </div>
  );
};

export default App;
