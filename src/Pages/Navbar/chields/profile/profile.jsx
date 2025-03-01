import Sidebar from "./sidebar";
import { Route, Routes } from "react-router-dom";
import Orders from "./chields/orders/orders_main";
import Cashback from "./chields/cashback/cashback_main";
import Favorites from "./chields/favorites/favorites";
import City from "./chields/city/city_main";
import Language from "./chields/language/language_main";
import Help from "./chields/help/help_main";

const Profile_main = ({isUserSignIn}) => {
  return (
      <div className="flex my-10 w-[93%] mx-auto">
        <Sidebar isUserSignIn={isUserSignIn} />
        <div className="flex-1 ml-[20px] border border-[#D5D5D5] rounded-[8px] flex pt-[50px]">
          <Routes>
            <Route path="/orders" element={<Orders />} />
            <Route path="/cashback" element={<Cashback />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/city" element={<City />} />
            <Route path="/language" element={<Language />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
  );
};

export default Profile_main;
