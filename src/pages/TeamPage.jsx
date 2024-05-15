import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { data } from "../data/data"

export default function Team() {
  
  const ourTeamAll = data.about.employees.map((item, index) => {
    return (
        <div className="flex flex-col items-center w-[33%] mb-20 sm:w-full" key={index}>
            <img src={item.src} className="w-[320px] h-[230px] object-cover overflow-hidden" />
            <div className="flex flex-col gap-2 text-center py-3">
                <h5 className="text-darkText text-base font-bold">{item.fullname}</h5>
                <h6 className="text-lighterDark text-sm font-bold">{item.department}</h6>
                <div className="flex gap-4 items-center text-navBlue">
                    <FontAwesomeIcon icon={faFacebook} size="xl" />
                    <FontAwesomeIcon icon={faInstagram} size="xl" />
                    <FontAwesomeIcon icon={faTwitter} size="xl" />
                </div>
            </div>
        </div>
    )
})
  
  
  return (
    <div>
    <div>
      <div className="flex flex-col justify-center mx-auto max-w-screen-2xl items-center mt-10 sm:gap-4">
        <h5 className="text-lighterDark text-[16px] font-bold">WHAT WE DO</h5>
        <h2 className="font-bold text-darkText text-[58px] sm:text-4xl sm:w-80 sm:text-center">Innovation tailored for you</h2>
      </div>
      <div className="flex gap-2 mt-1 justify-center mb-20 sm:pt-6">
        <h6 className="font-bold text-darkText">Home</h6>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="text-lighterDark mt-0.5"
        />
        <h6 className="text-lighterDark font-bold">Team</h6>
      </div>

      <div className="flex flex-row w-full justify-between gap-16 sm:flex-col">
        <img src="/teampage/teampage1.jpg" alt="" className="w-[900px] h-[550px] object-cover overflow-hidden "/>
        <div className="flex flex-col justify-between sm:gap-2">
            <div className="flex gap-16 sm:gap-2">
                <img src="/teampage/teampage2.jpg" alt="" className="w-[435px] h-[245px] object-cover overflow-hidden"/>
                <img src="/teampage/teampage3.jpg" alt="" className="w-[435px] h-[245px] object-cover overflow-hidden"/>
            </div>
            <div className="flex gap-16 sm:gap-2"> 
                <img src="/teampage/teampage4.jpg" alt="" className="w-[435px] h-[245px] object-cover overflow-hidden"/>
                <img src="/teampage/teampage5.jpg" alt="" className="w-[435px] h-[245px] object-cover overflow-hidden"/>
            </div>
        </div>

      </div>
    </div>
    <div>
    <h2 className="text-[40px] font-bold text-darkText my-28 text-center sm:w-64 sm:mx-auto">Meet Our Team</h2>
    </div>

    <div className="mt-28 max-w-screen-2xl text-center mx-auto flex flex-row flex-wrap justify-between sm:flex-col">
        
            {ourTeamAll}
    </div>
    
    <div className="flex flex-col items-center justify-center gap-8 py-20">
                <h2 className="text-4xl font-bold leading-tight tracking-wide text-darkText sm:text-center">Start your <br className="hidden sm:flex"/>14 days free trial</h2>
                <p className="text-base font-normal text-lighterDark w-[25%] max-sm:w-full text-center sm:w-96">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.</p>
                <button className="bg-navBlue py-3 px-10 text-lightText font-bold text-base rounded-md">Try it free now</button>
                <div className="flex gap-4 text-[#395185]">
                    <FontAwesomeIcon icon={faTwitter} size="2xl" className="text-navBlue"/>
                    <FontAwesomeIcon icon={faFacebook} size="2xl"/>
                    <FontAwesomeIcon icon={faInstagram} size="2xl"className="text-darkText"/>
                    <FontAwesomeIcon icon={faLinkedin} size="2xl" className="text-bluebg"/>
                </div>
            </div>
    
    
   
    </div>
  );
}
