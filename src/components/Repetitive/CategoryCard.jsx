import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useLocation } from "react-router-dom";

export default function CategoryCard() {
  const { gender } = useParams();
  const [categories, setCategories] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://workintech-fe-ecommerce.onrender.com/categories");
        const data = await response.json();
  
        // Extract gender category from the URL path
        const pathGender = gender === 'kadin' ? 'k' : 'e';
  
        // Filter categories based on the extracted gender
        const filteredCategories = data.filter(category => category.gender === pathGender);
  
        // Sort categories based on the gender condition
        const sortedCategories = filteredCategories.sort((a, b) => b.rating - a.rating);
  
        // Select top 5 categories
        const topCategories = sortedCategories.slice(0, 5);
  
        // Set the state with the top categories
        setCategories(topCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, [gender]);

  return (
    <div className="bg-lightbg">
      <div className="pt-4">
        <div className="flex max-w-screen-2xl justify-between mx-auto sm:flex-col sm:text-center sm:justify-center sm:gap-10">
          <h2 className="text-darkText font-bold font-monster text-[24px] sm:pt-6">Shop</h2>
          <div className="flex gap-2 mt-1 sm:text-center sm:justify-center">
            <h6 className="sm:font-bold">Home</h6>
            <FontAwesomeIcon icon={faChevronRight} className="text-lighterDark mt-0.5" />
            <h6 className="text-lighterDark sm:font-bold">Shop</h6>
          </div>
        </div>
      </div>

      <div className="flex justify-between max-w-screen-2xl mx-auto pt-4 pb-4 sm:pt-10 sm:flex-col sm:mx-auto sm:items-center">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/shopping/${gender}/${category.code.slice(2)}${search}`}
            className="text-lighterDark sm:font-bold"
          >
            <div className="relative sm:py-2">
              <img
                src={category.img}
                alt={category.title}
                className="object-cover overflow-hidden w-[200px] h-[220px] sm:w-96 sm:h-96"
              />
              <h6 className="absolute px-2.5 mx-auto left-16 top-24 font-bold leading-normal text-lightText sm:left-40 sm:top-44 sm:text-lg">
                {category.title} <br /> <br className="hidden sm:flex" /> {category.rating} Rating
              </h6>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
