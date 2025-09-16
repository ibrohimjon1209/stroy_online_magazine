import React from "react";
import arrive_icon from "./imgs/arrive_icon.png";
import { Link } from "react-router-dom";

const Addresses = ({
  active,
  set_active,
  addresses_list,
  set_address_inform,
  set_is_delivery,
}) => {
  const lang = localStorage.getItem("lang") || "uz";

  const t = {
    list: { uz: "Ro’yxat", ru: "Список", en: "List" },
    map: { uz: "Xarita", ru: "Карта", en: "Map" },
    take: {
      uz: "Shu yerdan olaman",
      ru: "Выбрать это место",
      en: "Select this place",
    },
  };

  // is_main: true bo'lgan itemlarni ro'yxat boshiga olib kelish
  const sortedAddresses = [...addresses_list].sort((a, b) => {
    return b.is_main - a.is_main;
  });

  return (
    <div
      className={`w-[90%] mx-auto h-full ${
        active === "address" ? "flex" : "hidden"
      } flex-col mt-[30px] sm:mt-[35px]`}
    >
      <div className="sm:w-[85%] mx-auto h-[32px] flex flex-row font-inter font-[600] text-[16px] leading-[22px] text-black gap-[65px]">
        <div className="border-[#DCC38B] border-b-2 pb-[10px] cursor-pointer">
          {t.list[lang]}
        </div>
        <div onClick={() => set_active("map")} className="cursor-pointer">
          {t.map[lang]}
        </div>
      </div>

      <div className="flex flex-col gap-[45px] mt-[40px] sm:mt-[45px]">
        {sortedAddresses.map((address, index) => (
          <div key={index} className="flex flex-col gap-[25px]">
            <div className="flex flex-row gap-[15px]">
              <img
                src={arrive_icon}
                className="w-[29px] h-[35px] object-contain"
              />
              <h1 className="font-inter max-w-[300px] font-[600] text-[16px] leading-[22px] text-black">
                {lang === "ru"
                  ? address.address_ru
                  : lang === "en"
                  ? address.address_en
                  : address.address_uz}
              </h1>
            </div>

            <div
              onClick={() => {
                set_address_inform(address);
                let addresses =
                  JSON.parse(localStorage.getItem("deliver_address")) || [];
                if (addresses.some((a) => a.id === address.id)) {
                } else {
                  addresses.filter((a) => a.branch_id !== address.branch_id);
                  localStorage.setItem(
                    "deliver_address",
                    JSON.stringify([...addresses, address])
                  );
                }
                set_is_delivery(false);
              }}
              className="hover:scale-[102%] transition-all active:scale-[98%] duration-200 cursor-pointer bg-[#FFDF02] w-[169px] h-[40px] rounded-[8px] font-inter font-[500] text-[15px] leading-[22px] text-black flex items-center justify-center"
            >
              {t.take[lang]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
