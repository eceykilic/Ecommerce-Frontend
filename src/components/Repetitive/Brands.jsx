import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAws,
    faHooli,
    faLyft,
    faPiedPiperHat,
    faRedditAlien,
    faStripe,
  } from "@fortawesome/free-brands-svg-icons";



export default function Brands() {
    return (
        <div className="bg-lightbg mx-auto justify-between">
        <div className="flex justify-between mx-auto py-8 mb-0 pb-0 max-w-screen-2xl sm:flex-col sm:gap-10">
          <FontAwesomeIcon
            icon={faHooli}
            size="sm"
            className="text-lighterDark text-8xl sm:text-9xl"
          />
          <FontAwesomeIcon
            icon={faLyft}
            size="sm"
            className="text-lighterDark  text-8xl"
          />
          <FontAwesomeIcon
            icon={faPiedPiperHat}
            size="sm"
            className="text-lighterDark  text-8xl"
          />
          <FontAwesomeIcon
            icon={faStripe}
            size="sm"
            className="text-lighterDark text-8xl"
          />
          <FontAwesomeIcon
            icon={faAws}
            size="sm"
            className="text-lighterDark text-8xl"
          />
          <FontAwesomeIcon
            icon={faRedditAlien}
            size="sm"
            className="  text-lighterDark  text-8xl"
          />

          
        </div>
      </div>
    )
}