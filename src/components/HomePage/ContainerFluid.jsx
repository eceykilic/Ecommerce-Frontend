export default function ContainerFluid() {
    return (
        <div className="flex gap-[10rem] justify-center md:flex-col-reverse sm:gap-10">
            <img src="./fluid/fluid-1.png" alt="" className="sm:px-10"/>
            <div className="mt-40 sm:mx-auto sm:text-center sm:w-2/3">
                <h5 className="text-priceGray text-base font-semibold">SUMMER 2020</h5>
                <h1 className="text-4xl font-bold mt-4">Part of the Neural <br /> Universe</h1>
                <h4 className="mt-4 text-lighterDark text-xl">We know how large objects will act, <br /> but things on a small scale.</h4>
                <div className="mt-4 flex gap-2 sm:flex-col sm:items-center sm:gap-5">
                    <button className="w-[150px] h-[52px] bg-btnGreen font-bold rounded text-white text-sm sm:bg-navBlue">BUY NOW</button>
                    <button className="w-[170px] h-[52px] border-2 border-btnGreen font-bold rounded text-btnGreen text-sm sm:border-navBlue sm:text-navBlue">READ MORE</button>
                </div>
            </div>
        </div>
    )
}