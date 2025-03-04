import React, { useState } from "react";
import Addresses from "./addresses";
import Map from "./map";
import { ChevronLeft } from "lucide-react";

const Delivery_main = ({setSelectedLocation, set_is_delivery, is_delivery}) => {
  const [active, set_active] = useState("address");
  return (
    <div className={`w-full h-full ${is_delivery ? "flex" : "hidden"} flex-col mb-[84px]`}>
      <div className="sticky w-full h-[80px] fixed top-0 z-50">
        <div className="bg-[#DCC38B] flex items-center gap-[10px] w-full h-full font-inter font-[600] text-[20px] leading-[22px] text-black flex items-center pl-[50px]">
          <div onClick={()=>active === "map" ? set_active("address") : set_is_delivery(false)} >
            <ChevronLeft className="w-[35px] h-[35px] mt-[2px] cursor-pointer" />
          </div>
          <p>Olib ketish manzili</p>
        </div>
      </div>
      <div>
          <Addresses set_active={set_active} active={active} />
          <Map setSelectedLocation={setSelectedLocation} set_active={set_active} active={active}/>
      </div>
    </div>
  );
};

export default Delivery_main;
