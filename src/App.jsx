import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./Pages/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Likes from "./Pages/Navbar/chields/likes/likes_main";
import Basket from "./Pages/Navbar/chields/basket/basket_main";
import Orders from "./Pages/Navbar/chields/orders/orders_main";
import Profile from "./Pages/Navbar/chields/profile/profile";
import Not_found from "./Pages/Not_found/not_found";
import InternetChecker from "./Pages/offline_page/offline_page";
import Footer from "./Pages/Footer/Footer";
import Terms from "./Pages/Terms/terms_main";
import Pickup_address from "./Pages/pickup_address/pickup_address_main";
import Payment_variant from "./Pages/payment_variant/payment_main";
import Formalization from "./Pages/Formalization/formalization_main";
import Category_mobile from "./Pages/Category/Category_mobile";
const Product = lazy(() => import("./Pages/Product/Product"));
const Category = lazy(() => import("./Pages/Category/Category"));

const App = () => {
  const [userSignIn, setUserSignIn] = useState(true);
  const [is_found, set_is_found] = useState(true);
  const [is_another_nav, set_is_another_nav] = useState(false);
  const [is_online, set_is_online] = useState(navigator.onLine);
  const [is_footer_visible, set_is_footer_visible] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formalization_open, set_formalization_open] = useState(false);
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
    if (
      location == "delivery" ||
      (location == "terms" && formalization_open) ||
      location == "payment-variant"
    ) {
      if (
        location === "delivery" ||
        location === "terms" ||
        location === "payment-variant"
      ) {
        set_is_another_nav(true);
      } else {
        set_is_another_nav(false);
      }
    }
    if (location == "formalization" || location == "terms") {
    }
    else {
      set_is_another_nav(false);
    }
    [location];
  });


  const customScrollbar = {
    overflowY: "auto",
    scrollbarWidth: "auto",
    scrollbarColor: "rgba(255,255,255,1) rgba(255,255,255,1)",
  };

  useEffect(() => {
    if (window.innerWidth > 768) {
      document.body.style.transform = "scale(0.85)";
      document.body.style.transformOrigin = "top left";
      document.body.style.width = "117.33%";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.transform = "";
      document.body.style.transformOrigin = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
  }, []);
  if (!is_online) {
    return <InternetChecker />;
  }
  else {
  return (
    <div className={`${is_found ? "w-[] sm:w-[1450px]" : "w-full "} m-auto `}>
      {is_found && !is_another_nav && <Navbar userSignIn={userSignIn} />}
      <div className={`${is_found ? "w-[] sm:w-[1450px]" : "w-full"} m-auto`}>
        <div
          className={`flex flex-col justify-between ${is_found ? "h-[calc(100vh)] sm:h-[calc(130vh-200px)]" : "h-full"} w-[100%]`}
          style={{
            ...customScrollbar,
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(244,244,244,1) rgba(255, 255, 255, 1)"
          }}
        >
          <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/likes" element={<Likes />} />
            <Route
              path="/basket"
              element={
                <Basket set_formalization_open={set_formalization_open} />
              }
            />
            <Route path="/orders" element={<Orders />} />
            <Route path="/search" element={<Category_mobile />} />
            <Route
              path="/profile/*"
              element={<Profile userSignIn={userSignIn} />}
            />
            <Route
              path="/product/*"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Product />
                </Suspense>
              }
            />
            <Route
              path="/category"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Category />
                </Suspense>
              }
            />
            <Route
              path="/formalization"
              element={
                formalization_open ? (
                  <Formalization
                    userSignIn={userSignIn}
                    setSelectedLocation={setSelectedLocation}
                    set_is_another_nav={set_is_another_nav}
                    is_another_nav={is_another_nav}
                    set_is_footer_visible={set_is_footer_visible}
                    set_formalization_open={set_formalization_open}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/terms"
              element={
                formalization_open ? (
                  <Terms />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="*" element={<Not_found set_is_found={set_is_found}/>}/>
          </Routes>
          </div>

          {is_found && is_footer_visible && <Footer />}
        </div>
      </div>
    </div>
  );
}
};

export default App;
