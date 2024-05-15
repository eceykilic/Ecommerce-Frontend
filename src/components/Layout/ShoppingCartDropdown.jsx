import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ShoppingCartDropdown = ({ onClose }) => {
  const history = useHistory();
  const shoppingCart = useSelector((store) => store.shoppingCart);
  console.log("ShoppingCartDropdown - shoppingCart:", shoppingCart);
  const cart = useSelector((store) => store.shoppingCart.cart);
  console.log("ShoppingCartDropdown - cart:", cart);

  useEffect(() => {
    // Bu kısım yalnızca bir kere çalışacak
    console.log("Dropdown opened!");

    // useEffect temizleme fonksiyonu
    return () => {
      console.log("Dropdown closed!");
    };
  }, []);



  return (
    <div className="absolute top-12 p-5 right-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 min-w-96 min-h-46" onClick={onClose}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">
          Shopping Cart <span>- {cart.length} Item(s)</span>
        </h3>
        <FontAwesomeIcon
          icon={faTimes}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      {cart.length > 0 ? (
        <div className="">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-8 border-b-2 py-2">
              <img
                className="w-24 h-32 border-2 rounded-lg object-cover my-2"
                src={item.images[0].url}
                alt=""
              />
              <div className="flex flex-col mr-10 gap-2 justify-center">
                <p className="text-md font-semibold">{item.name}</p>
                <p className="text-sm text-lighterDark font-medium">
                  Size:M Count:{item.count}
                </p>
                <p className="text-sm">${item.price}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-3 mt-4 justify-between">
            <button
              onClick={() => history.push("/cart")}
              className="py-2 px-5 rounded-md bg-gray-100 hover:bg-gray-700"
            >
              Go to Cart
            </button>
            <button
              onClick={() => {
                history.push("/order");
              }}
              className="py-2 px-3 rounded-md bg-navBlue text-white hover:bg-gray-700 hover:text-navBlue"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Your shopping cart is empty.</p>
      )}
    </div>
  );
};

export default ShoppingCartDropdown;
