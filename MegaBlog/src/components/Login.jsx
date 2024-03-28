import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice'; // Importing login action from authSlice
import { Button, Input, Logo } from "./index"; // Importing Button, Input, and Logo components
import { useDispatch } from "react-redux"; // Importing useDispatch hook from react-redux
import authService from "../appwrite/auth"; // Importing authService for authentication
import { useForm } from "react-hook-form"; // Importing useForm hook for form handling

function Login() {
    const navigate = useNavigate(); // Navigation hook from react-router-dom
    const dispatch = useDispatch(); // Redux dispatch hook
    const { register, handleSubmit } = useForm(); // Form handling hook from react-hook-form
    const [error, setError] = useState(""); // State to manage error messages

    // Function to handle user login
    const login = async (data) => {
        setError(""); // Clear any previous error message
        try {
            const session = await authService.login(data); // Call login method from authService
            if (session) {
                const userData = await authService.getCurrentUser(); // Get current user data
                if (userData) dispatch(authLogin(userData)); // Dispatch login action with user data
                navigate("/"); // Redirect to home page after successful login
            }
        } catch (error) {
            setError(error.message); // Set error message if login fails
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                {/* Logo section */}
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" /> {/* Render the Logo component */}
                    </span>
                </div>
                {/* Sign-in header */}
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                {/* Sign-up link */}
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {/* Error message display */}
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>} {/* Display error message if exists */}
                {/* Login form */}
                <form onSubmit={handleSubmit(login)} className='mt-8'> {/* Form for user login */}
                    <div className='space-y-5'>
                        {/* Email input field */}
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        {/* Password input field */}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        {/* Sign in button */}
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login; // Export the Login component