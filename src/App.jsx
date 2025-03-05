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
import Footer from "./Pages/Footer/Footer";
import Terms from "./Pages/Terms/terms_main";
<<<<<<< HEAD
import Pickup_address from "./Pages/pickup_address/pickup_address_main";
=======
import Payment_variant from "./Pages/payment_variant/payment_main";
import Category from "./Pages/Category/Category";
>>>>>>> c631dd0e9a87eeb171d5c0fe41cca4c84322e029

const App = () => {
  const [userSignIn, setUserSignIn] = useState(true);
  const [is_found, set_is_found] = useState(true);
  const [is_another_nav, set_is_another_nav] = useState(false);
  const [is_online, set_is_online] = useState(navigator.onLine);
  const [is_footer_visible, set_is_footer_visible] = useState(true);
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
<<<<<<< HEAD
    if (
      location == "delivery" ||
      location == "terms" ||
      location == "payment-variant"
    ) {
=======
    if (location === "delivery" || location === "terms" || location === "payment-variant") {
>>>>>>> c631dd0e9a87eeb171d5c0fe41cca4c84322e029
      set_is_another_nav(true);
    } else {
      set_is_another_nav(false);
    }
  }, [location]);

  if (!is_online) {
    return <InternetChecker />;
  }

  // Agar ekran kengligi 640px (sm breakpoint) dan kichik bo'lsa, body stillari qo'llanilmasin
  useEffect(() => {
    const applyStyles = () => {
      if (window.innerWidth >= 640) {
        document.body.style.transform = "scale(0.85)";
        document.body.style.transformOrigin = "top left";
        document.body.style.width = "117.33%";
        document.body.style.overflow = "";
        document.body.style.height = "100vh";
      } else {
        document.body.style.transform = "";
        document.body.style.transformOrigin = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.height = "";
      }
    };

    applyStyles();
    window.addEventListener("resize", applyStyles);
    return () => window.removeEventListener("resize", applyStyles);
  }, []);

  return (
<<<<<<< HEAD
    <div
      className={`${is_found ? "w-[1000px] sm:w-[1440px]" : "w-full"} m-auto`}
    >
=======
    <div className={`${is_found ? "w-[375px] sm:w-[1440px]" : "w-full"} m-auto`}>
>>>>>>> c631dd0e9a87eeb171d5c0fe41cca4c84322e029
      {is_found && !is_another_nav && <Navbar userSignIn={userSignIn} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/orders" element={<Orders />} />
<<<<<<< HEAD
        <Route path="/profile/*" element={<Profile userSignIn={userSignIn} />} />
=======
        <Route
          path="/profile/*"
          element={<Profile userSignIn={userSignIn} />}
        />
>>>>>>> 48fcb8b5a393d65c4abcfde51c6223c87f25da9f
        <Route path="*" element={<Not_found set_is_found={set_is_found} />} />
<<<<<<< HEAD
        <Route
          path="/formalization"
          element={
            <Formalization
              userSignIn={userSignIn}
              setSelectedLocation={setSelectedLocation}
              set_is_another_nav={set_is_another_nav}
              is_another_nav={is_another_nav}
              set_is_footer_visible={set_is_footer_visible}
            />
          }
        />
        <Route path="/terms" element={<Terms />} />
        {/* <Route path="/pickup-address" element={<Pickup_address set_is_footer_visible={set_is_footer_visible} set_is_another_nav={set_is_another_nav} is_another_nav={is_another_nav} />} /> */}
=======
        <Route path="/formalization" element={<Formalization userSignIn={userSignIn} />} />
        <Route path="/delivery/*" element={<Delivery setSelectedLocation={setSelectedLocation} />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/payment-variant" element={<Payment_variant />} />
        <Route path="/category" element={<Category />} />
>>>>>>> c631dd0e9a87eeb171d5c0fe41cca4c84322e029
      </Routes>
      {is_found && is_footer_visible && <Footer />}
    </div>
  );
};

export default App;
