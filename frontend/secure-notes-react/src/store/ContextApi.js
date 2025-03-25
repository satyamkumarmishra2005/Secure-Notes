import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  //find the token in the localstorage
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.stringify(localStorage.getItem("JWT_TOKEN"))
    : null;
  //find is the user status from the localstorage
  const isADmin = localStorage.getItem("IS_ADMIN")
    ? JSON.stringify(localStorage.getItem("IS_ADMIN"))
    : false;

  //store the token
  const [token, setToken] = useState(getToken);

  //store the current loggedin user
  const [currentUser, setCurrentUser] = useState(null);
  //handle sidebar opening and closing in the admin panel
  const [openSidebar, setOpenSidebar] = useState(true);
  //check the loggedin user is admin or not
  const [isAdmin, setIsAdmin] = useState(isADmin);

  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("USER"));

    if (user?.username) {
      try {
        const { data } = await api.get(`/auth/user`);
        const roles = data.roles;

        if (roles.includes("ROLE_ADMIN")) {
          localStorage.setItem("IS_ADMIN", JSON.stringify(true));
          setIsAdmin(true);
        } else {
          localStorage.removeItem("IS_ADMIN");
          setIsAdmin(false);
        }
        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching current user", error);
        toast.error("Error fetching current user");
      }
    }
  };

  //if  token exist fetch the current user
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  //through context provider you are sending all the datas so that we access at anywhere in your application
  return (
    <ContextApi.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        openSidebar,
        setOpenSidebar,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

//by using this (useMyContext) custom hook we can reach our context provier and access the datas across our components
export const useMyContext = () => {
  const context = useContext(ContextApi);

  return context;
};
