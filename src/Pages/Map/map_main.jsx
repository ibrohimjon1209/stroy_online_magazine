import React, { useEffect, useState } from "react";
import Addresses from "./addresses";
import Map from "./map";
import { ChevronLeft } from "lucide-react";
import get_locations from "../../Services/locations/get_locations";

const Delivery_main = ({
  setSelectedLocation,
  set_is_delivery,
  is_delivery,
  set_address_inform,
}) => {
  const [active, set_active] = useState("address");
  const lang = localStorage.getItem("lang");
  const [addresses_list, set_addresses_list] = useState([]);
  useEffect(() => {
    const fetch_locations = async () => {
      try {
        const locations = await get_locations();
        set_addresses_list(locations);
      } catch (error) {
        console.log(error);
      }
    };
    fetch_locations();
  }, []);
  return (
    <div
      className={`w-full h-full ${
        is_delivery ? "flex" : "hidden"
      } flex-col mb-[84px]`}
    >
      <div className=" flex justify-center w-full h-[65px] sm:h-[80px] top-0 z-50">
        <div className="bg-[#DCC38B] flex items-center gap-[10px] w-[1450px] rounded-[15px] mt-[5px] h-full font-inter font-[600] text-[17px] sm:text-[20px] leading-[22px] text-black pl-[13px] sm:pl-[50px]">
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
              ? "Take-away address"
              : lang == "ru"
              ? "Адрес получения"
              : "Olib ketish manzili"}
          </p>
        </div>
      </div>
      <div>
        <Addresses
          set_active={set_active}
          active={active}
          addresses_list={addresses_list}
          set_address_inform={set_address_inform}
          set_is_delivery={set_is_delivery}
        />
        <Map
          setSelectedLocation={setSelectedLocation}
          addresses_list={addresses_list}
          set_active={set_active}
          set_is_delivery={set_is_delivery}
          active={active}
          set_address_inform={set_address_inform}
        />
      </div>
    </div>
  );
};

export default Delivery_main;
