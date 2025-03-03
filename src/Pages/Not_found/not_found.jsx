import React from "react";
import img from "./404_img.png";

const Not_found = ({ set_is_found }) => {
  set_is_found(false);
  return (
    <div className="flex flex-col w-full h-full relative justify-center items-center">
      <div className="w-full h-[50vh] bg-[#FEDA73]"></div>
      <img
        src={img}
        className="w-[500px] h-[540px] pb-[95px] absolute"
        alt=""
      />
      <div className="w-full h-[50vh] bg-[#FCC42E] flex items-center justify-center">
        <a
            href="/"
          className="cursor-pointer hover:scale-[101%] active:scale-[99%] duration-200 z-10 mt-[70px] rounded-[10px] text-[16px] text-white border-white border-2 flex justify-center items-center p-4 w-[200px] h-[59px]"
        >
          Bosh sahifaga qaytish
        </a>
      </div>
    </div>
  );
};

export default Not_found;
