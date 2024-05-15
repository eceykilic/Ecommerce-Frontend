import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function ContactPage() {
  return (
    <div>
      <div className="flex flex-col mx-auto gap-20">
        <div className="flex items-center justify-between gap-10 max-w-screen-2xl mx-auto sm:flex-col">
          <div className=" flex flex-col gap-4 items-start justify-center sm:text-center sm:items-center sm:gap-10">
            <h5 className="text-darkText text-base font-bold leading-normal tracking-tight">
              CONTACT US
            </h5>
            <h1 className="text-darkText text-[58px] font-bold leading-[80px] tracking-tight sm:text-4xl">
              Get in touch
              <br />
              today!
            </h1>
            <h4 className=" text-lighterDark text-xl font-medium sm:w-60 sm:text-lg">
              We know how large objects will act, but
              <br className="sm:hidden"/>
              things on a small scale
            </h4>
            <div className="text-darkText text-2xl font-bold sm:flex sm:flex-col sm:gap-4 sm:text-xl">
              <p>Phone ; +451 215 215</p>
              <p>Fax : +451 215 215</p>
            </div>
            <div className="flex gap-4 text-darkText sm:gap-8">
              <FontAwesomeIcon icon={faTwitter} size="2xl" />
              <FontAwesomeIcon icon={faFacebook} size="2xl" />
              <FontAwesomeIcon icon={faInstagram} size="2xl" />
              <FontAwesomeIcon icon={faLinkedin} size="2xl" />
            </div>
          </div>
          <div className=" w-3/5 flex justify-end sm:w-full">
            <div className="relative flex-col justify-center items-center inline-flex">
              <img className="w-full z-10" src="./contact/family.png" />
              <div className="w-[50%] h-[75%] absolute bg-clpink rounded-full" />
              <div className="w-[2%] h-[3%] absolute left-[20%] bottom-[20%]  bg-cpurple rounded-full" />
              <div className="w-[10%] h-[15%] absolute left-[15%] top-[10%] bg-clpink rounded-full" />
              <div className="w-[2%] h-[3%] absolute right-[20%] top-[20%]  bg-cpurple rounded-full" />
              <div className="w-[5%] h-[7.5%] absolute right-[15%] top-[50%] bg-clpink rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="my-20 text-darkText flex flex-col items-center text-center gap-2">
        <h6 className="font-bold sm:text-xs">VISIT OUR OFFICE</h6>
        <h2 className="font-bold sm:text-3xl sm:w-64">
          We help small businesses 
          <br/>
          with big ideas
        </h2>
      </div>

      <div className="flex gap-3 mx-80 max-w-screen-lg min-h-96  text-center mb-20 sm:flex-col sm:w-96">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 sm:gap-6 sm:py-20">
        <FontAwesomeIcon icon={faPhone} size="4x" className="text-navBlue" />
        <div className="text-darkText">
        <h6 className="font-bold">georgia.young@example.com</h6>
        <h6 className="font-bold">georgia.young@ple.com</h6>
        <h5 className="font-bold mt-3">Get Support</h5>
        </div>
        <button className="border-2 border-navBlue rounded-full py-3 px-4 w-44 text-navBlue font-bold text-sm">Submit Request</button>
        </div>
        
        <div className="flex flex-1 flex-col items-center justify-center bg-darkText gap-3 sm:gap-6 sm:py-20">
        <FontAwesomeIcon icon={faLocationDot} size="4x" className="text-navBlue"/>
        <div className="text-lightText">
        <h6 className="font-bold">georgia.young@example.com</h6>
        <h6 className="font-bold">georgia.young@ple.com</h6>
        <h5 className="font-bold mt-3">Get Support</h5>
        </div>
        <button className="border-2 border-navBlue rounded-full py-3 px-4 w-44 text-navBlue font-bold text-sm">Submit Request</button>
        </div>
       
        <div className="flex flex-1 flex-col items-center justify-center gap-3 sm:gap-6 sm:py-20">
        <FontAwesomeIcon icon={faEnvelope} size="4x" className="text-navBlue"/>
        <div className="text-darkText">
        <h6 className="font-bold">georgia.young@example.com</h6>
        <h6 className="font-bold">georgia.young@ple.com</h6>
        <h5 className="font-bold mt-3">Get Support</h5>
        </div>
        <button className="border-2 border-navBlue rounded-full py-3 px-4 w-44 text-navBlue font-bold text-sm">Submit Request</button>
        </div>
      </div>

      <img src="/contact/arrow.png" alt="" className="mx-auto"/>

      <div className="max-w-screen-lg mx-auto flex justify-center flex-col text-center mt-4 gap-4 mb-20 sm:gap-10">
        <h6 className="text-base font-bold">WE Can't WAIT TO MEET YOU</h6>
        <h2 className="text-6xl font-bold text-darkText sm:text-5xl">Let’s Talk</h2>
        <button className="border-1 border-navBlue rounded-md py-3 px-4 w-44 bg-navBlue text-lightText font-bold text-sm mx-auto">Try it free now</button>
      </div>




    </div>
  );
}
