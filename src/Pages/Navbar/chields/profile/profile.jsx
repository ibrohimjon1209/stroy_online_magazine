import Sidebar from "./sidebar";
import { Link, useLocation, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import LogOutModal from "./log_out_modal";
import Edit_profile from "./edit_profile";
import Cashback from "./chields/cashback/cashback_main";  // Cashback komponenti

const Profile_main = ({ isUserSignIn, setUserSignIn, set_is_found, lang, set_lang, city, set_city }) => {
  set_is_found(true);

  const [is_logout_open, set_is_logout_open] = useState(false);
  const [edit_profile_open, set_edit_profile_open] = useState(false);
  const [user, set_user] = useState({});

  const location = useLocation().pathname;
  const titles = {
    "/profile": { uz: "Profil", en: "Profile", ru: "Профиль" },
    "/profile/": { uz: "Profil", en: "Profile", ru: "Профиль" },
    "/profile/cashback": { uz: "Keshbek", en: "Cashback", ru: "Кешбек" },
    "/profile/favorites": { uz: "Sevimlilar", en: "Favorites", ru: "Избранные" },
    "/profile/city": { uz: "Shahar tanlash", en: "City selection", ru: "Выбор города" },
    "/profile/language": { uz: "Til tanlash", en: "Language selection", ru: "Выбор языка" }
  };
  
  const title_sl = titles[location]?.[lang] || "Profil";

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`https://back.stroybazan1.uz/api/api/users/${userId}/`)
        .then((response) => response.json())
        .then((data) => {
          set_user(data);  // Foydalanuvchining ma'lumotlarini olish
        });
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full mb-17 sm:mb-0">
      <div className="mb-10 gap-[20px] sm:gap-0 sm:my-[20px] flex flex-col items-center justify-center w-full">
        <div className="sticky top-0 z-50 block w-full sm:hidden">
          <div className="w-full h-[65px] bg-[#DCC38B]">
            <Link className="w-full h-full flex items-center gap-[10px] pl-[13px]" to={`${location !== "/profile" ? "/profile" : "/"}`}>
              <ChevronLeft className="scale-110" />
              <h1 className="font-inter font-[500] text-[17px] leading-[22px] text-black">{title_sl}</h1>
            </Link>
          </div>
        </div>
        <div className="flex profile_md:w-[93%] w-[90%] mx-auto">
          <Sidebar city={city} set_city={set_city} lang={lang} set_lang={set_lang} isUserSignIn={isUserSignIn} setUserSignIn={setUserSignIn} set_user_s={set_user} user_s={user} edit_profile_open={edit_profile_open} set_edit_profile_open={set_edit_profile_open} set_is_logout_open={set_is_logout_open} />
          <div className="flex-1 ml-[20px] border border-[#D5D5D5] rounded-[8px] hidden sm:flex pt-[50px]">
            <Routes>
              <Route path="*" element={<Cashback lang={lang} />} />
              <Route path="/cashback" element={<Cashback lang={lang} />} />
            </Routes>
          </div>
        </div>
      </div>
      <LogOutModal isOpen={is_logout_open} onClose={() => set_is_logout_open(false)} setUserSignIn={setUserSignIn} />
      <Edit_profile isOpen={edit_profile_open} onClose={() => set_edit_profile_open(false)} name={user.name} surname={user.surname} />
    </div>
  );
};

export default Profile_main;
