import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
    return (
        <div className="bg-lightbg flex flex-col mx-auto">
            <div className="max-w-screen-2xl flex w-full mx-auto justify-between">
                <div className="flex items-center py-6 pt-10 max-w-screen-2xl justify-between w-full h-full sm:flex sm:flex-col sm:items-start sm:pl-10 sm:gap-6">
                    <h3 className="text-darkText text-2xl font-bold leading-loose tracking-tight">Bandage</h3>
                    <div className="text-navBlue gap-8 flex ">
                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                        <FontAwesomeIcon icon={faInstagram} size="lg" />
                        <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </div>
                </div>
                <hr className="border border-t-lighterDark mb-2" />
            </div>
            <div className="bg-lightText">
            <div className="py-12 flex justify-between max-w-screen-2xl mx-auto sm:flex-col sm:pl-10 sm:gap-10">
                <div className="flex flex-col gap-4">
                    <h5 className="text-base font-bold leading-normal tracking-tight">Company info</h5>
                    <div className="flex flex-col gap-3">
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">About Us</h6>
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">Carrier</h6>
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">We are hiring</h6>
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">Blog</h6>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h5 className="text-base font-bold leading-normal tracking-tight">Legal</h5>
                    <div className="flex flex-col gap-3">
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">About Us</h6>
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">Carrier</h6>
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">We are hiring</h6>
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">Blog</h6>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h5 className="text-base font-bold leading-normal tracking-tight">Features</h5>
                    <div className="flex flex-col gap-3">
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">Business Marketing</h6>
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">User Analytic</h6>
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">Live Chat</h6>
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">Unlimited Support </h6>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h5 className="text-base font-bold leading-normal tracking-tight">Resources</h5>
                    <div className="flex flex-col gap-3">
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">IOS & Android</h6>
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">Watch a Demo</h6>
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">Customers</h6>
                        <h6 className="text-lighterDark text-sm font-bold leading-normal tracking-tight">API              </h6>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h5 className="text-base font-bold leading-normal tracking-tight">Get in Touch</h5>
                    <div className="flex flex-col items-start">
                        <div className="flex items-center">
                            <input type="text" placeholder=" Your Email" className="py-[5%] border rounded-l-md text-darkText font-normal" />
                            <button className="py-[5%] px-[2%] border bg-[#23A6F0] text-white rounded-r-md w-28">Subscribe</button>
                        </div>
                        <p className="text-darkText text-xs font-normal leading-7 tracking-tight">Lore imp sum dolor Amit</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="flex pb-4 max-w-screen-2xl mx-auto w-full h-full">
                <p className=" text-lighterDark text-sm font-bold leading-normal tracking-tight mt-4 mb-0 sm:w-48 sm:text-center sm:mx-auto">Made With Love By Finland All Right Reserved</p>
            </div>
        </div>
    )
}