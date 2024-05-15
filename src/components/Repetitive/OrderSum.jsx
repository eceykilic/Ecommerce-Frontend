import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    faChevronRight,
    faPlus,
    faTrash,
    faTruck,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function OrderSum ({ onOrderTotalChange }) {
    const cart = useSelector((state) => state.shoppingCart.cart);
    const dispatch = useDispatch();
    const [discountInput, setDiscountInput] = useState(false);
    const [discountCode, setDiscountCode] = useState(""); 
    
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

  useEffect(() => {
    // Calculate the order total whenever cart or other relevant data changes
    const calculatedOrderTotal = cargoPrice();
    onOrderTotalChange(calculatedOrderTotal); // Callback to update the parent state
  }, [cart, totalCargo]);
    
    
    return (
        <div>
        <div className="flex flex-col gap-3"> 
        <h1 className="text-xl">Order Summary</h1>
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{roundTheNumber(totalAmount())} $</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>{totalCargo} $</p>
              </div>
              <div className="flex justify-between border-b-2 pb-2">
                <p>
                  Free Shipping for <br /> 150$ and above
                </p>
                <p className="text-navBlue">-{totalCargo} $</p>
              </div>
              <div className="flex justify-between mb-3">
                <p>Order total</p>
                <p className="text-navBlue">{cargoPrice()} $</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setDiscountInput(!discountInput)}
                className="text-sm font-medium border-1 rounded-md py-3 px-5 border-2"
              >
                <FontAwesomeIcon className="text-navBlue" icon={faPlus} /> Enter
                Discount Code
              </button>
              {discountInput && (
                <form onSubmit={""} className="flex flex-col gap-2">
                  <input
                    onChange={handleChange}
                    value={discountCode}
                    type="text"
                    placeholder="Enter Code"
                    className="text-center border-2 py-2"
                  />
                  <button
                    type="submit"
                    className="border-1 w-24 m-auto py-2 rounded-lg bg-navBlue text-white"
                  >
                    Submit
                  </button>
                </form>
              )}
              </div>
              
              </div>
    )
}