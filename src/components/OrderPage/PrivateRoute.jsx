import React, { useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import OrderPage from "../../pages/OrderPage";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;
  const history = useHistory();

  useEffect(() => {
    console.log("PrivateRoute useEffect triggered");
    let redirectTimer;
  
    if (!token) {
      console.log("Token is empty - Redirecting...");
      toast.info("Please sign in to continue.", {
        autoClose: 3000,
      });
  
      redirectTimer = setTimeout(() => {
        history.push({
          pathname: "/login",
          state: { referrer: history.location.pathname },
        });
      }, 3000);
    }
  
    return () => {
      console.log("PrivateRoute useEffect cleanup");
      clearTimeout(redirectTimer);
    };
  }, [token, history]);

  console.log("PrivateRoute render");

  // Token varsa OrderPage'e yönlendir
  if (token) {
    return <OrderPage />;
  }

  return null;
};

export default PrivateRoute;
