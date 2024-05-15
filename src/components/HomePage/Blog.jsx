import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

  
  const Blog = () => {

    const blogData = [
        {
          imageSrc: "./blog/blog1.jpg",
          category: "Google",
          title: "Loudest à la Madison #1 (L'integral)",
          description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
          date: "22 April 2021"
        },
        {
          imageSrc: "./blog/blog2.jpg",
          category: "Google",
          title: "Loudest à la Madison #1 (L'integral)",
          description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
          date: "22 April 2021"
        },
        {
          imageSrc: "./blog/blog3.jpg",
          category: "Google",
          title: "Loudest à la Madison #1 (L'integral)",
          description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
          date: "22 April 2021"
        },
      ];

    return (
      <div className="mb-24 max-w-screen-2xl mx-auto">
        <div className="text-center mt-28 sm:flex sm:flex-col sm:gap-5 sm:mb-16">
          <h6 className="text-navBlue text-sm font-bold">Practice Advice</h6>
          <h3 className="text-darkText text-4xl font-bold mt-3 sm:w-2/5 sm:mx-auto">Featured Posts</h3>
          <p className="mt-3 text-lighterDark font-medium mb-20 sm:hidden">
            Problems trying to resolve the conflict between <br />
            the two major realms of Classical physics: Newtonian mechanics
          </p>
          <p className="hidden sm:flex sm:text-lighterDark sm:font-medium sm:text-xs sm:text-center sm:justify-center">
          Problems trying to resolve the <br />
            conflict between the two major
          </p>
        </div>
  
        <div className="flex flex-wrap justify-between sm:px-10">
          {blogData.map((post, index) => (
            <div key={index} className="w-[348px] h-[606px] shadow-md sm:mb-8">
              <div className="relative">
                <img src={post.imageSrc} alt="" className="w-[350px] h-[300px] object-cover overflow-hidden" />
                <div className="absolute rounded-sm shadow px-2.5 left-5 top-5 bg-redish text-white text-sm font-bold leading-normal tracking-tight w-[56px] h-[24px]">
                  NEW
                </div>
              </div>
              <div className="px-3 mt-3 sm:flex sm:flex-col sm:gap-4">
                <div className="flex gap-3 text-xs font-medium">
                  <p className="text-navBlue">{post.category}</p>
                  <p className="text-lighterDark">Trending</p>
                  <p className="text-lighterDark">New</p>
                </div>
                <h4 className="text-darkText font-medium sm:text-xl">{post.title}</h4>
                <p className="font-medium text-lighterDark mt-3">{post.description}</p>
  
                <div className="flex justify-between">
                  <div className="flex">
                    <FontAwesomeIcon icon={faClock} size="sm" className="p-1 text-navBlue" />
                    <p className="text-lighterDark text-xs font-medium mt-0.5">{post.date}</p>
                  </div>
                  <div className="flex">
                    <FontAwesomeIcon icon={faChartSimple} size="sm" className="p-1 text-priceGreen" />
                    <p className="text-lighterDark text-xs font-normal leading-none tracking-tight mt-1">10 comments</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center cursor-pointer">
                  <p className="text-lighterDark text-sm font-bold leading-normal tracking-tight mt-2">Learn More</p>
                  <FontAwesomeIcon icon={faChevronRight} size="lg" className="text-navBlue sm:pt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Blog;
  