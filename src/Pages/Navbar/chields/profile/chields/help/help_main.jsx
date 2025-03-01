import React, { useState } from "react";
import { Phone } from "lucide-react";

const Help_main = () => {
  const contacts = Array(16).fill("+998 90 762 92 82");
  return (
    <div className="w-[90%] flex flex-col gap-3 mx-auto">
      {contacts.map((contact, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4"
        >
          <div className="flex flex-col gap-[10px]">
            <p className="font-inter font-[600] text-[24px] leading-[22px] text-black">{contact}</p>
            <p className="font-inter font-[400] text-[16px] leading-[22px] text-black">Savolingiz bormi? Qo‘ng‘iroq qiling</p>
          </div>
          <Phone className="h-[35px] w-[35px]"/>
        </div>
      ))}
    </div>
  );
};

export default Help_main;
