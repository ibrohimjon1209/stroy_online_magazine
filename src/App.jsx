import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate
} from "react-router-dom";
import jwtDecode from "jwt-decode";
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
const Product = lazy(() => import("./Pages/Product/Product"));
const Category = lazy(() => import("./Pages/Category/Category"));

const App = () => {
  const navigate = useNavigate();
  const [userSignIn, setUserSignIn] = useState(false);
  const [phone_number, set_phone_number] = useState("");
  const [is_online, set_is_online] = useState(navigator.onLine);
  const [is_found, set_is_found] = useState(true);
  const [is_another_nav, set_is_another_nav] = useState(false);
  const [is_footer_visible, set_is_footer_visible] = useState(true);
  const [formalization_open, set_formalization_open] = useState(false);
  const location = useLocation().pathname.split("/")[1];

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("refresh");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000; // Hozirgi vaqt (sekundlarda)
          if (decodedToken.exp > currentTime) {
            setUserSignIn(true);
            set_phone_number(localStorage.getItem("phoneNumber"));
          } else {
            // Token muddati tugagan, login sahifasiga yo'naltirish
            localStorage.removeItem("refresh");
            localStorage.removeItem("phoneNumber");
            setUserSignIn(false);
            navigate("/login");
          }
        } catch (error) {
          console.error("Token noto‘g‘ri:", error);
          localStorage.removeItem("refresh");
          localStorage.removeItem("phoneNumber");
          setUserSignIn(false);
          navigate("/login");
        }
      } else {
        setUserSignIn(false);
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

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
    <div className={`${is_found ? "w-[] sm:w-[1450px]" : "w-full "} m-auto `}>
      {is_found && !is_another_nav && <Navbar userSignIn={userSignIn} />}
      <div className={`${is_found ? "w-[] sm:w-[1450px]" : "w-full"} m-auto overflow-hidden`}>
        <div className="flex flex-col justify-between h-full w-[100%]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/likes" element={<Likes />} />
            <Route path="/basket" element={<Basket set_formalization_open={set_formalization_open} />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/search" element={<Category_mobile />} />
            <Route path="/profile/*" element={<Profile userSignIn={userSignIn} />} />
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
              element={formalization_open ? <Formalization /> : <Navigate to="/" />}
            />
            <Route
              path="/terms"
              element={formalization_open ? <Terms /> : <Navigate to="/" />}
            />
            <Route path="*" element={<Not_found set_is_found={set_is_found} />} />
            <Route path="/register" element={<Register set_is_found={set_is_found} />} />
            <Route path="/login" element={<Log_in set_is_found={set_is_found} />} />
          </Routes>
          {is_found && is_footer_visible && <Footer />}
        </div>
      </div>
    </div>
  );
};

export default App;
