import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import Team from "../components/About/Team";
import Brands from "../components/Repetitive/Brands";



export default function About() {
  return (
    <div>
      <div className="flex flex-col mx-auto gap-20">
        <div className="flex items-center justify-between gap-10 max-w-screen-2xl mx-auto sm:flex-col sm:mx-justify-center sm:text-center sm:mx-auto">
          <div className=" flex flex-col gap-4 items-start justify-center sm:items-center sm:gap-10">
            <h5 className="text-darkText text-base font-bold leading-normal tracking-tight sm:hidden">
              ABOUT COMPANY
            </h5>
            <h1 className="text-darkText text-[58px] font-bold leading-[80px] tracking-tight sm:text-3xl">
              ABOUT US
            </h1>
            <h4 className=" w-[60%] text-lighterDark text-xl font-medium sm:w-64">
              We know how large objects will act, but things on a small scale
            </h4>
            <button className="px-10 py-[15px] bg-navBlue rounded-[5px] text-lightText text-sm font-bold leading-snug tracking-tight">
              Get Quote Now
            </button>
          </div>
          <div className=" w-3/5 flex justify-end sm:w-full sm:mt-20">
            <div className="relative flex-col justify-center items-center inline-flex">
              <img className="w-full z-10" src="./about/aboutus.png" />
              <div className="w-[50%] h-[75%] absolute bg-clpink rounded-full" />
              <div className="w-[2%] h-[3%] absolute left-[20%] bottom-[20%]  bg-cpurple rounded-full" />
              <div className="w-[10%] h-[15%] absolute left-[15%] top-[10%] bg-clpink rounded-full" />
              <div className="w-[2%] h-[3%] absolute right-[20%] top-[20%]  bg-cpurple rounded-full" />
              <div className="w-[5%] h-[7.5%] absolute right-[15%] top-[50%] bg-clpink rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto mt-10 mb-10 sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-10">
        <p className="text-red-500 text-sm font-medium">Problems trying</p>
        <div className="flex gap-20 sm:flex sm:flex-col sm:w-72 sm:items-center sm:justify-center">
          <h2 className="text-darkText text-2xl font-bold">
            Met minim Mollie non desert <br /> Alamo est sit cliquey dolor do
            met sent.
          </h2>
          <p className="text-lighterDark max-w-screen-2xl text-sm font-medium ml-20 sm:mx-auto">
            Problems trying to resolve the conflict between the two major realms
            of <br />
            Classical physics: Newtonian mechanics{" "}
          </p>
        </div>
      </div>

      <div className="flex max-w-screen-2xl mx-auto justify-between sm:flex-col sm:justify-center sm:items-center sm:gap-24">
        <div className="flex flex-col w-1/4 items-center">
          <p className=" text-darkText text-[58px] font-bold leading-[80px]">
            15K
          </p>
          <p className="text-center text-lighterDark font-bold sm:w-44">
            Happy Customers
          </p>
        </div>
        <div className="flex flex-col w-1/4 items-center">
          <p className=" text-darkText text-[58px] font-bold leading-[80px]">
            150K
          </p>
          <p className="text-center text-lighterDark font-bold sm:w-44">
            Montly Visitors
          </p>
        </div>
        <div className="flex flex-col w-1/4 items-center">
          <p className=" text-darkText text-[58px] font-bold leading-[80px]">
            15
          </p>
          <p className="text-center text-lighterDark font-bold sm:w-48">
            Countries Worldwide
          </p>
        </div>
        <div className="flex flex-col w-1/4 items-center">
          <p className=" text-darkText text-[58px] font-bold leading-[80px]">
            100+
          </p>
          <p className="text-center text-lighterDark font-bold sm:w-44">Top Partners</p>
        </div>
      </div>


      <div className="max-w-screen-2xl relative flex items-center justify-center rounded-lg mx-auto mt-40 mb-40">
                <img className="w-full h-[550px] mx-auto rounded-lg sm:w-96 sm:h-96" src="/about/media.png" />
                <div className="w-full h-full absolute opacity-50 rounded-lg" />
                <div className="flex items-center justify-center w-20 h-20 bg-navBlue rounded-full absolute shadow-xl">
                    <FontAwesomeIcon icon={faPlay} size="xl" className="text-white" />
                </div>
            </div>


        <Team />

        <div className="bg-lightbg pt-20 pb-20 sm:pt-0">
        <div className="flex flex-col items-center justify-center gap-6 sm:text-center sm:w-96 sm:mx-auto">
                    <h2 className="text-darkText text-[40px] font-bold sm:text-3xl sm:w-56"> Big Companies Are Here</h2>
                    <p className="text-center text-lighterDark text-sm font-medium pb-10 sm:w-80"> Problems trying to resolve the conflict between <br className="sm:hidden"/> the two major realms of Classical physics: Newtonian mechanics  </p>
                </div>
        <Brands />
        </div>

        <div className="flex sm:bg-bluebg">
                <div className="w-2/3 bg-bluebg flex justify-center rounded-l-md sm:items-center sm:justify-center sm:mx-auto sm:p-16 sm:pb-20">
                    <div className=" w-1/2 flex flex-col items-start my-auto mx-auto gap-6 sm:w-full sm:items-center">
                        <h5 className="text-lightText text-base font-bold leading-normal tracking-tight">WORK WITH US</h5>
                        <h2 className="text-lightText text-[40px] font-bold leading-[50px] tracking-tight sm:w-72 sm:text-center">Now Let's grow Yours</h2>
                        <p className="text-lightText font-normal leading-tight tracking-tight sm:w-64">The gradual accumulation of information about atomic and <br />small-scale behavior during the first quarter of the 20th </p>
                        <button className="text-lightText ring-1 px-7 py-2.5 ring-gray-200 rounded-md text-sm font-bold leading-snug tracking-tight sm:px-8 sm:py-3">Button</button>
                    </div>
                </div>
                <div className="w-1/3 rounded-r-md sm:hidden">
                    <img src="/about/work.jpg" className="w-full h-full rounded-r-md " />
                </div>
            </div>


    </div>
  );
}
