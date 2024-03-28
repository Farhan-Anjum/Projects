// Importing necessary modules and components from React and other files
import React from "react";
import { container, Logo, LogoutBtn } from "../index"; // Importing components from another file
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom
import { useSelector } from "react-redux"; // Importing useSelector hook from react-redux for accessing state
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom for navigation

// Header component
function Header() {
  // Accessing authentication status from Redux store
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate(); // Initializing navigate function for navigation

  // Array containing navigation items with name, slug, and active status
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus, // Login is active only if user is not authenticated
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus, // Signup is active only if user is not authenticated
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus, // All Posts is active only if user is authenticated
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus, // Add Post is active only if user is authenticated
  },
  ]

  // JSX for rendering the header
  return (
    <header className='py-3 shadow bg-gray-500'>
      <container> {/* Container component for layout */}
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' /> {/* Logo component */}
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)} // Navigation onClick
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && ( // Render LogoutBtn component if user is authenticated
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </container>
    </header>
  )
}

export default Header; // Exporting the Header component
