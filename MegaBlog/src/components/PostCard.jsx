import React from 'react';
import appwriteService from "../appwrite/config"; // Importing appwriteService for file preview
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom for navigation

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            {/* Link to navigate to the post details page */}
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                {/* Post card container */}
                <div className='w-full justify-center mb-4'>
                    {/* Image container */}
                    <img
                        src={appwriteService.getFilePreview(featuredImage)} // Get file preview URL using appwriteService
                        alt={title} // Alt text for accessibility
                        className='rounded-xl' // Styling for the image
                    />
                </div>
                {/* Post title */}
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard; // Export the PostCard component