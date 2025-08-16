import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Terms_main = ({ lang }) => {
  const [data, set_data] = useState([]);
  const API_URL = "https://backkk.stroybazan1.uz/api/api/user-agreements/";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => set_data(json))
      .catch((err) => console.error("Error", err));
  }, []);

  const getTitle = () => {
    if (lang === "uz") return "Foydalanuvchi shartnomasi";
    if (lang === "ru") return "Пользовательское соглашение";
    if (lang === "en") return "User agreement";
    return "Foydalanuvchi shartnomasi";
  };

  return (
    <div className="w-full h-full flex flex-col mb-[35px]">
      <div className="sticky w-full h-[65px] top-0 z-50">
        <div className="bg-[#DCC38B] flex items-center gap-[10px] w-full h-full font-inter font-[600] text-[17px] sm:text-[20px] leading-[22px] text-black pl-[13px] sm:pl-[50px]">
          <Link to="/formalization">
            <ChevronLeft className="scale-110 sm:scale-100 sm:w-[35px] sm:h-[35px] mt-[2px] cursor-pointer" />
          </Link>
          <p>{getTitle()}</p>
        </div>
      </div>

      <div className="max-w-[90%] mt-[20px] sm:mt-[35px] mx-auto font-inter font-[600] text-[15px] leading-[22px] text-black text-justify">
        {data.length > 0 ? (
          <p>{data[0][`content_${lang}`]}</p>
        ) : (
          <p>Yuklanmoqda...</p>
        )}
      </div>
    </div>
  );
};

export default Terms_main;
