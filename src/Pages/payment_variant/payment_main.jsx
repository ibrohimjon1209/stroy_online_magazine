import { Check, ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import alif from "./imgs/alif.png";
import solfy from "./imgs/solfy.png";
import anor from "./imgs/anor.png";
import uzum from "./imgs/uzum.png";

const Payment_main = ({ set_is_payment_variant, is_payment_variant}) => {
  const [active_tab, set_active_tab] = useState(1);
  const [active_tab2, set_active_tab2] = useState(1);
  return (
    <div className={`w-full h-full ${is_payment_variant ? "flex" : "hidden"} flex-col mb-[80px] overflow-x-hidden`}>
      <div className="sm:sticky w-full h-[65px] sm:h-[80px] fixed top-0 z-50">
        <div className="bg-[#DCC38B] flex items-center gap-[10px] w-full h-full font-inter font-[600] text-[17px] sm:text-[20px] leading-[22px] text-black flex items-center pl-[13px] sm:pl-[50px]">
          <div onClick={() => set_is_payment_variant(false)}>
            <ChevronLeft className="scale-110 sm:scale-100 mt-0 sm:w-[35px] sm:h-[35px] sm:mt-[2px] cursor-pointer" />
          </div>
          <p>To’lov variantlari</p>
        </div>
      </div>
      <div className="flex flex-col w-[90%] mx-auto h-full mt-[85px] sm:mt-[35px]">
        <h1 className="font-inter font-[500] text-[17px] sm:text-[24px] leading-[22px] text-black">
          To’lov muddati
        </h1>
        <div className="flex flex-row gap-[10px] sm:gap-[15px] mt-[20px] sm:mt-[30px]">
          <div
            onClick={() => set_active_tab(1)}
            className={`${
              active_tab == 1
                ? "border-[1.5px] border-[#DCC38B]"
                : "border-[1.5px] border-[#D5D5D5]"
            } hover:scale-[101%] active:scale-[99%] duration-200 rounded-[5px] cursor-pointer px-[20px] sm:h-[40px] h-[35px] py-[4px] sm:px-[38px] sm:py-[7px]`}
          >
            Hammasi
          </div>
          <div
            onClick={() => set_active_tab(2)}
            className={`${
              active_tab == 2
                ? "border-[1.5px] border-[#DCC38B]"
                : "border-[1.5px] border-[#D5D5D5]"
            } hover:scale-[101%] active:scale-[99%] duration-200 rounded-[5px] cursor-pointer px-[20px] sm:h-[40px] h-[35px] py-[4px] sm:px-[38px] sm:py-[7px]`}
          >
            12oy
          </div>
          <div
            onClick={() => set_active_tab(3)}
            className={`${
              active_tab == 3
                ? "border-[1.5px] border-[#DCC38B]"
                : "border-[1.5px] border-[#D5D5D5]"
            } hover:scale-[101%] active:scale-[99%] duration-200 rounded-[5px] cursor-pointer px-[20px] sm:h-[40px] h-[35px] py-[4px] sm:px-[38px] sm:py-[7px]`}
          >
            24oy
          </div>
        </div>
        <div className="flex flex-col gap-[3px] sm:gap-[40px] mt-[25px]">
          <div
            className="flex items-center justify-between p-2 relative cursor-pointer"
            onClick={() => set_active_tab2(1)}
          >
            <div className="flex items-center gap-[15px] sm:gap-[37px]">
              <img
                src={alif}
                className="w-[40px] h-[41px] sm:w-[63px] sm:h-[63px] object-contain rounded-[5px]"
                alt="alif"
              />
              <span className="font-inter font-[600] text-[14px] sm:text-[24px] leading-[22px] text-[#000000BF]">
                Alif
              </span>
            </div>
            <h2 className="font-inter font-[600] text-[14px] sm:text-[24px] leading-[22px] text-[#000000BF] whitespace-nowrap absolute ml-[calc(50%-20px)] sm:ml-[55%]">
              119.250 so’m x 12oy
            </h2>
            <div
              className={`w-[22px] h-[22px] sm:w-[38px] sm:h-[38px] rounded-full flex items-center justify-center border-2 sm:border-[3.5px] border-[#BEA086] cursor-pointer duration-300 ${
                active_tab2 == 1 ? "bg-[#BEA086]" : ""
              }`}
            >
              {active_tab2 == 1 && (
                <Check className="text-white mt-[1.7px] sm:mt-0 w-[14px] h-[14px] sm:w-6 sm:h-6" strokeWidth={3} />
              )}
            </div>
          </div>
          <div
            className="flex items-center justify-between p-2 relative cursor-pointer"
            onClick={() => set_active_tab2(2)}
          >
            <div className="flex items-center gap-[15px] sm:gap-[37px]">
              <img
                src={solfy}
                className="w-[40px] h-[41px] sm:w-[63px] sm:h-[63px] object-contain rounded-[5px]"
                alt="solfy"
              />
              <span className="font-inter font-[600] text-[14px] sm:text-[24px] leading-[22px] text-[#000000BF]">
                Solfy
              </span>
            </div>
            <h2 className="font-inter font-[600] text-[14px] sm:text-[24px] leading-[22px] text-[#000000BF] whitespace-nowrap absolute ml-[calc(50%-20px)] sm:ml-[55%]">
              119.250 so’m x 12oy
            </h2>
            <div
              className={`w-[22px] h-[22px] sm:w-[38px] sm:h-[38px] rounded-full flex items-center justify-center border-2 sm:border-[3.5px] border-[#BEA086] cursor-pointer duration-300 ${
                active_tab2 == 2 ? "bg-[#BEA086]" : ""
              }`}
            >
              {active_tab2 == 2 && (
                <Check className="text-white mt-[1.7px] sm:mt-0 w-[14px] h-[14px] sm:w-6 sm:h-6" strokeWidth={3} />
              )}
            </div>
          </div>
          <div
            className="flex items-center justify-between p-2 relative cursor-pointer"
            onClick={() => set_active_tab2(3)}
          >
            <div className="flex items-center gap-[15px] sm:gap-[37px]">
              <img
                src={anor}
                className="w-[40px] h-[41px] sm:w-[63px] sm:h-[63px] object-contain rounded-[5px]"
                alt="anor"
              />
              <span className="font-inter font-[600] text-[14px] sm:text-[24px] leading-[22px] text-[#000000BF]">
                Anor
              </span>
            </div>
            <h2 className="font-inter font-[600] text-[14px] sm:text-[24px] leading-[22px] text-[#000000BF] whitespace-nowrap absolute ml-[calc(50%-20px)] sm:ml-[55%]">
              119.250 so’m x 12oy
            </h2>
            <div
              className={`w-[22px] h-[22px] sm:w-[38px] sm:h-[38px] rounded-full flex items-center justify-center border-2 sm:border-[3.5px] border-[#BEA086] cursor-pointer duration-300 ${
                active_tab2 == 3 ? "bg-[#BEA086]" : ""
              }`}
            >
              {active_tab2 == 3 && (
                <Check className="text-white mt-[1.7px] sm:mt-0 w-[14px] h-[14px] sm:w-6 sm:h-6" strokeWidth={3} />
              )}
            </div>
          </div>
          <div
            className="flex items-center justify-between p-2 relative cursor-pointer"
            onClick={() => set_active_tab2(4)}
          >
            <div className="flex items-center gap-[15px] sm:gap-[37px]">
              <img
                src={uzum}
                className="w-[40px] h-[41px] sm:w-[63px] sm:h-[63px] object-contain rounded-[5px]"
                alt="uzum"
              />
              <span className="font-inter font-[600] text-[14px] sm:text-[24px] leading-[22px] text-[#000000BF]">
                Uzum
              </span>
            </div>
            <h2 className="font-inter font-[600] text-[14px] sm:text-[24px] leading-[22px] text-[#000000BF] whitespace-nowrap absolute ml-[calc(50%-20px)] sm:ml-[55%]">
              119.250 so’m x 12oy
            </h2>
            <div
              className={`w-[22px] h-[22px] sm:w-[38px] sm:h-[38px] rounded-full flex items-center justify-center border-2 sm:border-[3.5px] border-[#BEA086] cursor-pointer duration-300 ${
                active_tab2 == 4 ? "bg-[#BEA086]" : ""
              }`}
            >
              {active_tab2 == 4 && (
                <Check className="text-white mt-[1.7px] sm:mt-0 w-[14px] h-[14px] sm:w-6 sm:h-6" strokeWidth={3} />
              )}
            </div>
          </div>
        </div>
        <div className="font-inter font-[700] text-[20px] sm:text-[36px] leading-[22px] flex items-center justify-between text-[#000000BF] mt-[calc(33vh-100px)] sm:mt-[100px]">
          <h1>Jami:</h1>
          <h2>1.431.000 so’m</h2>
        </div>
        <div className="mt-[calc(20vh-100px)] sm:mt-[70px] flex items-center justify-center font-inter font-[600] text-[16px] sm:text-[20px] leading-[22px] rounded-[10px] w-[92%] sm:w-[583px] h-[60px] sm:h-[78px] bg-[#DCC38B] mx-auto cursor-pointer hover:scale-[101%] active:scale-[99%] duration-300 text-black">
        Xaridni rasmiylashtirish
        </div>
      </div>
    </div>
  );
};

export default Payment_main;
