import React, { useEffect, useState } from "react";
import city_get from "../../../../../../Services/cities/city";
import region_get from "../../../../../../Services/cities/region";
import { ChevronLeft } from "lucide-react";

const City_main = ({ lang }) => {
  const [cities, set_cities] = useState([]);
  const [regions, set_regions] = useState([]);
  const [city, set_city] = useState(JSON.parse(localStorage.getItem("city")) || null);
  const [region, set_region] = useState(JSON.parse(localStorage.getItem("region")) || null);
  const [is_region_selected, set_is_region_selected] = useState(!!region);

  // Fetch regions if none is selected
  useEffect(() => {
    if (!region) {
      const get_regions = async () => {
        try {
          const response = await region_get();
          set_regions(response);
        } catch (err) {
          console.error("Error fetching regions:", err);
        }
      };
      get_regions();
    }
  }, [region]);

  // Fetch cities when a region is selected
  useEffect(() => {
    if (region) {
      const get_cities = async () => {
        try {
          const response = await city_get();
          set_cities(response.filter((item) => item.region === region.id));
        } catch (err) {
          console.error("Error fetching cities:", err);
        }
      };
      get_cities();
    }
  }, [region]);

  // Handle region selection
  const handle_region_select = (selected_region) => {
    localStorage.setItem("region", JSON.stringify(selected_region));
    localStorage.removeItem("city"); // Clear city when region changes
    localStorage.removeItem("pickup_address"); // Clear pickup address
    set_region(selected_region);
    set_city(null); // Reset city state
    set_is_region_selected(true);
  };

  // Handle city selection
  const handle_city_select = (selected_city) => {
    localStorage.setItem("city", JSON.stringify(selected_city));
    localStorage.removeItem("pickup_address"); // Clear pickup address
    set_city(selected_city);
  };

  // Handle back to region selection
  const handle_back_to_regions = () => {
    localStorage.removeItem("region"); // Clear region
    localStorage.removeItem("city"); // Clear city
    localStorage.removeItem("pickup_address"); // Clear pickup address
    set_region(null);
    set_city(null);
    set_is_region_selected(false);
  };

  return (
    <div className="flex flex-col w-full gap-8 sm:gap-10">
      {!is_region_selected ? (
        <>
          <h1 className="sm:ml-[50px] font-inter font-[600] text-[25px] mt-3 sm:text-[30px] leading-[22px] text-black">
            {lang === "uz" ? "Viloyatni tanlang" : "en" ? "Select a region" : "ru" ? "Выберите регион" : "Viloyatni tanlang"}
          </h1>
          <hr className="w-full" />
          <div className="sm:ml-[50px] sm:mt-0 flex flex-col gap-[50px] sm:gap-[80px] font-inter font-[600] text-[20px] leading-[22px] text-black">
            {regions.map((item, index) => (
              <div
                key={index}
                onClick={() => handle_region_select(item)}
                className="cursor-pointer hover:text-[#DCC38B]"
              >
                {item[`name_${lang}`]}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-8 mt-2">
          <div className="flex items-center gap-2 sm:gap-4 sm:ml-[50px]">
            <button
              onClick={handle_back_to_regions}
              className="text-[#DCC38B] hover:text-[#B89E6F]"
            >
              <ChevronLeft className="w-8 h-8"/>
            </button>
            <h1 className="font-inter font-[600] text-[25px] sm:text-[30px] leading-[22px] text-black">
              {region?.[`name_${lang}`]}
            </h1>
          </div>
          <hr className="w-full -mt-2" />
          <div className="sm:ml-[50px] flex flex-col gap-[50px] sm:gap-[80px] font-inter font-[600] text-[20px] leading-[22px] text-black">
            {cities.map((item, index) => (
              <div
                onClick={() => handle_city_select(item)}
                key={index}
                className={`${
                  item.id === city?.id ? "text-[#DCC38B]" : ""
                } cursor-pointer hover:text-[#DCC38B]`}
              >
                {item[`name_${lang}`]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default City_main;