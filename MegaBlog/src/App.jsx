import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true); // State to manage loading status
  const dispatch = useDispatch(); // Redux dispatch function

  useEffect(() => {
    // Effect hook to fetch current user data
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData })); // Dispatch login action if user data is available
        } else {
          dispatch(logout()); // Dispatch logout action if user data is not available
        }
      })
      .finally(() => setLoading(false)); // Update loading status after fetching user data
  }, []); // Empty dependency array means this effect runs only once after initial render

  return !loading ? ( // Render content only when loading is false
    <div className="min-h-screen flex - flexwrap  content-between bg-gray-400">
      <div className="w-full block">
        <Header /> {/* Render Header component */}
        <main>
        TODO: {/* Placeholder for Outlet component */}
        </main>
        <Footer /> {/* Render Footer component */}
      </div>
    </div>
  ) : null; // Render nothing while loading is true
}

export default App;

