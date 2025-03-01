import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Likes from "./Pages/Navbar/chields/likes/likes_main";
import Basket from "./Pages/Navbar/chields/basket/basket_main";
import Orders from "./Pages/Navbar/chields/orders/orders_main";
import Profile from "./Pages/Navbar/chields/profile/profile";
import Not_found from "./Pages/Not_found/not_found";
import InternetChecker from "./Pages/offline_page/offline_page";
import Formalization from "./Pages/Formalization/formalization_main";
import MapPage from "./Pages/Map/map_main";

const App = () => {
  const [userSignIn, setUserSignIn] = useState(false);
  const [is_found, set_is_found] = useState(true);
  const [is_online, set_is_online] = useState(navigator.onLine);
  const [selectedLocation, setSelectedLocation] = useState(null); // 📌 Tanlangan joy

  useEffect(() => {
    const updateOnlineStatus = () => {
      set_is_online(navigator.onLine);
    };
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  if (!is_online) {
    return <InternetChecker />;
  }

  return (
    <Router>
      <div className={`${is_found ? "w-[375px] sm:w-[1440px]" : "w-full"} m-auto`}>
        {is_found && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile/*" element={<Profile userSignIn={userSignIn} />} />
          <Route path="*" element={<Not_found set_is_found={set_is_found} />} />
          <Route path="/formalization" element={<Formalization userSignIn={userSignIn} />} />
          <Route path="/map" element={<MapPage setSelectedLocation={setSelectedLocation} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
