import React from "react";
import ProductCard from "../Repetitive/ProductCard";
import { data } from "../../data/data";

export default function ProductPageBest() {
  const bestSellerProducts = data.productl.filter(
    (product) => product.category === "bestSeller"
  );

  const chunkArray = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  // 4'erli gruplar halindeki ürünleri render etme
  const renderProductGroups = () => {
    const productGroups = chunkArray(bestSellerProducts, 4);

    return productGroups.map((group, index) => ( 
      <div key={index} className="max-w-screen-2xl flex w-full justify-between items-center mb-16 mt-2 mx-auto sm:flex-col sm:gap-10">
        {group.map((product) => (
          <ProductCard
            key={product.productName}
            productImage={product.productImage}
            productName={product.productName}
            department={product.department}
            price={product.price}
            discountedPrice={product.discountedPrice}
            badges={product.badges}
            customImageSize="w-[240px] h-[280px] sm:w-96 sm:h-full"
            showBadges={false}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="bg-lightbg pt-5"> 
      <div className="max-w-screen-2xl mx-auto">
        <h3 className="font-monster text-darkText font-bold mb-4 sm:text-3xl sm:mx-auto sm:text-center">
          BESTSELLER PRODUCTS
        </h3>
        <hr className="mb-4" />
      </div>
      <div className="flex flex-col sm:justify-center sm:items-center">{renderProductGroups()}</div>
    </div>
  );
}
