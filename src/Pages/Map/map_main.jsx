import React from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Addresses from "./addresses";
import Map from "./map";
import { ChevronLeft } from "lucide-react";

const Delivery_main = () => {
  const location = useLocation().pathname.split("/")[2];
  return (
    <div className="w-full h-full flex flex-col mb-[84px]">
      <div className="sticky w-full h-[80px] fixed top-0 z-50">
        <div className="bg-[#DCC38B] flex items-center gap-[10px] w-full h-full font-inter font-[600] text-[20px] leading-[22px] text-black flex items-center pl-[50px]">
          <Link to={`${location === "map" ? "/delivery" : "/formalization"}`} >
            <ChevronLeft className="w-[35px] h-[35px] mt-[2px] cursor-pointer" />
          </Link>
          <p>Olib ketish manzili</p>
        </div>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Addresses />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </div>
  );
};

export default Delivery_main;
