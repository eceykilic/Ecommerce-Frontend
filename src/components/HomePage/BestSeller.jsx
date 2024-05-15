import ProductCard from "../Repetitive/ProductCard";
import React, { useEffect, useState } from 'react';

export default function BestSeller() {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://workintech-fe-ecommerce.onrender.com/products');
        const data = await response.json();
  
        console.log('Fetched data:', data);
  
        // Assuming the API returns an array of products
        // Directly set the state with the fetched data
        setBestSellerProducts(data.products);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Fetch data when the component mounts
    fetchData();
  }, []);
  
  const productCards = bestSellerProducts.sort((a, b) => b.sell_count - a.sell_count).slice(0, 8).map((item, index) => {
        return <ProductCard data={item} key={index} className="w-[25%]" />
    })

  return (
    <div>
      <div className="flex mt-16 mb-8 text-center flex-col gap-3">
        <h2 className="text-lighterDark text-xl font-medium">Featured Products</h2>
        <h3 className="font-bold text-2xl sm:w-2/5 sm:mx-auto sm:py-2">BESTSELLER PRODUCTS</h3>
        <p className="text-lighterDark font-medium mb-12 sm:w-2/3 sm:mx-auto">
          Problems trying to resolve the conflict between
        </p>
        <div className="flex flex-wrap justify-center items-center gap-7 max-sm:flex-col">
            {productCards}
        </div>
      </div>
    </div>
  );
}
