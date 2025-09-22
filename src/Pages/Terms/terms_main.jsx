import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Terms_main = ({ lang, set_is_another_nav }) => {
  const [data, set_data] = useState([]);
  const API_URL = "https://backkk.stroybazan1.uz/api/api/user-agreements/";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => set_data(json))
      .catch((err) => console.error("Error", err));
  }, []);

  useEffect(() => {
    set_is_another_nav(true);
    return () => set_is_another_nav(false); // Reset on unmount
  }, [set_is_another_nav]);

  const getTitle = () => {
    if (lang === "uz") return "Foydalanuvchi shartnomasi";
    if (lang === "ru") return "Пользовательское соглашение";
    if (lang === "en") return "User agreement";
    return "Foydalanuvchi shartnomasi";
  };

  // Function to format the content
  const formatContent = (content) => {
    if (!content) return <p>Yuklanmoqda...</p>;

    // Split content into lines and filter out empty lines
    const lines = content.split("\n").filter(Boolean);

    return lines.map((line, index) => {
      // Match lines starting with numbers like "1.", "1.1.", "2."
      const match = line.match(/^(\d+(\.\d+)*\.)\s(.+)/);
      if (match) {
        const number = match[1]; // e.g., "1.", "1.1."
        const text = match[3]; // e.g., "General provisions"
        return (
          <div key={index} className="mb-4">
            <p className="mb-2">
              <strong>{number}</strong> {text}
            </p>
            {/* Add empty line before the next main section (e.g., "2.") */}
            {lines[index + 1]?.match(/^2\./) && <br />}
          </div>
        );
      }
      // Handle bullet points or continuation text
      return <p key={index} className="mb-2 ml-4">{line}</p>;
    });
  };

  return (
    <div className="w-full h-full flex flex-col mb-[35px]">
      <div className="sticky w-full h-[65px] top-0 z-50">
        <div className="bg-[#DCC38B] flex items-center gap-[10px] w-full h-full font-inter font-[600] text-[17px] sm:text-[20px] leading-[22px] text-black pl-[13px] sm:pl-[50px]">
          <Link to="/formalization" onClick={() => set_is_another_nav(false)}>
            <ChevronLeft className="scale-110 sm:scale-100 sm:w-[35px] sm:h-[35px] mt-[2px] cursor-pointer" />
          </Link>
          <p>{getTitle()}</p>
        </div>
      </div>

      <div className="max-w-[90%] mt-[20px] sm:mt-[45px] mx-auto font-inter font-[600] text-[15px] leading-[22px] text-black text-justify">
        {data.length > 0 ? (
          <div className="flex-col gap-6">
            <h1 className="text-[26px] font-[600]">{data[0][`title_${lang}`]}</h1>
            <br />
            <div>{formatContent(data[0][`content_${lang}`])}</div>
          </div>
        ) : (
          <p>Yuklanmoqda...</p>
        )}
      </div>
    </div>
  );
};

export default Terms_main;