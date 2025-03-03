import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./Pages/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Likes from "./Pages/Navbar/chields/likes/likes_main";
import Basket from "./Pages/Navbar/chields/basket/basket_main";
import Orders from "./Pages/Navbar/chields/orders/orders_main";
import Profile from "./Pages/Navbar/chields/profile/profile";
import Not_found from "./Pages/Not_found/not_found";
import InternetChecker from "./Pages/offline_page/offline_page";
import Formalization from "./Pages/Formalization/formalization_main";
import Delivery from "./Pages/Map/map_main";
import Footer from "./Pages/Footer/Footer";
import Terms from "./Pages/Terms/terms_main";
import Payment_variant from "./Pages/payment_variant/payment_main";

const App = () => {
  const [userSignIn, setUserSignIn] = useState(true);
  const [is_found, set_is_found] = useState(true);
  const [is_another_nav, set_is_another_nav] = useState(false);
  const [is_online, set_is_online] = useState(navigator.onLine);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const location = useLocation().pathname.split("/")[1];

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
  useEffect(() => {
    if (location == "delivery" || location == "terms" || location == "payment-variant") {
      set_is_another_nav(true);
    } else {
      set_is_another_nav(false);
    }
  }, [location]);

  if (!is_online) {
    return <InternetChecker />;
  }

  return (
    <div
      className={`${is_found ? "w-[375px] sm:w-[1440px]" : "w-full"} m-auto`}
    >
      {is_found && !is_another_nav && <Navbar userSignIn={userSignIn} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/orders" element={<Orders />} />
        <Route
          path="/profile/*"
          element={<Profile userSignIn={userSignIn} />}
        />
        <Route path="*" element={<Not_found set_is_found={set_is_found} />} />
        <Route
          path="/formalization"
          element={<Formalization userSignIn={userSignIn} />}
        />
        <Route
          path="/delivery/*"
          element={<Delivery setSelectedLocation={setSelectedLocation} />}
        />
        <Route path="/terms" element={<Terms />} />
        <Route path="/payment-variant" element={<Payment_variant />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
