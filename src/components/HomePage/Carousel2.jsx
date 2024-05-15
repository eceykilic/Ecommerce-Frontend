import React from 'react';
import { Carousel } from "@material-tailwind/react";

function Carousel2() {

  const caption = (
    <div className="absolute top-2/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 text-lightText flex flex-col gap-4 max-w-screen-2xl sm:mx-auto sm:top-1/4 sm:left-2/3 sm:pr-36 sm:gap-3 sm:mt-28 sm:text-center sm:w-[100%]">
      <h5 className="font-bold tracking-wider mb-4">SUMMER 2020</h5>
      <h1 className="font-bold text-7xl tracking-wider mb-4 sm:text-4xl">Vita Classic <br /> Product</h1>
      <h4 className="tracking-wider mb-4 sm:text-sm">
        We know how large objects will act, We know
        <br />
        how are objects will act, We know
      </h4>
      <div className="flex flex-row gap-5 sm:flex-col">
      <h5 className="mt-3 text-2xl sm:scale-75">$16.48</h5>
      <button className="bg-btnGreen text-white font-bold text-s py-3 rounded leading-8 w-[180px] sm:scale-75 sm:mx-auto">
        ADD TO CART
      </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative bg-priceGreen">
      <Carousel
  className="max-w-[1800px] max-h-[1000px] bg-priceGreen relative overflow-hidden mx-auto sm:h-[1230px]"
  navigation={({ setActiveIndex, activeIndex, length }) => (
    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 sm:hidden">
      {new Array(length).fill("").map((_, i) => (
        <span
          key={i}
          className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
            activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
          }`}
          onClick={() => setActiveIndex(i)}
        />
      ))}
    </div>
  )}
>
  <img
    src='./carousel2/carouselman.png'
    alt="malePicture"
    className="ml-auto mr-20 object-cover overflow-hidden scale-75 relative mt-44 sm:pt-96"
  />
  <img
    src='./carousel2/carouselman.png'
    alt="malePicture"
    className="ml-auto mr-20 object-cover overflow-hidden scale-75 relative mt-44"
  />
</Carousel>


        {caption}
      </div>
    </>
  );
}

export default Carousel2;
