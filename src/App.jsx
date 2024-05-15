import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import ProductPage from "./pages/ProductPage";
import About from "./pages/About";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import SignUp from "./pages/SignUp";
import LoginForm from "./pages/LoginForm";
import { updateCategories } from './store/actions/globalAction/globalAction';
import "./App.css";
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userSuccess, logOutUser } from './store/actions/userAction/userAction';
import ShoppingCartPage from "./pages/ShoppingCartPage";
import OrderPage from "./pages/OrderPage";
import PrivateRoute from "./components/OrderPage/PrivateRoute";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const dispatch = useDispatch();
  const [isEqualToken, setIsEqualToken] = useState(false);
  const user = useSelector((state) => state.user.response);
  const isLoggedIn = user && user.hasOwnProperty("token");

  useEffect(() => {
    const storedToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
  
    if (!storedToken || !isLoggedIn) {
      // Eğer token yoksa veya kullanıcı giriş yapmamışsa login sayfasına yönlendir //
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }
  
    axios.get('https://workintech-fe-ecommerce.onrender.com/verify', {
      headers: {
        Authorization: storedToken,
      },
    })
      .then((response) => {
        dispatch(userSuccess(response.data));
        localStorage.setItem("Token", response.data.token);
        setIsEqualToken(true);
  
        // Renew token in localStorage and axios header
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log("Error: ", error);
        // Token is not authorized
        localStorage.removeItem("Token");
        // Remove token from axios header
        if (isLoggedIn) {
          dispatch(logOutUser());
        }
  
      
      });
  
    dispatch(updateCategories());
  
  }, [isLoggedIn, dispatch]);

  return (
    <Router>
      <Header />
      <ToastContainer />
      <Switch>
        <Route path="/shopping/:gender/:category/:productId/:productNameSlug" exact>
          <ProductPage />
        </Route>
        <Route path="/shopping/:gender?/:category?" exact>
          <ProductList />
        </Route>
        <Route path="/about" component={About} />
        <Route path="/team" component={TeamPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/signup" component={SignUp} />
        
        <Route path="/cart" component={ShoppingCartPage} />
        <PrivateRoute path="/order" component={OrderPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
