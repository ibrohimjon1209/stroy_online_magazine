import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
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
import Formalization from "./Pages/Formalization/formalization_main";
import Category_mobile from "./Pages/Category/Category_mobile";
import Register from "./Pages/Auth/register/register_main";
import Log_in from "./Pages/Auth/log_in/log_in_main";
import Enter_language from "./Pages/Enter/Language";
import Enter_borrow from "./Pages/Enter/Borrow";
import Enter_category from "./Pages/Enter/Category";
import Enter_region from "./Pages/Enter/Region";
import User_offer from "./Pages/User_offer/User_offer";
const Product = lazy(() => import("./Pages/Product/Product"));
const Category = lazy(() => import("./Pages/Category/Category"));

const App = () => {
  const navigate = useNavigate();
  const [userSignIn, setUserSignIn] = useState(false);
  const [lang, set_lang] = useState("uz");
  const [city, set_city] = useState("andijan city");
  const [basket, set_basket] = useState(() => {
    const saved = localStorage.getItem("basket");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    setUserSignIn(localStorage.getItem("userId") ? true : false);
    !localStorage.getItem("lang") && localStorage.setItem("lang", "uz");
    !localStorage.getItem("city") &&
      localStorage.setItem("city", "andijan city");
    !localStorage.getItem("is_entered") &&
      localStorage.setItem("is_entered", "false");
    const basketFromStorage = JSON.parse(localStorage.getItem("basket")) || [];
    set_lang(localStorage.getItem("lang") || "uz");
    set_city(localStorage.getItem("city") || "andijan city");
    set_basket(basketFromStorage || []);
    if (localStorage.getItem("is_entered") == "false") {
      navigate("/enter/language");
    }
  }, []);

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
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    if ((location == "login" || location == "register") && userSignIn) {
      navigate("/");
    }
    if (localStorage.getItem("refreshToken"))
      if (location == "login" || location == "register") navigate("/");

    if (location == "") set_is_found(true);
    if (
      location == "delivery" ||
      (location == "terms" && formalization_open) ||
      location == "payment-variant" ||
      location == "login" ||
      location == "register"
    ) {
      if (
        location === "delivery" ||
        location === "terms" ||
        location === "payment-variant" ||
        location == "login" ||
        location == "register"
      ) {
        set_is_another_nav(true);
      } else {
        set_is_another_nav(false);
      }
    }
    if (location == "formalization" || location == "terms") {
    } else {
      set_is_another_nav(false);
    }
  }, [location]);

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
    return <InternetChecker lang={lang} />;
  } else {
    return (
      <div className={`${is_found ? "sm:w-[1450px]" : "w-full "} m-auto `}>
        {is_found && !is_another_nav && <Navbar lang={lang} />}
        <div
          className={`${
            is_found ? "sm:w-[1450px]" : "w-full"
          } m-auto overflow-hidden`}
        >
          <div
            className={`flex flex-col justify-between ${
              is_found
                ? "h-[calc(106.9vh-100px)] sm:h-[calc(119.5vh-100px)]"
                : "h-full"
            } w-[100%]`}
            style={{
              ...customScrollbar,
              overflowY: "auto",
              scrollbarWidth: "none",
              scrollbarColor: "rgba(244,244,244,1) rgba(255, 255, 255, 1)",
            }}
          >
            <div>
              <Routes>
                <Route path="/" element={<Home lang={lang} />} />
                <Route path="/likes" element={<Likes lang={lang} />} />
                <Route
                  path="/basket"
                  element={
                    <Basket
                      set_basket={set_basket}
                      basket={basket}
                      set_formalization_open={set_formalization_open}
                      lang={lang}
                    />
                  }
                />
                <Route path="/orders" element={<Orders lang={lang} />} />
                <Route
                  path="/enter/language"
                  element={
                    localStorage.getItem("is_entered") == "true" ? (
                      <Navigate to="/" />
                    ) : (
                      <Enter_language
                        lang={lang}
                        set_lang={set_lang}
                        set_is_found={set_is_found}
                      />
                    )
                  }
                />
                <Route
                  path="/enter/region"
                  element={
                    localStorage.getItem("is_entered") == "true" ? (
                      <Navigate to="/" />
                    ) : (
                      <Enter_region lang={lang} set_is_found={set_is_found} />
                    )
                  }
                />
                <Route
                  path="/enter/borrow"
                  element={
                    localStorage.getItem("is_entered") == "true" ? (
                      <Navigate to="/" />
                    ) : (
                      <Enter_borrow
                        lang={lang}
                        set_city={set_city}
                        city={city}
                        set_is_found={set_is_found}
                      />
                    )
                  }
                />
                <Route
                  path="/enter/category"
                  element={
                    localStorage.getItem("is_entered") == "true" ? (
                      <Navigate to="/" />
                    ) : (
                      <Enter_category set_is_found={set_is_found} />
                    )
                  }
                />
                <Route path="/search" element={<Category_mobile />} />
                <Route
                  path="/profile/*"
                  element={
                    <Profile
                      isUserSignIn={userSignIn}
                      set_is_found={set_is_found}
                      setUserSignIn={setUserSignIn}
                      lang={lang}
                      set_lang={set_lang}
                      city={city}
                      set_city={set_city}
                    />
                  }
                />
                <Route
                  path="/product/*"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <Product
                        set_basket={set_basket}
                        basket={basket}
                        lang={lang}
                      />
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
                        setUserSignIn={setUserSignIn}
                      />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/terms"
                  element={formalization_open ? <Terms /> : <Navigate to="/" />}
                />
                <Route
                  path="*"
                  element={
                    <Not_found lang={lang} set_is_found={set_is_found} />
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Register
                      lang={lang}
                      set_is_found={set_is_found}
                      setUserSignIn={setUserSignIn}
                    />
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Log_in
                      lang={lang}
                      set_is_found={set_is_found}
                      setUserSignIn={setUserSignIn}
                    />
                  }
                />

                <Route path="/user_offer" element={<User_offer />} />
              </Routes>
            </div>

            {is_found && is_footer_visible && <Footer lang={lang} />}
          </div>
        </div>
      </div>
    );
  }
};

export default App;
