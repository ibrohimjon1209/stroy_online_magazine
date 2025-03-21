import React from "react";

const Language_main = () => {
  return (
    <div className="bg-white flex justify-center items-center mx-auto">
      <div className="flex flex-col gap-[20px] mt-[48%] sm:mt-0 sm:gap-[31px]">
        <button className="w-[318px] sm:w-[487px] h-[60px] sm:h-[92px] hover:bg-[#DCC38B] hover:text-white hover:font-[600] transition-all duration-200 active:bg-[#aa9263] active:scale-[99%] hover:scale-[101%] rounded-[10px] border-[1.5px] border-[#DCC38B] bg-[#FFFFFF]  font-inter font-500 text-[17px] sm:text-[28px] leading-[22px] text-black cursor-pointer">
          O’zbekcha
        </button>
        <button className="w-[318px] sm:w-[487px] h-[60px] sm:h-[92px] hover:bg-[#DCC38B] hover:text-white hover:font-[600] transition-all duration-200 active:bg-[#aa9263] active:scale-[99%] hover:scale-[101%] rounded-[10px] border-[1.5px] border-[#DCC38B] bg-[#FFFFFF]  font-inter font-500 text-[17px] sm:text-[28px] leading-[22px] text-black cursor-pointer">
          English
        </button>
        <button className="w-[318px] sm:w-[487px] h-[60px] sm:h-[92px] hover:bg-[#DCC38B] hover:text-white hover:font-[600] transition-all duration-200 active:bg-[#aa9263] active:scale-[99%] hover:scale-[101%] rounded-[10px] border-[1.5px] border-[#DCC38B] bg-[#FFFFFF]  font-inter font-500 text-[17px] sm:text-[28px] leading-[22px] text-black cursor-pointer">
          Русский
        </button>
      </div>
    </div>
  );
};

export default Language_main;
