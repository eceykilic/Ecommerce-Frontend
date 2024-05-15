import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faAngleDown,
  faUser,
  faSearch,
  faCartShopping,
  faHeart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { data } from "../../data/data";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../store/actions/userAction/userAction";
import Gravatar from "./Gravatar";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import ShoppingCartDropdown from "./ShoppingCartDropdown";



export default function Header() {
  const { phone, mail, offerMsg, companyName } = data.navBar;
  const history = useHistory();
  const user = useSelector((store) => store.user.response);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const categories = useSelector((store) => store.global.categories);
  const cart = useSelector((store) => store.shoppingCart.cart);
  const dropdownRef = useRef(null);
  
  
  const womanCategories = categories.filter((category) =>
  category.code.includes("k:")
);
const manCategories = categories.filter((category) =>
  category.code.includes("e:")
);

  const handleLogOut = () => {
    dispatch(logOutUser(history));
    localStorage.removeItem('Token');
}

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);


  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleShopDropdownToggle = () => {
    setIsShopDropdownOpen(!isShopDropdownOpen);
  };

  const handleCategoryClick = () => {
    setIsShopDropdownOpen(false); // Dropdown'u kapat
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShopDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <div className="bg-darkbg sm:hidden">
        <div className="max-w-screen-2xl pb-2 pt-2 text-lightText text-center items-center justify-between flex mx-auto">
          <div className="flex gap-3">
            <div className="text-white items-center p-2.5 gap-[5px] flex">
              <FontAwesomeIcon icon={faPhone} size="sm" />
              <h6 className="text-sm font-bold leading-normal mb-0">{phone}</h6>
            </div>
            <div className="text-white items-center  p-2.5 gap-[5px] flex">
              <FontAwesomeIcon icon={faEnvelope} size="sm" />
              <h6 className="text-sm font-bold leading-normal mb-0">{mail}</h6>
            </div>
          </div>
          <div className="p-2.5">
            <h6 className="text-white text-sm font-bold leading-normal mb-0">
              {offerMsg}
            </h6>
          </div>
          <div className="text-white items-center justify-start p-2.5 gap-2.5 flex">
            <h6 className="text-sm font-bold leading-normal mb-0">
              Follow Us :
            </h6>
            <div className="items-center justify-start gap-1 flex flex-wrap">
              <FontAwesomeIcon icon={faInstagram} size="sm" className="p-1" />
              <FontAwesomeIcon icon={faYoutube} size="sm" className="p-1" />
              <FontAwesomeIcon icon={faFacebook} size="sm" className="p-1" />
              <FontAwesomeIcon icon={faTwitter} size="sm" className="p-1" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between max-w-screen-2xl mx-auto sm:flex-col ">
        <header className="flex items-center pb-4 pt-4 sm:justify-between">
          <Link to="/" className="no-underline text-darkText">
            <h3 className="text-2xl text-darkText font-bold leading-loose cursor-pointer sm:pl-10">
              {companyName}
            </h3>
          </Link>
          <div className="hidden sm:flex sm:gap-8 sm:mr-10">
            <FontAwesomeIcon icon={faSearch} size="lg" />

            <FontAwesomeIcon icon={faCartShopping} size="lg" />

            
            <FontAwesomeIcon icon={faBars} size="lg" />
          </div>
        </header>

        <div className="hidden sm:flex font-semibold text-3xl sm:flex-col sm:mx-auto sm:gap-6 sm:my-20 sm:text-center">
          <Link
            to="/"
            className="no-underline text-lighterDark"
            onClick={() => history.push("/")}
          >
            Home
          </Link>

          <Link
            to="/shopping"
            className="no-underline text-lighterDark"
            onClick={() => history.push("/shopping")}
          >
            Product
          </Link>
          <Link
            to="/about"
            className="no-underline text-lighterDark"
            onClick={() => history.push("/about")}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="no-underline text-lighterDark"
            onClick={() => history.push("/contact")}
          >
            Contact
          </Link>
        </div>

        <div className="flex w-[80%] justify-between sm:hidden">
          <nav className="flex mx-auto gap-4">
            {[
              ["Home", "/"],
              ["Shop", "/shopping"],
              ["About", "/about"],
              ["Contact", "/contact"],
              ["Team", "/team"],
            ].map(([title, url], idx) => (
              <div className="flex items-center justify-center" key={idx}>
                {title === "Shop" ? (
                  <div className="group relative">
                    <Link
                      to="/shopping"
                      className="no-underline text-darkText flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDropdownToggle();
                      }}
                    >
                      <span>Shop</span>
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        className={`pl-3 transition-transform duration-300 transform ${
                          isDropdownOpen ? "-rotate-180" : ""
                        }`}
                      />
                    </Link>
                    <div
                      className={`absolute ${
                        isDropdownOpen ? "" : "hidden"
                      } z-10 p-4 bg-white rounded-md shadow-lg flex gap-4`}
                    >
                      <div className="">
                        <Link
                          to="/shopping/kadin"
                          className="font-bold text-gray-800 pl-3"
                          onClick={handleDropdownToggle}
                        >
                          Women
                        </Link>
                        <div className="space-y-2">
                          {womanCategories.map((category, idx) => (
                            <Link
                              key={idx}
                              to={`/shopping/kadin/${category.code.split(':')[1]}`}
                              className="block px-4 py-2 text-sm text-gray-500 mt-3"
                              onClick={handleDropdownToggle}
                            >
                              {category.title}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="">
                      <Link
                          to="/shopping/erkek"
                          className="font-bold text-gray-800 pl-3"
                          onClick={handleDropdownToggle}
                        >
                          Men
                        </Link>
                        <div className="space-y-2">
                          {manCategories.map((category, idx) => (
                            <Link
                              key={idx}
                              to={`/shopping/erkek/${category.code.split(':')[1]}`}
                              className="block px-4 py-2 text-sm text-gray-500 mt-3"
                              onClick={handleDropdownToggle}
                            >
                              {category.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={url}
                    key={idx}
                    className="no-underline text-lighterDark font-bold text-sm"

                  >
                    {title}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <div className="flex gap-8 font-bold sm:hidden">
            <div className="flex items-center text-navBlue">
              {Object.keys(user).length > 1 ? (
                <div className="flex items-center gap-3 cursor-pointer">
                  <Gravatar userEmail={user.email} />
                  <div className="">
                    <div className="flex items-center">
                      <span>{user.name}</span>
                    </div>
                    <ul className="">
                      <li>
                        <div
                          onClick={() => handleLogOut()}
                          className="text-sm text-lighterDark"
                        >
                          Log out
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faUser} size="sm" className="" />
                  <Link to="/login">Login</Link> /{" "}
                  <Link to="/signup">Register</Link>
                </div>
              )}
            </div>
             <div className="flex gap-5">  
            <div className="flex items-center text-navBlue">
              <FontAwesomeIcon icon={faSearch} size="sm" />
              <Link to="/login" className="no-underline text-navBlue text-sm" />
            </div>
            
            <div className="relative text-left flex items-center text-navBlue">
            <div onClick={handleShopDropdownToggle} className="flex items-center gap-1 cursor-pointer">
              <FontAwesomeIcon icon={faCartShopping} size="sm" />
              <p className="bg-navBlue font-medium rounded-full px-2 text-white ml-1">{cart.length}</p>
              
            </div>
            {isShopDropdownOpen && (
              <ShoppingCartDropdown
                onClose={() => setIsShopDropdownOpen(false)}
              />
            )}
          </div>
            
            <div className="flex items-center text-navBlue">
              <FontAwesomeIcon icon={faHeart} size="sm" />
              <Link to="/login" className="no-underline text-navBlue text-sm" />
            </div>
            </div>   
          </div>
        </div>
      </div>
    </div>
  );
}
