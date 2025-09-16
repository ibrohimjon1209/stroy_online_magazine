import React, { useEffect, useState } from "react";
import city_get from "../../../../../../Services/cities/city";

const City_main = ({ lang }) => {
  const [cities, set_cities] = useState([]);
  const [city, set_city] = useState(JSON.parse(localStorage.getItem("city")))
  const region = JSON.parse(localStorage.getItem("region"));
  useEffect(() => {
    const get_cities = async () => {
      try {
        const response = await city_get();
        console.log(response);
        set_cities(response.filter((item) => item.region == region.id));
      } catch (err) {
        console.error("Error:", err);
        throw err;
      }
    };
    get_cities();
  }, []);
  return (
<div className="flex flex-col w-full gap-10">
      
<h1 className="ml-[1px] sm:ml-[50px] font-inter font-[600] text-[30px] leading-[22px] text-black">
  {region[`name_${lang}`]}
</h1>
<hr className="w-full"/>
<div className="ml-[1px] sm:ml-[50px] mt-4 sm:mt-0 flex flex-col gap-[50px] sm:gap-[80px] font-inter font-[600] text-[20px] leading-[22px] text-black">
      {cities.map((item, index) => (
        <div
        onClick={() => {
          localStorage.setItem("city", JSON.stringify(item));
          set_city(item);
          localStorage.setItem("pickup_address", null);
        }}
        key={index}
          className={`${
            item.id === city?.id ? "text-[#DCC38B]" : ""
          } cursor-pointer`}
          >
          {item[`name_${lang}`]}
        </div>
      ))}
    </div>
      </div>
  );
};

export default City_main;
