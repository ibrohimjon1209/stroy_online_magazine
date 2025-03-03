import { Check, ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import alif from "./imgs/alif.png";
import solfy from "./imgs/solfy.png";
import anor from "./imgs/anor.png";
import uzum from "./imgs/uzum.png";

const Payment_main = () => {
  const [active_tab, set_active_tab] = useState(1);
  const [active_tab2, set_active_tab2] = useState(1);
  return (
    <div className="w-full h-full flex flex-col mb-[80px]">
      <div className="sticky w-full h-[80px] fixed top-0 z-50">
        <div className="bg-[#DCC38B] flex items-center gap-[10px] w-full h-full font-inter font-[600] text-[20px] leading-[22px] text-black flex items-center pl-[50px]">
          <Link to="/formalization">
            <ChevronLeft className="w-[35px] h-[35px] mt-[2px] cursor-pointer" />
          </Link>
          <p>To’lov variantlari</p>
        </div>
      </div>
      <div className="flex flex-col w-[90%] mx-auto h-full mt-[35px]">
        <h1 className="font-inter font-[500] text-[24px] leading-[22px] text-black">
          To’lov muddati
        </h1>
        <div className="flex flex-row gap-[15px] mt-[30px]">
          <div
            onClick={() => set_active_tab(1)}
            className={`${
              active_tab == 1
                ? "border-[1.5px] border-[#DCC38B]"
                : "border-[1.5px] border-[#D5D5D5]"
            } hover:scale-[101%] active:scale-[99%] duration-200 rounded-[5px] cursor-pointer px-[38px] py-[7px]`}
          >
            Hammasi
          </div>
          <div
            onClick={() => set_active_tab(2)}
            className={`${
              active_tab == 2
                ? "border-[1.5px] border-[#DCC38B]"
                : "border-[1.5px] border-[#D5D5D5]"
            } hover:scale-[101%] active:scale-[99%] duration-200 rounded-[5px] cursor-pointer px-[38px] py-[7px]`}
          >
            12oy
          </div>
          <div
            onClick={() => set_active_tab(3)}
            className={`${
              active_tab == 3
                ? "border-[1.5px] border-[#DCC38B]"
                : "border-[1.5px] border-[#D5D5D5]"
            } hover:scale-[101%] active:scale-[99%] duration-200 rounded-[5px] cursor-pointer px-[38px] py-[7px]`}
          >
            24oy
          </div>
        </div>
        <div className="flex flex-col gap-[40px] mt-[25px]">
          <div
            className="flex items-center justify-between p-2 cursor-pointer"
            onClick={() => set_active_tab2(1)}
          >
            <div className="flex items-center gap-[37px]">
              <img
                src={alif}
                className="w-[63px] h-[63px] object-contain rounded-[5px]"
                alt="alif"
              />
              <span className="font-inter font-[600] text-[24px] leading-[22px] text-[#000000BF]">
                Alif
              </span>
            </div>
            <h2 className="font-inter font-[600] text-[24px] leading-[22px] text-[#000000BF] ml-[55%]">
              119.250 so’m x 12oy
            </h2>
            <div
              className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border-[3.5px] border-[#BEA086] cursor-pointer duration-300 ${
                active_tab2 == 1 ? "bg-[#BEA086]" : ""
              }`}
            >
              {active_tab2 == 1 && (
                <Check className="text-white w-6 h-6" strokeWidth={3} />
              )}
            </div>
          </div>
          <div
            className="flex items-center justify-between p-2 cursor-pointer"
            onClick={() => set_active_tab2(2)}
          >
            <div className="flex items-center gap-[37px]">
              <img
                src={solfy}
                className="w-[63px] h-[63px] object-contain rounded-[5px]"
                alt="solfy"
              />
              <span className="font-inter font-[600] text-[24px] leading-[22px] text-[#000000BF]">
                Solfy
              </span>
            </div>
            <h2 className="font-inter font-[600] text-[24px] leading-[22px] text-[#000000BF] ml-[55%]">
              119.250 so’m x 12oy
            </h2>
            <div
              className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border-[3.5px] border-[#BEA086] cursor-pointer duration-300 ${
                active_tab2 == 2 ? "bg-[#BEA086]" : ""
              }`}
            >
              {active_tab2 == 2 && (
                <Check className="text-white w-6 h-6" strokeWidth={3} />
              )}
            </div>
          </div>
          <div
            className="flex items-center justify-between p-2 cursor-pointer"
            onClick={() => set_active_tab2(3)}
          >
            <div className="flex items-center gap-[37px]">
              <img
                src={anor}
                className="w-[63px] h-[63px] object-contain rounded-[5px]"
                alt="anor"
              />
              <span className="font-inter font-[600] text-[24px] leading-[22px] text-[#000000BF]">
                Anor
              </span>
            </div>
            <h2 className="font-inter font-[600] text-[24px] leading-[22px] text-[#000000BF] ml-[55%]">
              119.250 so’m x 12oy
            </h2>
            <div
              className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border-[3.5px] border-[#BEA086] cursor-pointer duration-300 ${
                active_tab2 == 3 ? "bg-[#BEA086]" : ""
              }`}
            >
              {active_tab2 == 3 && (
                <Check className="text-white w-6 h-6" strokeWidth={3} />
              )}
            </div>
          </div>
          <div
            className="flex items-center justify-between p-2 cursor-pointer"
            onClick={() => set_active_tab2(4)}
          >
            <div className="flex items-center gap-[37px]">
              <img
                src={uzum}
                className="w-[63px] h-[63px] object-contain rounded-[5px]"
                alt="uzum"
              />
              <span className="font-inter font-[600] text-[24px] leading-[22px] text-[#000000BF]">
                Uzum
              </span>
            </div>
            <h2 className="font-inter font-[600] text-[24px] leading-[22px] text-[#000000BF] ml-[55%]">
              119.250 so’m x 12oy
            </h2>
            <div
              className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border-[3.5px] border-[#BEA086] cursor-pointer duration-300 ${
                active_tab2 == 4 ? "bg-[#BEA086]" : ""
              }`}
            >
              {active_tab2 == 4 && (
                <Check className="text-white w-6 h-6" strokeWidth={3} />
              )}
            </div>
          </div>
        </div>
        <div className="font-inter font-[700] text-[36px] leading-[22px] flex items-center justify-between text-[#000000BF] mt-[100px]">
          <h1>Jami:</h1>
          <h2>1.431.000so’m</h2>
        </div>
        <div className="mt-[70px] flex items-center justify-center font-inter font-[600] text-[20px] leading-[22px] rounded-[10px] w-[583px] h-[78px] bg-[#DCC38B] mx-auto cursor-pointer hover:scale-[101%] active:scale-[99%] duration-300 text-black">
        Xaridni rasmiylashtirish
        </div>
      </div>
    </div>
  );
};

export default Payment_main;
