import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faStar,
  faHeart,
  faCartShopping,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import { Carousel } from "@material-tailwind/react";

import { useLocation } from "react-router-dom";

import { saveCartItemToDB, addToCart, updateCartItemQuantity } from "../../store/actions/shoppingCart/shoppingCartActions"

function ProductDetail() {
  const location = useLocation();
  const productData = location.state?.productData;

  
  const addToCartHandler = () => {
    const cartItem = {productId:product.id, quantity: 1, isChecked:true}
    saveCartItemToDB(userToken, history, cartItem)
    let isAvailable = false;
    cart.map((item) => {
        if (item.product.id == productId) isAvailable = true;
        return item;
    });
    isAvailable
        ? dispatch(updateCartItemQuantity(productId, true))
        : dispatch(addToCart(product));
    toastMixin.fire({
        animation: true,
        title: "Product added to cart"
    });
};
  
  
  
  
  if (!productData) {
    // If product data is not available, handle accordingly (e.g., show an error message)
    return <div>Product not found</div>;
  }

  const {
    productName: productNameFromData,
    productImage,
    price,
    badges,
  } = productData;

  return (
    <div className="bg-lightbg pt-10 pb-8">
      <div>
        <div className="flex mt-1 gap-2 justify-start max-w-screen-2xl mx-auto font-bold sm:text-center sm:justify-center">
          <h6 className="text-darkText">Home</h6>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-lighterDark mt-0.5"
          />
          <h6 className="text-lighterDark sm:pb-2">Shop</h6>
        </div>
        <div>
          <div className="max-w-screen-2xl flex mx-auto mt-10 gap-16 sm:scale-90 sm:flex-col sm:mt-2 sm:items-center sm:mx-auto">
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
                <img
                  src={productImage}
                  alt={productNameFromData}
                  className="h-full w-full object-cover"
                />
                <img
                  src={productImage}
                  alt={productNameFromData}
                  className="h-full w-full object-cover"
                />
              </Carousel>
            </div>

            <div className="flex flex-col justify-between sm:pl-10 sm:gap-6">
              <h4 className="font-bold text-darkText sm:text-2xl">{productNameFromData}</h4>
              <div className="flex gap-2">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-ratingY mt-0.5"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-ratingY mt-0.5"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-ratingY mt-0.5"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-ratingY mt-0.5"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-ratingY mt-0.5"
                />
                <h6 className="text-lighterDark font-bold pl-3">10 reviews</h6>
              </div>
              <div className="mt-4">
                <h5 className="text-darkText text-[24px] font-bold">{price}</h5>
                <div className="flex gap-2 sm:mt-3">
                  <h6 className="text-lighterDark font-bold ">Availability:</h6>
                  <h6 className="text-navBlue font-bold ">In Stock</h6>
                </div>
              </div>
              <div className="mt-4 w-[50%] text-[16px] font-medium sm:w-96">
                <p className="text-lighterDark">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met
                  sent. RELIT official consequent door ENIM RELIT Mollie.
                  Excitation venial consequent sent nostrum met.
                </p>
                <hr className="mt-4" />
              </div>
              {console.log("Badges:", badges)}
              <div className="flex gap-1 mb-5">
                <div className="w-[30px] h-[30px] bg-light-blue-500 rounded-full shadow-sm" />
                <div className="w-[30px] h-[30px] bg-green-500 rounded-full shadow-sm" />
                <div className="w-[30px] h-[30px] bg-orange-400 rounded-full shadow-sm" />
                <div className="w-[30px] h-[30px] bg-darkText rounded-full shadow-sm" />
              </div>
              <div>
                <div className="flex gap-2">
                  <button onClick={addToCartHandler} className="text-white text-sm font-bold leading-normal tracking-tight rounded-md bg-blue-400 px-3 py-2.5">
                    {" "}
                    Add to Cart{" "}
                  </button>
                  <div className="rounded-full border border-gray-800 w-10 flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="sm"
                      className="border-gray-800"
                    />
                  </div>
                  <div className="rounded-full border border-gray-800 w-10 flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      size="sm"
                      className="text-slate-600"
                    />
                  </div>
                  <div className="rounded-full border border-gray-800 w-10 flex justify-center items-center">
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
      </div>

      <div className="flex max-w-screen-2xl gap-2 mx-auto mt-3 mb-10 sm:hidden">
        <img src={productImage} alt="" className="w-[100px] h-[75px] object-cover overflow-hidden opacity-40" />
        <img src={productImage} alt="" className="w-[100px] h-[75px] object-cover overflow-hidden" />
      </div>
    </div>
  );
}

export default ProductDetail;
