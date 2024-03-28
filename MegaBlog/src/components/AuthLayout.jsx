import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        // Check if the authentication is required and the authStatus matches the authentication requirement
        if (authentication && !authStatus) {
            // Redirect to the login page if authentication is required but not authenticated
            navigate("/login");
        } else if (!authentication && authStatus) {
            // Redirect to the home page if authentication is not required but user is authenticated
            navigate("/");
        }

        // Set loader to false once the authentication checks are done
        setLoader(false);
    }, [authStatus, navigate, authentication]);

    // Display loader while checking authentication status
    return loader ? <h1>Loading...</h1> : <>{children}</>;
}
