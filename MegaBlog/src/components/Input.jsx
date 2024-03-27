import React, { useId } from 'react';

// Input component using React.forwardRef to forward refs to child components
const Input = React.forwardRef(function Input({
    label, // Label for the input field
    type = "text", // Input type (default is text)
    className = "", // Additional classes for styling
    ...props // Additional props
}, ref) { // Forwarded ref
    // Generate a unique id using the useId() hook
    const id = useId();

    return (
        <div className='w-full'>
            {/* Render label if provided */}
            {label && <label 
                className='inline-block mb-1 pl-1' 
                htmlFor={id}>
                    {label}
                </label>
            }
            {/* Input field with dynamic classes and forwarded props */}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref} // Forwarded ref
                {...props} // Spread additional props
                id={id} // Assign unique id
            />
        </div>
    );
});

export default Input; // Export the Input component as default