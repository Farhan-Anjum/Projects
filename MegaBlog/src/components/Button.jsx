import React from 'react';

// Button component with customizable props
function Button({
  children, // Content inside the button
  type = 'button', // Button type (default is 'button')
  bgColor = 'bg-blue-600', // Background color class for the button (default is blue)
  textColor = 'text-white', // Text color class for the button (default is white)
  className = '', // Additional classes for the button (default is empty)
  ...props // Any additional props passed to the button component
}) {
  return (
    // Button element with dynamic classes based on props
    <button className={`px-4 py-2 rounded-lg ${className} ${textColor} ${bgColor}`} type={type} {...props}>
      {children} {/* Render the content inside the button */}
    </button>
  );
}

export default Button; // Export the Button component