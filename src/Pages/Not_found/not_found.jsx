import React, { useEffect } from "react";
import img from "./404_img.png";
import { Link } from "react-router-dom";

const Not_found = ({ abs, set_is_found }) => {
  useEffect(() => {
    set_is_found(false)
    console.log(abs)
  }, [])
  return (
    <div className="flex flex-col w-full h-[140%] relative justify-center items-center">
      <div className="w-full h-[50vh]"></div>
      <img
        src={img}
        className="md:w-[500px] w-[300px] h-[370px] md:h-[580px] pb-[66px] md:pb-[95px] absolute"
        alt=""
      />
      <div className="w-full h-[50vh]  flex items-center justify-center">
        <Link to="/ " className='scale-[91%] z-50 w-[407px] h-[92px] hover:bg-[#DCC38B] hover:text-white hover:font-[500] transition-all duration-200 active:bg-[#aa9263] active:scale-[91%] hover:scale-[93%] rounded-[10px] border-[1.5px] border-[#DCC38B] bg-[#FFFFFF] font-inter font-500 text-[26px] leading-[22px] text-black text-center flex items-center justify-center'>
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
};

export default Not_found;
