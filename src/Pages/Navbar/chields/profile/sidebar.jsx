import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  LogOut,
  MapPin,
  Globe,
  User,
  ShoppingBag,
  SquarePercent,
  Heart,
  HelpCircle,
} from "lucide-react";

const Sidebar = ({ isUserSignIn }) => {
  const [user] = useState({
    name: "Nuraliyev Muhammad Sodiq",
    phone: "+998 90 702 92 82",
  });
  const location = useLocation();

  return (
    <div className="h-auto sm:mx-0 mx-auto w-[100%] sm:w-[350px]">
      <div className="sticky top-0 w-[100%] sm:w-[350px]">
        <div>
          {!isUserSignIn ? (
            <div className="flex h-[100px] items-center w-full gap-3 border-[#D5D5D5] border rounded-[8px] pl-[13px] sm:pl-[20px] pr-[30px] py-[12px]">
              <div className="bg-gray-200 rounded-full p-2">
                <User className="h-7 w-7 text-gray-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-[600] text-[18px] sm:text-[15px] leading-[30px] sm:leading-[22px] text-black whitespace-nowrap">
                  {user.name}
                </span>
                <span className="font-inter font-[500] text-[16px] sm:text-[13px] leading-[30px] sm:leading-[22px] text-black whitespace-nowrap">
                  {user.phone}
                </span>
              </div>
            </div>
          ) : (
            <Link to="/enter">
              <div className="flex justify-center bg-[#FFDF02] h-[70px] items-center w-full gap-3 border-[#D5D5D5] border rounded-[8px] pl-[20px] pr-[30px] py-[12px] hover:scale-[101%] active:scale-[99%] duration-300">
                <p className="font-inter font-[600] text-[24px] leading-[22px] text-black">
                  Kirish
                </p>
              </div>
            </Link>
          )}
        </div>

        <div className="flex flex-col mt-[20px] border-[#D5D5D5] border rounded-[8px]">
          <NavItem
            href="/profile/orders"
            isActive={location.pathname === "/profile/orders"}
            icon={<ShoppingBag />}
            label="Buyurtmalar"
          />
          <NavItem
            href="/profile/cashback"
            isActive={location.pathname === "/profile/cashback"}
            icon={<SquarePercent />}
            label="Keshbek"
          />
          <NavItem
            href="/profile/favorites"
            isActive={location.pathname === "/profile/favorites"}
            icon={<Heart />}
            label="Sevimlilar"
          />
        </div>

        <div className="flex flex-col mt-[20px] border-[#D5D5D5] border rounded-[8px]">
          <NavItem
            href="/profile/city"
            isActive={location.pathname === "/profile/city"}
            icon={<MapPin />}
            label="Shahar tanlash"
          />
          <NavItem
            href="/profile/language"
            isActive={location.pathname === "/profile/language"}
            icon={<Globe />}
            label="Til tanlash"
          />
        </div>

        <div className="flex flex-col mt-[20px] border-[#D5D5D5] border rounded-[8px]">
          <NavItem
            href="/profile/help"
            isActive={location.pathname === "/profile/help"}
            icon={<HelpCircle />}
            label="Qo'llab-quvvatlash"
          />
          <div className="px-4 py-5">
            <button className="flex items-center font-inter font-[500] text-[13px] leading-[22px] text-red-500 hover:text-red-700 duration-300 cursor-pointer">
              <LogOut className="h-5 w-5 mr-3" />
              Chiqish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function NavItem({ href, icon, label, isActive }) {
  const activeColor = isActive ? "#DCC38B" : "#000000";

  return (
    <Link
      to={href}
      className="font-inter font-[500] text-[13px] leading-[22px] flex items-center justify-between px-4 py-5 rounded-[8px] transition duration-100 hover:bg-gray-100"
    >
      <div className="flex items-center">
        <span className="mr-3">
          {React.cloneElement(icon, {
            className: "h-5 w-5 duration-300",
            color: activeColor,
          })}
        </span>
        <span
          className={`font-semibold duration-300`}
          style={{ color: activeColor }}
        >
          {label}
        </span>
      </div>
      <ChevronRight className="h-4 w-4 duration-300" color={activeColor} />
    </Link>
  );
}

export default Sidebar;
