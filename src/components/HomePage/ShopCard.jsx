export default function ShopCard() {
  
  
  return (
    <div className="bg-lightbg">
    <div className="flex flex-col items-center max-w-screen-2xl w-full mx-auto text-darkText py-14 pb-16">
      <div className="my-4">
        <h3 className="font-bold text-center text-2xl text-darkText">EDITOR'S PICK</h3>
        <p className=" text-lighterDark font-semibold sm:w-2/3 sm:text-center sm:mx-auto">Problems trying to resolve the conflict between</p>
      </div>
      <div className="flex gap-10 justify-center max-w-screen-2xl sm:flex-col">
        <div className="relative overflow-hidden">
          <img
            src="./card-content/card-content-1.jpg"
            alt=""
            className="object-cover overflow-hidden h-[500px] w-[500px] sm:w-[320px] sm:h-[500px]"
          />
          <button className="absolute bottom-6 left-6 p-2 text-darkText bg-lightText w-[140px] h-[48px] font-bold">
            MEN
          </button>
        </div>

        <div className="relative overflow-hidden">
          <img src="./card-content/card-content-2.png" alt="" className="object-cover overflow-hidden h-[500px] w-[240px] sm:h-[500px] sm:mx-auto sm:w-[320px]"/>
          <button className="absolute bottom-6 left-6 p-2 text-darkText bg-lightText w-[136px] h-[48px] font-bold ">
            WOMEN
          </button>
        </div>
        
        <div className="flex flex-col gap-3"> 
          <div className="relative overflow-hidden">
            <img src="./card-content/card-content-3.jpg" alt="" className="object-cover overflow-hidden h-[244px] w-[240px] sm:w-[320px]" />
            <button className="absolute bottom-6 left-6 p-2 text-darkText bg-lightText w-[170px] h-[48px] font-bold">
            ACCESSORIES
          </button>
          </div>
          <div className="relative overflow-hidden">
            <img src="./card-content/card-content-4.jpg" alt="" className="object-cover overflow-hidden h-[240px] w-[240px] sm:w-[320px]" />
            <button className="absolute bottom-6 left-6 p-2 text-darkText bg-lightText w-[120px] h-[48px] font-bold">
            KIDS
          </button>
        </div>
        
        </div>
      </div>
    </div>
    </div>
  );
}
