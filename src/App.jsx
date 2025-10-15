import { lazy, Suspense, useState, useEffect } from "react";
import {
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
import get_favorites from "./Services/favorites/get_favorites";
import create_favorites from "./Services/favorites/create_favorites";
import Installment from "./Pages/Installment/installment";
import Payment_success from "./components/payment_success";
import LogOutModal from "./components/log_out_modal";
import Form_modal from "./components/formalization_modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = lazy(() => import("./Pages/Product/Product"));
const Category = lazy(() => import("./Pages/Category/Category"));

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  const [userSignIn, setUserSignIn] = useState(false);
  const [lang, set_lang] = useState("uz");
  const [city, set_city] = useState(() => {
    try {
      const storedCity = localStorage.getItem("region");
      return storedCity ? JSON.parse(storedCity) : null;
    } catch (error) {
      console.error("Failed to parse city from localStorage:", error);
      return null;
    }
  });
  const [is_SI, set_is_SI] = useState(false);
  const [is_PM, set_is_PM] = useState("false");
  const [is_formalization_open, set_is_formalization_open] = useState(false);
  const [form_modal_method, set_form_modal_method] = useState(null);
  const sl_option_id =
    localStorage.getItem("sl_option_nav") === "Stroy Baza №1"
      ? 0
      : localStorage.getItem("sl_option_nav") === "Giaz Mebel"
      ? 1
      : 2;
  const [basket, set_basket] = useState(() => {
    const saved = localStorage.getItem("basket");
    return saved ? JSON.parse(saved) : [];
  });
  const [pay_id, set_pay_id] = useState(null);
  const [server_response, set_server_response] = useState(null);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  useEffect(() => {
    setUserSignIn(localStorage.getItem("userId") ? true : false);
    !localStorage.getItem("lang") && localStorage.setItem("lang", "uz");
    !localStorage.getItem("region") && localStorage.setItem("region", null);
    !localStorage.getItem("is_entered") &&
      localStorage.setItem("is_entered", "false");
    const basketFromStorage = JSON.parse(localStorage.getItem("basket")) || [];
    set_lang(localStorage.getItem("lang") || "uz");
    set_city(localStorage.getItem("region") || null);
    set_basket(basketFromStorage || []);
    set_is_SI(localStorage.getItem("is_SI") || false);
    if (localStorage.getItem("is_entered") == "false") {
      navigate("/enter/language");
    }
  }, []);

  useEffect(() => {
    if (userSignIn) {
      const get_f = async () => {
        try {
          JSON.parse(localStorage.getItem("likedProducts"))?.map(
            async (item) => {
              await create_favorites(
                item.product,
                localStorage.getItem("userId")
              );
            }
          );
          const get_f = await get_favorites();
          localStorage.setItem("likedProducts", JSON.stringify(get_f));
        } catch (err) {
          console.error("Error:", err);
        }
      };
      if (userSignIn) {
        get_f();
      }
    }
  }, [userSignIn]);

  useEffect(() => {
    localStorage.setItem("is_PM", is_PM);
  }, [is_PM]);

  useEffect(() => {
    if (pay_id) {
      const interval = setInterval(async () => {
        try {
          const response = await fetch(
            `https://backkk.stroybazan1.uz/pay/api/goldhouse/status/${pay_id}`
          );
          const data = await response.json();
          console.log("Status:", data);

          if (data && data.success) {
            clearInterval(interval);
            set_pay_id(0);
          }
        } catch (err) {}
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [pay_id]);

  const [is_found, set_is_found] = useState(true);
  const [is_another_nav, set_is_another_nav] = useState(false);
  const [is_online, set_is_online] = useState(navigator.onLine);
  const [is_footer_visible, set_is_footer_visible] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formalization_open, set_formalization_open] = useState(false);
  const [is_logout_open, set_is_logout_open] = useState(false);
  const [searchText, setSearchText] = useState("");

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
    const currentLocation = location.pathname.split("/")[1];

    if (
      (currentLocation == "login" || currentLocation == "register") &&
      userSignIn
    ) {
      navigate("/");
    }

    if (currentLocation == "") set_is_found(true);
    if (currentLocation == "installment") set_is_another_nav(true);
    if (
      currentLocation == "delivery" ||
      currentLocation == "terms" ||
      currentLocation == "payment-variant" ||
      currentLocation == "login" ||
      currentLocation == "register" ||
      currentLocation == "installment" ||
      currentLocation == "terms"
    ) {
      set_is_another_nav(true);
    } else {
      set_is_another_nav(false);
    }
  }, [location, userSignIn, is_SI]);

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

  function PaymentSuccess({ set_is_PM }) {
    const navigate = useNavigate();

    useEffect(() => {
      const paymentToken = localStorage.getItem("payment_token");
      const onlinePayment = localStorage.getItem("online_payment");

      if (onlinePayment === "true" && paymentToken) {
        set_is_PM("true");
        localStorage.removeItem("payment_token");
        localStorage.removeItem("online_payment");
      }

      navigate("/", { replace: true });
    }, [set_is_PM, navigate]);

    return null;
  }

  const transitionStyles = {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: isTransitioning ? 0.7 : 1,
    transform: isTransitioning ? "translateY(10px)" : "translateY(0px)",
  };
  const visibleProducts = basket.filter(
    (item) => item.branch_id == sl_option_id
  );

  const notify = (message, type = "info") => {
    switch (type) {
      case "success":
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      case "warning":
        toast.warn(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      case "error":
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      default:
        toast.info(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
    }
  };

  if (!is_online) {
    return (
      <>
        <InternetChecker lang={lang} />
      </>
    );
  } else {
    return (
      <>
        <div className={`${is_found ? "sm:w-[1450px]" : "w-full "} m-auto `}>
          {is_found && !is_another_nav && (
            <Navbar
              lang={lang}
              searchText={searchText}
              setSearchText={setSearchText}
            />
          )}
          <div
            className={`${
              is_found ? "sm:w-[1450px]" : "w-full"
            } m-auto overflow-hidden`}
          >
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            <div
              className={`flex flex-col justify-between ${
                is_found
                  ? is_another_nav
                    ? "h-[calc(106.9vh-100px)] sm:h-[calc(118vh)]"
                    : "h-[calc(106.9vh-100px)] sm:h-[calc(119.5vh-100px)]"
                  : "h-full"
              } w-[100%]`}
              style={{
                ...customScrollbar,
                overflowY: "scroll",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.5) rgba(255, 255, 255, 1)",
                paddingRight: "0px"
              }}
            >
              <div style={transitionStyles}>
                <Routes location={displayLocation}>
                  <Route
                    path="/"
                    element={
                      <Home
                        lang={lang}
                        setSearchText={setSearchText}
                        searchText={searchText}
                      />
                    }
                  />
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
                        set_is_logout_open={set_is_logout_open}
                      />
                    }
                  />
                  <Route
                    path="/payment/success"
                    element={<PaymentSuccess set_is_PM={set_is_PM} />}
                  />
                  <Route
                    path="/product/*"
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <Product
                          set_basket={set_basket}
                          basket={basket}
                          lang={lang}
                          userSignIn={userSignIn}
                          notify={notify}
                        />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/category/*"
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <Category searchText={searchText} />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/formalization"
                    element={
                      formalization_open && basket.length ? (
                        <Formalization
                          basket={visibleProducts}
                          lang={lang}
                          userSignIn={userSignIn}
                          setSelectedLocation={setSelectedLocation}
                          set_is_another_nav={set_is_another_nav}
                          is_another_nav={is_another_nav}
                          set_is_footer_visible={set_is_footer_visible}
                          set_formalization_open={set_formalization_open}
                          setUserSignIn={setUserSignIn}
                          set_is_SI={set_is_SI}
                          set_basket={set_basket}
                          set_modal_method={set_form_modal_method}
                          set_is_modal_open={set_is_formalization_open}
                          notify={notify}
                        />
                      ) : (
                        <Navigate to="/" />
                      )
                    }
                  />
                  <Route
                    path="/installment"
                    element={is_SI ? <Installment set_is_another_nav={set_is_another_nav}/> : <Navigate to="/" />}
                  />
                  <Route
                    path="/terms"
                    element={
                      formalization_open && basket.length ? (
                        <Terms
                          lang={lang}
                          set_is_another_nav={set_is_another_nav}
                        />
                      ) : (
                        <Navigate to="/" />
                      )
                    }
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
                </Routes>
              </div>
              {is_found && is_footer_visible && <Footer lang={lang} />}
            </div>
          </div>
          <Payment_success
            lang={lang}
            is_modal_open={is_PM}
            set_is_modal_open={set_is_PM}
          />
          <Form_modal
            lang={lang}
            is_modal_open={is_formalization_open}
            set_is_modal_open={set_is_formalization_open}
            method={form_modal_method}
          />
          <LogOutModal
            isOpen={is_logout_open}
            onClose={() => set_is_logout_open(false)}
            setUserSignIn={setUserSignIn}
          />
        </div>
      </>
    );
  }
};

export default App;