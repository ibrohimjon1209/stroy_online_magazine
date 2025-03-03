import React from "react";
import img from "./404_img.png";

const Not_found = ({ set_is_found }) => {
  set_is_found(false);
  return (
    <div className="flex flex-col w-full h-full relative justify-center items-center">
      <div className="w-full h-[50vh] bg-[#FEDA73]"></div>
      <img
        src={img}
        className="md:w-[500px] w-[300px] h-[370px] md:h-[540px] pb-[66px] md:pb-[95px] absolute"
        alt=""
      />
      <div className="w-full h-[50vh] bg-[#FCC42E] flex items-center justify-center">
        <a
            href="/"
          className="cursor-pointer hover:scale-[101%] active:scale-[99%] duration-200 z-10 mt-[10px] md:mt-[70px] rounded-[10px] text-[13px] whitespace-nowrap md:text-[16px] text-white border-white border-2 flex justify-center items-center p-4 w-[150px] h-[50px] md:w-[200px] md:h-[59px]"
        >
          Bosh sahifaga qaytish
        </a>
      </div>
    </div>
  );
};

export default Not_found;
