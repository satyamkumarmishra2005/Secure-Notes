import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useMyContext } from "../../store/ContextApi";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setIsAdmin } = useMyContext();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    console.log("OAuth2RedirectHandler: Params:", params.toString());
    console.log("OAuth2RedirectHandler: Token:", token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);

        localStorage.setItem('JWT_TOKEN', token);

        const user = {
          username: decodedToken.sub,
          roles: decodedToken.roles.split(','),
        };
        console.log("User Object:", user);
        localStorage.setItem('USER', JSON.stringify(user));

        // Update context state
        setToken(token);
        setIsAdmin(user.roles.includes('ADMIN'));

        // Delay navigation to ensure local storage operations complete
        setTimeout(() => {
          console.log("Navigating to /notes");
          navigate('/notes');
        }, 100); // 100ms delay
      } catch (error) {
        console.error('Token decoding failed:', error);
        navigate('/login');
      }
    } else {
      console.log("Token not found in URL, redirecting to login");
      navigate('/login');
    }
  }, [location, navigate, setToken, setIsAdmin]);

  return <div>Redirecting...</div>;
};

export default OAuth2RedirectHandler;
