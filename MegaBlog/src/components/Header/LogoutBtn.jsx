import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/config"; // Importing authService from appwrite config file
import { logout } from "../../store/authSlice"; // Importing the logout action from authSlice

function LogoutBtn() {
  const dispatch = useDispatch(); // Using useDispatch hook from react-redux to get the dispatch function

  const logoutHandler = () => {
    // Function to handle logout
    authService.logout().then(() => { // Calling the logout method from authService
      dispatch(logout()); // Dispatching the logout action to update the Redux store
    });
  };

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler} // Calling logoutHandler function when button is clicked
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
