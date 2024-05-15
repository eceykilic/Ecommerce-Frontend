import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function ProductDescription() {
  return (
    <div className="mb-5">
      <div className="text-lighterDark flex gap-5 justify-center mt-10 mb-8">
        <h5 className="text-base">Description</h5>
        <h5 className="font-bold text-base">Additional Information</h5>
        <div className="flex gap-2">
          <h5 className="font-bold text-base">Reviews</h5>
          <h5 className="text-priceGreen font-bold text-base">(0)</h5>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto">
        <hr className="mb-10 sm:hidden"/>
        <div>
          <div className="flex flex-row items-center justify-between sm:flex-col sm:mt-20">
            <img
              src="/cardlist/pl1.jpg"
              alt=""
              className="w-[400px] h-[370px] object-cover overflow-hidden rounded shadow-xl shadow-[#C4C4C4] mr-4 mb-4"
            />

            <div className="flex flex-col gap-3 w-[400px] mb-3 items-baseline h-[370px] sm:mt-10 sm:gap-8">
              <h5 className="text-darkText font-bold sm:text-3xl">
                the quick fox jumps over{" "}
              </h5>
              <h6 className="text-lighterDark sm:font-semibold sm:text-lg">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met. 
                <br />
                <br />
                Met minim Mollie
                non desert Alamo est sit cliquey dolor do met sent. RELIT
                official consequent door ENIM RELIT Mollie. Excitation venial
                consequent sent nostrum met. 
                <br />
                <br />
                Met minim Mollie non desert Alamo
                est sit cliquey dolor do met sent. RELIT official consequent
                door ENIM RELIT Mollie. Excitation venial consequent sent
                nostrum met.
              </h6>
            </div>

            <div className="flex flex-col gap-2 w-[400px] sm:mt-52 sm:font-semibold sm:text-lg">
              <div className="flex flex-col gap-2 sm:gap-4">
                <h5 className="text-darkText font-bold pb-3 sm:text-3xl">
                  the quick fox jumps over{" "}
                </h5>
                <div>    
                  <h6 className="text-lighterDark"><FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-priceGray mt-0.5 mr-2"
                  />the quick fox jumps over the lazy dog</h6>
                </div>
                <div>    
                  <h6 className="text-lighterDark"><FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-priceGray mt-0.5 mr-2"
                  />the quick fox jumps over the lazy dog</h6>
                </div>
                <div>    
                  <h6 className="text-lighterDark"><FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-priceGray mt-0.5 mr-2"
                  />the quick fox jumps over the lazy dog</h6>
                </div>
                <div>    
                  <h6 className="text-lighterDark"><FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-priceGray mt-0.5 mr-2"
                  />the quick fox jumps over the lazy dog</h6>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:gap-4">
                <h5 className="text-darkText font-bold pb-3 sm:mt-8 sm:text-3xl">
                  the quick fox jumps over{" "}
                </h5>
                <div>    
                  <h6 className="text-lighterDark"><FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-priceGray mt-0.5 mr-2"
                  />the quick fox jumps over the lazy dog</h6>
                </div>
                <div>    
                  <h6 className="text-lighterDark"><FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-priceGray mt-0.5 mr-2"
                  />the quick fox jumps over the lazy dog</h6>
                </div>
                <div>    
                  <h6 className="text-lighterDark"><FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-priceGray mt-0.5 mr-2"
                  />the quick fox jumps over the lazy dog</h6>
                </div>
                <div>    
                  <h6 className="text-lighterDark"><FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-priceGray mt-0.5 mr-2"
                  />the quick fox jumps over the lazy dog</h6>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
