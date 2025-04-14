import React, { useEffect, useState } from "react";
import city_get from "../../Services/cities/city";
import { Link } from "react-router-dom";

const City = [
  {
    name: "Toshkent shahri",
  },
  {
    name: "Andijon shahri",
  },
  {
    name: "Farg'ona shahri",
  },
  {
    name: "Namangan shahri",
  },
];

const Borrow = ({ set_is_found, city, set_city, lang }) => {
  useEffect(() => {
    set_is_found(false);
  }, []);
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
    <div className="w-full h-screen">
      <div className="w-full mb-[50px] h-[82px] bg-[#DCC38B] flex items-center pl-[35px] sm:pl-[50px]">
        <h1 className="font-inter font-[600] text-[20px] leading-[22px] text-black">
          {lang == "uz"
            ? "Yetkazib berish shahrini tanlang"
            : lang == "en"
            ? "Select the city of delivery"
            : lang == "ru"
            ? "Выберите город доставки"
            : "Yetkazib berish shahrini tanlang"}
        </h1>
      </div>

      <div className="ml-[35px] sm:ml-[50px] sm:mt-0 flex flex-col gap-[50px] sm:gap-[80px] font-inter font-[600] text-[20px] leading-[22px] text-black">
        {cities.map((item, index) => (
          <div
            onClick={() => {
              localStorage.setItem("city", item.name_en?.toLowerCase());
              set_city(item.name_en);
            }}
            key={index}
            className={`${
              item.name_en?.toLowerCase() === city?.toLowerCase()
                ? "text-[#DCC38B]"
                : ""
            } cursor-pointer`}
          >
            <Link to="/enter/category">{item[`name_${lang}`]}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Borrow;
