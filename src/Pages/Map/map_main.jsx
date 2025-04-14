import React, { useState } from "react";
import Addresses from "./addresses";
import Map from "./map";
import { ChevronLeft } from "lucide-react";

const Delivery_main = ({
  setSelectedLocation,
  set_is_delivery,
  is_delivery,
}) => {
  const [active, set_active] = useState("address");
  const lang = localStorage.getItem("lang");
  return (
    <div
      className={`w-full h-full ${
        is_delivery ? "flex" : "hidden"
      } flex-col mb-[84px]`}
    >
      <div className="w-full h-[65px] sm:h-[80px] fixed top-0 z-50">
        <div className="bg-[#DCC38B] flex items-center gap-[10px] w-full h-full font-inter font-[600] text-[17px] sm:text-[20px] leading-[22px] text-black pl-[13px] sm:pl-[50px]">
          <div
            onClick={() =>
              active === "map" ? set_active("address") : set_is_delivery(false)
            }
          >
            <ChevronLeft className="scale-110 sm:scale-100 sm:w-[35px] sm:h-[35px] mt-0 sm:mt-[2px] cursor-pointer" />
          </div>
          <p>
            {lang === "uz"
              ? "Olib ketish manzili"
              : lang == "en"
              ? "Delivery address"
              : lang == "ru"
              ? "Адрес доставки"
              : "Yetkazib berish manzili"}
          </p>
        </div>
      </div>
      <div>
        <Addresses set_active={set_active} active={active} />
        <Map
          setSelectedLocation={setSelectedLocation}
          set_active={set_active}
          active={active}
        />
      </div>
    </div>
  );
};

export default Delivery_main;
