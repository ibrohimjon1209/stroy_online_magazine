import React, { useEffect, useState } from "react";
import { update_user } from "../../../../Services/auth/user_update";

const Edit_profile = ({ isOpen, onClose, name, surname }) => {
  const [user_data, set_user_data] = useState({ name: "", surname: "" });

  useEffect(() => {
    set_user_data({ name: name || "", surname: surname || "" });
  }, [isOpen, name, surname]); // Faqat dependencies o'zgarganda ishlaydi

  if (!isOpen) return null; // Hooklar chaqirilgandan keyin return bo‘lishi kerak

  return (
    <div className="fixed w-full -mt-2 inset-0 z-[9999] -mt-2 flex items-center justify-center bg-white">
      <div className="space-y-[40px] w-[86%] sm:w-[358px]">
        {/* Ism */}
        <div className="space-y-4 flex flex-col">
          <label className="font-inter font-[500] text-[22px] leading-[22px] text-black">
            Ism
          </label>
          <input
            type="text"
            maxLength={15}
            value={user_data.name}
            onChange={(e) => set_user_data({ ...user_data, name: e.target.value })}
            className="w-full h-[58px] px-4 flex items-center border-[#D5D5D5] border-2 rounded text-[20px]"
          />
        </div>

        {/* Familiya */}
        <div className="space-y-4 flex flex-col">
          <label className="font-inter font-[500] text-[22px] leading-[22px] text-black">
            Familiya
          </label>
          <input
            type="text"
            maxLength={15}
            value={user_data.surname}
            onChange={(e) => set_user_data({ ...user_data, surname: e.target.value })}
            className="w-full h-[58px] px-4 flex items-center border-[#D5D5D5] border-2 rounded text-[20px]"
          />
        </div>

        {/* Saqlash tugmasi */}
        <button
          className="w-full h-[58px] sm:h-[60px] font-inter font-[500] text-[20px] sm:text-[20px] leading-[22px] text-black cursor-pointer bg-[#FFDF02] rounded-[5px]"
          onClick={()=>{
            update_user(user_data.name, user_data.surname, localStorage.getItem("userId"), localStorage.getItem("accessToken"));
            onClose();
          }}
        >
          O'zgarishlarni saqlash
        </button>
      </div>
    </div>
  );
};

export default Edit_profile;
