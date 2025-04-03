import React, { useEffect, useState } from "react";
import city_get from "../../../../../../Services/cities/city";

const City_main = ({ lang, city, set_city }) => {
  const [cities, set_cities] = useState([]);
  useEffect(() => {
    const get_cities = async () => {
      try {
        const response = await city_get();
        set_cities(response);
      } catch (err) {
        console.error("Error:", err);
        throw err;
      }
    };
    get_cities();
  }, []);
  return (
    <div className="ml-[1px] sm:ml-[50px] mt-4 sm:mt-0 flex flex-col gap-[50px] sm:gap-[80px] font-inter font-[600] text-[20px] leading-[22px] text-black">
      {cities.map((item, index) => (
        <div
          onClick={() => {
            localStorage.setItem("city", item.name_en?.toLowerCase());
            set_city(item.name_en)
          }}
          key={index}
          className={`${
            item.name_en?.toLowerCase() === city?.toLowerCase()
              ? "text-[#DCC38B]"
              : ""
          } cursor-pointer`}
        >
          {item[`name_${lang}`]}
        </div>
      ))}
    </div>
  );
};

export default City_main;
