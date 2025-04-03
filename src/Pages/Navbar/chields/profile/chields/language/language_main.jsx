import React, { useEffect, useState } from "react";

const Language_main = ({lang, set_lang}) => {
  useEffect(() => {
    set_lang(localStorage.getItem("lang") || "uz");
  }, []);
  return (
    <div className="flex items-center justify-center mx-auto bg-white">
      <div className="flex flex-col gap-[20px] mt-[48%] sm:mt-0 sm:gap-[31px]">
        <button
          onClick={() => {
            set_lang("uz");
            localStorage.setItem("lang", "uz");
          }}
          className={`w-[318px] sm:w-[487px] h-[60px] sm:h-[92px] hover:bg-[#DCC38B] hover:text-white hover:font-[600] transition-all duration-200 active:bg-[#aa9263] active:scale-[99%] hover:scale-[101%] rounded-[10px] border-[1.5px] border-[#DCC38B] ${
            lang == "uz" ? "bg-[#DCC38B] text-white" : "bg-[#FFFFFF] text-black"
          } font-inter font-500 text-[17px] sm:text-[28px] leading-[22px] cursor-pointer`}
        >
          O’zbekcha
        </button>
        <button
          onClick={() => {
            set_lang("en");
            localStorage.setItem("lang", "en");
          }}
          className={`w-[318px] sm:w-[487px] h-[60px] sm:h-[92px] hover:bg-[#DCC38B] hover:text-white hover:font-[600] transition-all duration-200 active:bg-[#aa9263] active:scale-[99%] hover:scale-[101%] rounded-[10px] border-[1.5px] border-[#DCC38B] ${
            lang == "en" ? "bg-[#DCC38B] text-white" : "bg-[#FFFFFF] text-black"
          } font-inter font-500 text-[17px] sm:text-[28px] leading-[22px] cursor-pointer`}
        >
          English
        </button>
        <button
          onClick={() => {
            set_lang("ru");
            localStorage.setItem("lang", "ru");
          }}
          className={`w-[318px] sm:w-[487px] h-[60px] sm:h-[92px] hover:bg-[#DCC38B] hover:text-white hover:font-[600] transition-all duration-200 active:bg-[#aa9263] active:scale-[99%] hover:scale-[101%] rounded-[10px] border-[1.5px] border-[#DCC38B] ${
            lang == "ru" ? "bg-[#DCC38B] text-white" : "bg-[#FFFFFF] text-black"
          } font-inter font-500 text-[17px] sm:text-[28px] leading-[22px] cursor-pointer`}
        >
          Русский
        </button>
      </div>
    </div>
  );
};

export default Language_main;
