import Sidebar from "./sidebar";
import {
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Orders from "./chields/orders/orders_main";
import Cashback from "./chields/cashback/cashback_main";
import Favorites from "./chields/favorites/favorites";
import City from "./chields/city/city_main";
import Language from "./chields/language/language_main";
import Help from "./chields/help/help_main";
import { ChevronLeft } from "lucide-react";

const Profile_main = ({ isUserSignIn, setUserSignIn, set_is_found }) => {
  set_is_found(true)
  const location = useLocation().pathname;
  return (
    <div className="mb-10 gap-[20px] sm:gap-0 sm:my-[20px] flex flex-col items-center justify-center w-full">
      <div className="sticky top-0 z-50 block sm:hidden w-full">
        <div className="w-full h-[65px] bg-[#DCC38B]">
          <Link
            className="w-full h-full flex items-center gap-[10px] pl-[13px]"
            to={`${location !== "/profile" ? "/profile" : "/"}`}
          >
            <ChevronLeft className="scale-110" />
            <h1 className="font-inter font-[500] text-[17px] leading-[22px] text-black">
              {location == "/profile" && "Profil"}
              {location == "/profile/" && "Profil"}
              {location == "/profile/cashback" && "Kashback"}
              {location == "/profile/favorites" && "Sevimlilar"}
              {location == "/profile/city" && "Shahar tanlash"}
              {location == "/profile/language" && "Til tanlash"}
            </h1>
          </Link>
        </div>
      </div>
      <div className="flex profile_md:w-[93%] w-[90%] mx-auto">
        <Sidebar isUserSignIn={isUserSignIn} setUserSignIn={setUserSignIn} />
        <div className="flex-1 ml-[20px] border border-[#D5D5D5] rounded-[8px] hidden sm:flex pt-[50px]">
          <Routes>
            <Route path="*" element={<Orders />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cashback" element={<Cashback />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/city" element={<City />} />
            <Route path="/language" element={<Language />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile_main;
