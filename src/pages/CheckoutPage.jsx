import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const CheckoutPage = () => {
  const [previousOrders, setPreviousOrders] = useState([]);

  useEffect(() => {
    // Önceki siparişleri almak için API çağrısı
    const fetchPreviousOrders = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axiosInstance.get("/order", {
          headers: {
            Authorization: token,
          },
        });
        setPreviousOrders(response.data);
      } catch (error) {
        console.error("Error fetching previous orders:", error);
      }
    };

    fetchPreviousOrders();
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto mt-10 text-darkText mb-10">
      <h1 className="text-4xl text-center pb-10 font-bold">Siparişiniz alındı, teşekkürler!</h1>

      <ul className="flex flex-col gap-8">
        <h2 className="text-2xl font-medium">Previous Orders</h2>
        {previousOrders.reverse().map(
          (
            order // Siparişleri tersine çevir
          ) => (
            <li key={order.id} className="border-2 flex flex-col rounded-lg">
              <div className="flex gap-10">
                <div className="flex gap-3 flex-col">
                  <img
                    src={order.products[0].images[0].url}
                    alt={order.products[0].name}
                    className="w-36  p-2 object-cover overflow-hidden"
                  />
                </div>
                <div className="flex flex-col justify-between py-4">
                  <div>
                    <p className="text-xl">Order ID: {order.id}</p>
                    <p className="text-lg">Total Price: {order.price} $</p>
                  </div>
                  <div className="flex gap-3">
                    {order.products.map((product, index) => (
                      <img
                        key={index}
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-20 border-2 opacity-50"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default CheckoutPage;
