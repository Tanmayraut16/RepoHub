import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Likes from "./Pages/Likes.jsx";
import Explore from "./Pages/Explore.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";
// import CosmicBackground from './components/CosmicBackground'; // Import CosmicBackground

const App = () => {
  const { authUser , loading} = useAuthContext();

  if (loading) return null;

  return (
    <div className="flex text-white">
      <Sidebar />
      <div className="max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUp /> : <Navigate to={"/"} />}
          />
          <Route
            path="/explore"
            element={authUser ? <Explore /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/likes"
            element={authUser ? <Likes /> : <Navigate to={"/login"} />}
          />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
};

export default App;
