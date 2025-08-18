import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { support_get } from "../../../../../../Services/general/support";

const Help_main = ({ lang }) => {
  const [support, set_support] = useState([]);
  const sl_option_id =
    localStorage.getItem("sl_option_nav") === "Stroy Baza №1"
      ? 0
      : localStorage.getItem("sl_option_nav") === "Giaz Mebel"
      ? 1
      : 2;
      
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await support_get();
        const filtered = res.filter((item) => {
          return item.branch == sl_option_id;
        });
        set_support(filtered.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {
      console.error("Cleanup function ishladi");
    };
  }, []);

  return (
    <div className="w-[90%] flex flex-col gap-3 mx-auto">
      {support
        ? support.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4"
            >
              <div className="flex flex-col gap-[10px]">
                <p className="font-inter font-[600] text-[24px] leading-[22px] text-black">
                  {item.phone_number}
                </p>
                <p className="font-inter font-[400] text-[16px] leading-[22px] text-black">
                  {item[`title_${lang}`]}
                </p>
              </div>
              <Phone className="h-[35px] w-[35px]" />
            </div>
          ))
        : ""}
    </div>
  );
};

export default Help_main;
