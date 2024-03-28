import React, { useState } from 'react';
import authService from '../appwrite/auth'; // Importing authService for authentication
import { Link, useNavigate } from 'react-router-dom'; // Importing Link and useNavigate for navigation
import { login } from '../store/authSlice'; // Importing login action from authSlice
import { Button, Input, Logo } from './index.js'; // Importing Button, Input, and Logo components
import { useDispatch } from 'react-redux'; // Importing useDispatch hook from react-redux
import { useForm } from 'react-hook-form'; // Importing useForm hook for form handling

function Signup() {
    const navigate = useNavigate(); // Navigation hook from react-router-dom
    const [error, setError] = useState(""); // State to manage error messages
    const dispatch = useDispatch(); // Redux dispatch hook
    const { register, handleSubmit } = useForm(); // Form handling hook from react-hook-form

    // Function to handle account creation
    const create = async (data) => {
        setError(""); // Clear any previous error message
        try {
            const userData = await authService.createAccount(data); // Call createAccount method from authService
            if (userData) {
                const userData = await authService.getCurrentUser(); // Get current user data
                if (userData) dispatch(login(userData)); // Dispatch login action with user data
                navigate("/"); // Redirect to home page after successful account creation
            }
        } catch (error) {
            setError(error.message); // Set error message if account creation fails
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>} {/* Display error message if exists */}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        {/* Input field for full name */}
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", { required: true })}
                        />
                        {/* Input field for email */}
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
                        {/* Input field for password */}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                        />
                        {/* Create Account button */}
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup; // Export the Signup component