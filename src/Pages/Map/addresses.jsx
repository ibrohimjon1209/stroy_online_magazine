import React from "react";
import arrive_icon from "./imgs/arrive_icon.png";
import { Link } from "react-router-dom";

const Addresses = () => {
    const addresses_list = [
        {
          name: "Toshkent shahri",
        },
        {
          name: "Andijon Shahri, Qaysidir ko'cha, 10-a uy. Andijon Shahri",
        },
        {
          name: "Andijon viloyat",
        },
      ];
    return (
        <div className="w-[90%] mx-auto h-full flex flex-col mt-[35px]">
        <div className="w-[85%] mx-auto h-full flex flex-row font-inter font-[600] text-[16px] leading-[22px] text-black gap-[65px]">
          <div className="border-[#DCC38B] border-b-2 pb-[10px] cursor-pointer">
            Ro’yxat
          </div>
          <Link to="/delivery/map" className="cursor-pointer">Xarita</Link>
        </div>
        <div className="flex flex-col gap-[45px] mt-[45px]">
          {addresses_list.map((address, index) => (
            <div className="flex flex-col gap-[25px]">
              <div className="flex flex-row gap-[15px]">
                <img
                  src={arrive_icon}
                  className="w-[29px] h-[35px] object-contain"
                />
                <h1 className="font-inter max-w-[300px] font-[600] text-[16px] leading-[22px] text-black">
                  {address.name}
                </h1>
              </div>
              <div className="hover:scale-[102%] transition-all active:scale-[98%] duration-200 cursor-pointer bg-[#FFDF02] w-[169px] h-[40px] rounded-[8px] font-inter font-[500] text-[15px] leading-[22px] text-black flex items-center justify-center">
                Shu yerdan olaman
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Addresses;