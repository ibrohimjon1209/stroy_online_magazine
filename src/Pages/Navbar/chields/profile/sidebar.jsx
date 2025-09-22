import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import { useMediaQuery } from "react-responsive";
import Cashback from "./chields/cashback/cashback_main";
import Favorites from "./chields/favorites/favorites";
import City from "./chields/city/city_main";
import Language from "./chields/language/language_main";
import Help_modal from "./help_modal";
import { get_user } from "../../../../Services/auth/get_user";

const Sidebar = ({ city, set_city, lang, set_lang, isUserSignIn, setUserSignIn, set_user_s, edit_profile_open, set_edit_profile_open, set_is_logout_open }) => {
  const [user, set_user] = useState({
    name: "...",
    surname: "...",
    phone: "...",
  });
  const location = useLocation();
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });
  const [help_modal_open, set_help_modal_open] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user_data = await get_user(
          localStorage.getItem("userId"),
          localStorage.getItem("accessToken"),
          setUserSignIn
        );

        if (!user_data) {
          return;
        }

        set_user({
          name: user_data.first_name
            ? user_data.first_name
            : lang == "uz" ? "Foydalanuvchi" : lang == "en" ? "User" : lang == "ru" ? "Пользователь" : "Foydalanuvchi",
          surname: user_data.last_name
            ? user_data.last_name
            : "",
          phone: user_data.phone_number || (lang == "uz" ? "Nomalum" : lang == "en" ? "Undefined" : lang == "ru" ? "Не определено" : "Nomalum"),
        });
        console.log(user_data);

      } catch (err) {
        console.error(err);
      }

    };

    if (isUserSignIn) {
      fetchUserData();
    }
  }, [isUserSignIn, edit_profile_open]);

  useEffect(() => {
    set_user_s(user);
  }, [user]);

  return (
    <div
      className={`sm:mx-0 h-auto mx-auto w-[100%] ${help_modal_open ? "z-[10000] overflow-y-hidden" : ""
        } sm:w-[350px]`}
    >
      <Routes>
        <Route
          path="*"
          element={
            <div className="sticky top-0 w-[100%] sm:w-[350px] overflow-y-hidden">
              <div>
                {isUserSignIn ? (
                  <div className="flex h-[70px] sm:h-[80px] items-center w-full gap-3 border-[#D5D5D5] border rounded-[8px] pl-[13px] sm:pl-[20px] pr-[30px] py-[12px]">
                    <div className="p-2 bg-gray-200 rounded-full">
                      <User className="text-gray-600 h-7 w-7" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-inter font-[600] text-[15px] leading-[22px] text-black whitespace-nowrap">
                        {user.name} {user.surname}
                      </span>
                      <span className="flex flex-row items-center justify-center gap-6">
                        <span className="font-inter font-[500] text-[13px] leading-[22px] text-black whitespace-nowrap">
                          {user.phone}
                        </span>
                        <span onClick={() => set_edit_profile_open(true)} className="font-inter font-[400] text-[14px] leading-[22px] text-blue-800 hover:underline cursor-pointer whitespace-nowrap">Tahrirlash</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <Link to="/login">
                    {setUserSignIn(false)}
                    <div className="flex justify-center bg-[#FFDF02] h-[70px] items-center w-full gap-3 border-[#D5D5D5] border rounded-[8px] pl-[20px] pr-[30px] py-[12px] hover:scale-[101%] active:scale-[99%] duration-300">
                      <p className="font-inter font-[600] text-[24px] leading-[22px] text-black">
                        {lang == "uz" ? "Kirish" : lang == "en" ? "Login" : lang == "ru" ? "Входить" : "Kirish"}
                      </p>
                    </div>
                  </Link>
                )}
              </div>

              <div className="flex flex-col mt-[15px] sm:mt-[20px] border-[#D5D5D5] border rounded-[8px]">
                <NavItem
                  href={isSmallScreen ? "/orders" : "/profile/orders"}
                  isActive={location.pathname === "/profile/orders"}
                  icon={<ShoppingBag />}
                  label={lang == "uz" ? "Buyurtmalar" : lang == "en" ? "Orders" : lang == "ru" ? "Заказы" : "Buyurtmalar"}
                />
                <NavItem
                  href="/profile/cashback"
                  isActive={location.pathname === "/profile/cashback"}
                  icon={<SquarePercent />}
                  label={lang == "uz" ? "Keshbek" : lang == "en" ? "Cashback" : lang == "ru" ? "Кэшбэк" : "Keshbek"}
                />
                <NavItem
                  href="/profile/favorites"
                  isActive={location.pathname === "/profile/favorites"}
                  icon={<Heart />}
                  label={lang == "uz" ? "Sevimlilar" : lang == "en" ? "Favorites" : lang == "ru" ? "Избранное" : "Sevimlilar"}
                />
              </div>

              <div className="flex flex-col mt-[15px] sm:mt-[20px] border-[#D5D5D5] border rounded-[8px]">
                <NavItem
                  href="/profile/city"
                  isActive={location.pathname === "/profile/city"}
                  icon={<MapPin />}
                  label={lang == "uz" ? "Shahar tanlash" : lang == "en" ? "City selection" : lang == "ru" ? "Выбор города" : "Shahar tanlash"}
                />
                <NavItem
                  href="/profile/language"
                  isActive={location.pathname === "/profile/language"}
                  icon={<Globe />}
                  label={lang == "uz" ? "Til tanlash" : lang == "en" ? "Language selection" : lang == "ru" ? "Выбор языка" : "Til tanlash"}
                />
              </div>

              <div className="flex flex-col mt-[15px] sm:mt-[20px] border-[#D5D5D5] border rounded-[8px]">
                <NavItem
                  onClick={() => isSmallScreen ? set_help_modal_open(true) : null}
                  href={`${isSmallScreen ? "/profile" : "/profile/help"}`}
                  isActive={isSmallScreen ? false : location.pathname === "/profile/help"}
                  icon={<HelpCircle />}
                  label={lang == "uz" ? "Qo'llab-quvvatlash" : lang == "en" ? "Support" : lang == "ru" ? "Поддержка" : "Qo'llab-quvvatlash"}
                />
                <div className={`px-4 py-5 ${isUserSignIn ? "" : "hidden"}`}>
                  <button onClick={() => set_is_logout_open(true)} className="flex items-center font-inter font-[500] text-[13px] leading-[22px] text-red-500 hover:text-red-700 duration-300 cursor-pointer">
                    <LogOut className="w-5 h-5 mr-3" />
                    {lang == "uz" ? "Chiqish" : lang == "en" ? "Logout" : lang == "ru" ? "Выход" : "Chiqish"}
                  </button>
                </div>
              </div>
              <Help_modal
                lang={lang}
                isOpen={help_modal_open}
                onClose={() => set_help_modal_open(false)}
              />
            </div>
          }
        />
        {isSmallScreen && (
          <>
            <Route path="/cashback" element={<Cashback lang={lang} />} />
            <Route path="/favorites" element={<Favorites lang={lang} />} />
            <Route path="/city" element={<City lang={lang} city={city} set_city={set_city} />} />
            <Route path="/language" element={<Language lang={lang} set_lang={set_lang} />} />
          </>
        )}
      </Routes>
    </div>
  );
};

function NavItem({ href, icon, label, isActive, onClick }) {
  const activeColor = isActive ? "#c09f5d" : "#000000";


  return (
    <Link
      to={href}
      onClick={onClick ? onClick : null}
      className="font-inter font-[500] text-[14px] leading-[22px] flex items-center justify-between px-4 py-3.5 sm:py-4 rounded-[8px] transition duration-100 hover:bg-gray-100"
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
      <ChevronRight className="w-4 h-4 duration-300" color={activeColor} />
    </Link>
  );
}

export default Sidebar;
