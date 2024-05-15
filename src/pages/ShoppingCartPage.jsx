import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  setAddToCart,
  toggleCheckItemAction,
  removeFromCart,
} from "../store/actions/shoppingCart/shoppingCartActions";
import { useDispatch, useSelector } from "react-redux";
import OrderSum from "../components/Repetitive/OrderSum";

import {
  faChevronRight,
  faPlus,
  faTrash,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShoppingCartPage() {
  const cart = useSelector((state) => state.shoppingCart.cart);
  const dispatch = useDispatch();
  const [discountInput, setDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const history = useHistory();
  const [isChecked, setIsChecked] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  //indirim kodu girişi
  const handleChange = (event) => {
    setDiscountCode(event.target.value);
  };

  //dispatching actions:
  function productAdder(item) {
    dispatch(setAddToCart(item));
  }

  function productRemover(item) {
    if (item.count === 1) {
      // Ürün sayısı 1 ise, ürünü sepetten tamamen kaldır
      dispatch(removeFromCart(item));
    } else {
      // Ürün sayısı 1'den fazla ise, ürün sayısını azalt
      dispatch(setAddToCart(item, "decrement"));
    }
  }

  function toggleCheckbox(item) {
    dispatch(toggleCheckItemAction(item));
  }

  function removeAllProduct(item) {
    dispatch(removeFromCart(item));
  }

  //toFixed() methodu ile çıkan sayıyı yuvarlama

  const roundTheNumber = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2);
  };

  let totalCargo = 29.99;

  // total fiyat hesabı
  function totalAmount() {
    let totalPrice = 0;

    for (let item of cart) {
      if (item.checked) {
        totalPrice += item.count * item.price;
      }
    }

    return totalPrice;
  }

  //totale göre kargo fiyatı ayarlama
  //sepetteki ürünlerin hiçbiri tikli değilse kargo fiyatı 0 görünmeli
  function cargoPrice() {
    if (cart.length === 0 || totalAmount() === 0) {
      return 0; // No items in the cart or totalAmount is 0, so shipping cost is 0
    } else if (totalAmount() > 150) {
      return parseFloat(totalAmount().toFixed(2));
    } else {
      return parseFloat((totalAmount() + totalCargo).toFixed(2));
    }
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleOrderTotalChange = (total) => {
    setOrderTotal(total);
  };

  return (
    <>
      <div>
        <h1 className="text-xl font-bold text-darkText max-w-screen-2xl mx-auto mt-5">
          Shopping Cart ({cart.length} items)
        </h1>
      </div>

      <div className="flex max-w-screen-2xl justify-between mx-auto mt-5 gap-10 mb-10">
        <div className="flex flex-col gap-8">
          {cart.map((item, index) => {
            if (item.count > 0) {
              return (
                <div
                  key={index}
                  className="flex items-center gap-10 border-2 py-5 px-2 justify-between"
                >
                  <input
                    className="border-lighterDark scale-125"
                    type="checkbox"
                    checked={item.checked}
                    onClick={() => toggleCheckbox(item)}
                    onChange={handleCheckboxChange}
                  />
                  <img
                    className="max-w-[150px] h-[200px] object-cover border-2 rounded-md"
                    src={item.images[0].url}
                    alt=""
                  />
                  <div className="flex flex-col gap-3">
                    <h1>{item.name}</h1>
                    <h2 className="text-lighterDark w-96">
                      {item.description}
                    </h2>
                    <p>Size: M</p>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        className="text-priceGreen"
                        icon={faTruck}
                      />
                      <p className="text-darkText">
                        Order within{" "}
                        <span className="font-bold text-darkText">
                          35 minutes
                        </span>{" "}
                        for{" "}
                        <span className="font-bold text-darkText">
                          next-day
                        </span>{" "}
                        delivery!
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-8">
                    <div className="flex items-center w-32">
                      <button
                        onClick={() => productRemover(item)}
                        className="px-3 py-3 border-2 bg-lightbg"
                      >
                        -
                      </button>
                      <p className="border-t-2 py-3 border-b-2 w-12 mx-auto text-center">
                        {item.count}
                      </p>
                      <button
                        onClick={() => productAdder(item)}
                        className="px-3 py-3 border-2 bg-lightbg text-navBlue"
                      >
                        +
                      </button>
                    </div>
                    <h1 className="text-lg text-navBlue w-20">
                      {roundTheNumber(item.price * item.count)}$
                    </h1>
                    <FontAwesomeIcon
                      className="text-lighterDark"
                      icon={faTrash}
                      onClick={() => removeAllProduct(item)}
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
        {cart.length > 0 ? (
          <div className="flex flex-col border-2 p-4 w-3/4 h-[20%]">
            <div className="flex flex-col gap-4 ">
              <button
                onClick={() => {
                  history.push("/order");
                }}
                className="text-sm border-1 rounded-md py-2 px-5 bg-navBlue text-white"
              >
                Proceed to Checkout <FontAwesomeIcon icon={faChevronRight} />
              </button>
              <OrderSum onOrderTotalChange={handleOrderTotalChange} />
              <button
                onClick={() => {
                  history.push("/order"); 
                }}
                className="text-sm border-1 rounded-md py-2 px-5 bg-navBlue text-white"
              >
                Proceed to Checkout <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        ) : (
          <h1 className="mx-auto text-3xl m-10 text-darkText">
            Shopping cart is empty.
          </h1>
        )}
      </div>
    </>
  );
}
