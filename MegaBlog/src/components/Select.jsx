import React, { useId } from 'react';

// Select component with options and label
function Select({ options, label, className, ...props }, ref) {
    const id = useId(); // Custom hook to generate a unique ID for accessibility

    return (
        <div className='w-full'>
            {/* Render label if provided */}
            {label && <label htmlFor={id} className=''>{label}</label>}
            {/* Select element */}
            <select
                {...props}
                id={id} // Unique ID for the select element
                ref={ref} // Ref forwarding
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                // Dynamic class combining default and custom classes for styling
            >
                {/* Map through options to render select options */}
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option} {/* Display each option */}
                    </option>
                ))}
            </select>
        </div>
    );
}

// Forwarding the ref for parent component usage
export default React.forwardRef(Select);