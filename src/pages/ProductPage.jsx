import BestSeller from "../components/HomePage/BestSeller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEye,
  faCartShopping,
  faHeart,
  faStar,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axiosInstance from "../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import ProductDescription from "../components/ProductPage/ProductDescription";
import Brands from "../components/Repetitive/Brands";
import { Carousel } from "@material-tailwind/react";
import { setAddToCart } from "../store/actions/shoppingCart/shoppingCartActions"



export default function ProductPage() {
  const history = useHistory();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [product, setProduct] = useState({ images: [] });
  const requestURL = `/products/${productId}`;
 
 
  
  

  useEffect(() => {
    axiosInstance
      .get(requestURL)
      .then((response) => {
        console.log("data", response.data);
        setProduct(response.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [productId]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function addtoShoppingCart() {
    dispatch(setAddToCart(product));
  }

 

  return (
    <>
      <div className="max-w-screen-2xl mx-auto flex flex-col gap-10">
        <nav className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div
              className="text-slate-800 text-sm font-bold cursor-pointer"
              onClick={() => history.push("/")}
            >
              Home
            </div>
            <FontAwesomeIcon
              icon={faArrowRight}
              size="sm"
              className="text-slate-400"
            />
            <div className="text-slate-400 text-sm font-bold">
              Shop
            </div>
          </div>
          <div
            onClick={() => history.goBack()}
            className="cursor-pointer flex items-center gap-2"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              size="sm"
              className="text-darkText"
            />
            <div className="text-darkText text-sm font-bold cursor-pointer">
              Go Back
            </div>
          </div>
        </nav>
       
       
        <div className="flex gap-20">
        <div className="max-w-screen-2xl">
          <div>
            <Carousel
              className="w-[500px] h-[450px]"
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all sm:hidden content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
            >
              {product.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image.url}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ))}
            </Carousel>
          </div>
        </div>

        <div className="flex">
          
          <div className="flex flex-col items-start gap-4 max-sm:w-full justify-between">
            <h4 className="text-darkText text-xl font-bold">
              {product.name}
            </h4>
            <div className="flex items-center gap-2 mb-10">
              <div className="flex gap-1">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-300"
                  size="lg"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-300"
                  size="lg"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-300"
                  size="lg"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-300"
                  size="lg"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-300"
                  size="lg"
                />
              </div>
              <h6 className="text-lighterDark text-sm font-bold mt-1">
                {parseInt(product.rating)} Reviews
              </h6>
            </div>
            <h5 className="text-darkText text-2xl font-bold">
              ${product.price}
            </h5>
            <div className="flex flex-col items-start">
              <h6 className="text-lighterDark text-md font-bold">
                Availability :{" "}
                <span className="text-navBlue text-md font-bold">
                  {product.stock}
                </span>
              </h6>
              <p className="text-lighterDark text-md font-medium mt-8 mb-2">
                {product.description}
              </p>
            </div>
            <div className="w-[445px] h-[0px] border border-stone-300"></div>
            <div className="flex gap-2 mb-10">
              <div className="w-[30px] h-[30px] bg-navBlue rounded-full shadow-sm" />
              <div className="w-[30px] h-[30px] bg-green-500 rounded-full shadow-sm" />
              <div className="w-[30px] h-[30px] bg-orange-400 rounded-full shadow-sm" />
              <div className="w-[30px] h-[30px] bg-darkText rounded-full shadow-sm" />
            </div>
            <div className="flex gap-4">
              <button
                 className="text-white text-sm font-bold rounded-md bg-navBlue px-3 py-2.5 "
                 onClick={addtoShoppingCart}
              >
                {" "}
                Add to Cart{" "}
              </button>
              <div className="flex gap-4">
              <div className="rounded-full border border-gray-400 w-10 flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faHeart}
                  size="sm"
                />
              </div>
              <div className="rounded-full border border-gray-400 w-10 flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  size="sm"
                  className="text-slate-600"
                />
              </div>
              <div className="rounded-full border border-gray-400 w-10 flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faEye}
                  size="sm"
                  className="text-slate-600"
                />
              </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="w-1/2 max-sm:w-full">
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 shadow-m">
                {product.images.length > 0 &&
                  product.images.map((image, idx) => {
                    return (
                      <img
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        src={image.url}
                        className="ring-1 ring-slate-200 rounded opacity-50 w-28 h-24 object-cover object-center hover:scale-105 hover:ease-out hover:duration-300 ease-out duration-300 rounded-b-md cursor-pointer"
                      />
                    );
                  })}
              </div>
            </div>
          </div>

        <ProductDescription />

        <BestSeller />
      </div>
      <Brands />
    </>
  );
}
