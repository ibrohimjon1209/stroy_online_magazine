"use client";

import { Check, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import arrive_icon from "./imgs/arrive_icon.png";
import cash_icon from "./imgs/cash_icon.png";
import payment_time from "./imgs/open.png";
import on_arrive from "./imgs/on_arrive.png";
import pay_me from "./imgs/pay_me.png";
import click from "./imgs/click.png";
import open_icon from "./imgs/open.png";
import Modal from "./modal";
import { useEffect, useState } from "react";
import Delivery from "../Map/map_main";
import Payment_variant from "../payment_variant/payment_main";
import Pickup_address from "../pickup_address/pickup_address_main";
import { get_user } from "../../Services/auth/get_user";
import axios from "axios";
import { order_create } from "../../Services/auth/create_order";

const Formalization_main = ({
  basket,
  lang,
  userSignIn,
  setSelectedLocation,
  set_is_another_nav,
  is_another_nav,
  set_is_footer_visible,
  set_formalization_open,
  setUserSignIn,
  set_is_SI,
  set_basket,
}) => {
  const [userData, setUserData] = useState({ name: "...", phone: "..." });
  const [deliver_type, set_deliver_type] = useState("pickup");
  const [selectedMethod, setSelectedMethod] = useState("click");
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [is_delivery, set_is_delivery] = useState(false);
  const [is_pickup, set_is_pickup] = useState(false);
  const [is_payment_variant, set_is_payment_variant] = useState(false);
  const [cashback_is_using, set_cashback_is_using] = useState(false);
  const [address_inform, set_address_inform] = useState(null);
  const [cashbackAmount, setCashbackAmount] = useState(0);
  const [isVibrating, setIsVibrating] = useState(false);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(3);
  const [notification, setNotification] = useState("");
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [modal_method, set_modal_method] = useState("cash");
  const paymentOptions = {
    uz: ["6 oy", "12 oy", "15 oy", "18 oy", "24 oy"],
    en: ["6 months", "12 months", "15 months", "18 months", "24 months"],
    ru: ["6 месяцев", "12 месяцев", "15 месяцев", "18 месяцев", "24 месяцев"],
  };
  const totalPrice = basket
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  let payable = totalPrice - cashbackAmount;

  if (payable <= 0) {
    payable = 0;
  }

  if (payable > 0 && payable < 1000) {
    payable = 1000;
  }

  const sl_option_id =
    localStorage.getItem("sl_option_nav") === "Stroy Baza №1"
      ? 0
      : localStorage.getItem("sl_option_nav") === "Giaz Mebel"
      ? 1
      : 2;

  set_is_another_nav(is_delivery || is_payment_variant || is_pickup);
  set_is_footer_visible(!is_pickup);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user_data = await get_user(
          localStorage.getItem("userId"),
          localStorage.getItem("accessToken"),
          setUserSignIn
        );
        if (!user_data) return;

        setUserData({
          name: user_data.first_name
            ? `${user_data.first_name} ${user_data.last_name}`
            : lang === "uz"
            ? "Foydalanuvchi"
            : lang === "en"
            ? "User"
            : lang === "ru"
            ? "Пользователь"
            : "Foydalanuvchi",
          phone: user_data.phone_number || "...",
        });

        setCashbackAmount(user_data.cashback_balance);
      } catch (err) {
        console.error("Fetch user error:", err);
      }
    };

    if (userSignIn) {
      fetchUserData();
    }
  }, [userSignIn, lang, setUserSignIn]);

  useEffect(() => {
    set_address_inform(null);
  }, [deliver_type]);

  const uzs_lang =
    lang === "uz"
      ? "so'm"
      : lang === "en"
      ? "uzs"
      : lang === "ru"
      ? "сум"
      : "so'm";

  const label_delivery =
    deliver_type === "pickup"
      ? lang === "uz"
        ? "Olib ketish manzilini tanlang"
        : lang === "en"
        ? "Select pickup location"
        : lang === "ru"
        ? "Выберите место самовывоза"
        : "Olib ketish manzilini tanlang"
      : lang === "uz"
      ? "Yetkazib berish manzilini tanlang"
      : lang === "en"
      ? "Select delivery address"
      : lang === "ru"
      ? "Выберите адрес доставки"
      : "Yetkazib berish manzilini tanlang";

  const handlePaymentClick = (index) => {
    setSelectedPaymentIndex(index);
  };

  const plans = [
    { months: 6, percent: 26 },
    { months: 12, percent: 42 },
    { months: 15, percent: 50 },
    { months: 18, percent: 56 },
    { months: 24, percent: 75 },
  ];

  const monthlyPayments = plans.map(({ months, percent }) => {
    const priceWithPercent = totalPrice + (totalPrice * percent) / 100;
    return Math.ceil(priceWithPercent / months);
  });

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await axios.post(
        "https://backkk.stroybazan1.uz/api/token/refresh/",
        {
          refresh: refreshToken,
        }
      );
      const newAccessToken = response.data.access;
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      setUserSignIn(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      setNotification(
        lang === "uz"
          ? "Sessiya tugadi, iltimos qayta kiring"
          : lang === "en"
          ? "Session expired, please log in again"
          : lang === "ru"
          ? "Сессия истекла, пожалуйста, войдите снова"
          : "Sessiya tugadi, iltimos qayta kiring"
      );
      setIsNotificationVisible(true);
      setTimeout(() => setIsNotificationVisible(false), 3000);
      return null;
    }
  };

  const processPayment = async (orderId) => {
    try {
      console.log("[v0] processPayment called with orderId:", orderId);
      console.log("[v0] selectedMethod:", selectedMethod);

      const paymentMethodMap = {
        click: "click",
        payme: "payme",
      };

      const paymentMethod = paymentMethodMap[selectedMethod];
      console.log("[v0] paymentMethod mapped to:", paymentMethod);

      if (!paymentMethod) {
        console.log(
          "[v0] No payment method found, skipping payment processing"
        );
        return; // Only process payment for payme and click
      }

      console.log("[v0] Making payment API call...");
      const response = await axios.put(
        `https://backkk.stroybazan1.uz/pay/api/orders/${orderId}/payment/`,
        {
          payment_method: paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("[v0] Payment API response:", response.data);

      if (response.data && response.data.payment_link) {
        const paymentToken = `payment_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        localStorage.setItem("online_payment", "true");
        localStorage.setItem("payment_token", paymentToken);

        console.log(
          "[v0] Redirecting to payment link:",
          response.data.payment_link
        );
        window.location.href = response.data.payment_link;
      } else {
        console.log("[v0] No payment_link found in response");
      }
    } catch (error) {
      console.error("[v0] Payment processing error:", error);
      console.error("[v0] Error response:", error.response?.data);
      setNotification(
        lang === "uz"
          ? "To'lov jarayonida xatolik yuz berdi"
          : lang === "en"
          ? "Error occurred during payment"
          : lang === "ru"
          ? "Ошибка при обработке платежа"
          : "To'lov jarayonida xatolik yuz berdi"
      );
      setIsNotificationVisible(true);
      setTimeout(() => setIsNotificationVisible(false), 3000);
    }
  };

  const handleOrderCreation = async () => {
    try {
      if (!userSignIn) {
        setNotification(
          lang === "uz"
            ? "Iltimos tizimdan ro'yxatdan o'ting"
            : lang === "en"
            ? "Please log in"
            : lang === "ru"
            ? "Пожалуйста, войдите в систему"
            : "Iltimos tizimdan ro'yxatdan o'ting"
        );
        setIsNotificationVisible(true);
        setTimeout(() => setIsNotificationVisible(false), 4000);
        return;
      }
      if (!address_inform) {
        setNotification(
          lang === "uz"
            ? "Iltimos yetkazib berish manzilini tanlang"
            : lang === "en"
            ? "Please select a delivery address"
            : lang === "ru"
            ? "Пожалуйста, выберите адрес доставки"
            : "Iltimos yetkazib berish manzilini tanlang"
        );
        setIsNotificationVisible(true);
        setTimeout(() => setIsNotificationVisible(false), 4000);
        return;
      }
      console.log("[v0] handleOrderCreation called");
      console.log("[v0] selectedMethod:", selectedMethod);

      console.log("[v0] Calling order_create...");
      const orderResult = await order_create(
        localStorage.getItem("accessToken"),
        {
          basket,
          address_inform,
          selectedMethod,
          cashback_is_using,
          sl_option_id,
          deliver_type,
        }
      );

      const orderId =
        orderResult?.id ||
        orderResult?.order_id ||
        orderResult?.orderId ||
        orderResult?.pk;

      if (
        orderId &&
        (selectedMethod === "payme" || selectedMethod === "click")
      ) {
        console.log("[v0] Order created successfully, processing payment...");
        await processPayment(orderId);
      } else {
        if (orderId) {
          const updatedProducts = basket.filter((item) => !item.selected);
          set_basket(updatedProducts);
          localStorage.setItem("basket", JSON.stringify(updatedProducts));

          set_modal_method(selectedMethod == "qabul" ? "cash" : selectedMethod);
          set_is_modal_open(true);
        }
        console.log(
          "[v0] Order creation failed or payment method is not payme/click"
        );
        console.log("[v0] orderId:", orderId);
        console.log("[v0] selectedMethod:", selectedMethod);
        console.log(
          "[v0] Payment methods check:",
          selectedMethod === "payme",
          selectedMethod === "click"
        );
      }
    } catch (error) {
      console.error("[v0] Order creation error:", error);
      setNotification(
        lang === "uz"
          ? "Buyurtma yaratishda xatolik"
          : lang === "en"
          ? "Error creating order"
          : lang === "ru"
          ? "Ошибка при создании заказа"
          : "Buyurtma yaratishda xatolik"
      );
      setIsNotificationVisible(true);
      setTimeout(() => setIsNotificationVisible(false), 3000);
    }
  };

  const handleInstallment = () => {
    set_is_SI(true);
    localStorage.setItem("is_SI", true);
  };

  return (
    <div className="flex flex-col w-full h-full mb-17 sm:mb-0">
      {isNotificationVisible && notification && (
        <div className="absolute z-50 top-15 left-1/2 transform border-[2px] border-red-500 bg-red-100 -translate-x-1/2 w-[90%] sm:w-[400px] scale-[130%] text-red-800 rounded-lg shadow-lg p-4 flex items-center justify-between">
          <span className="font-inter font-[500] text-[16px] text-black">
            {notification}
          </span>
          <button
            onClick={() => setIsNotificationVisible(false)}
            className="text-black"
          >
            ✕
          </button>
        </div>
      )}

      <div className="w-full fixed z-50 h-[65px] bg-[#DCC38B] sm:hidden block">
        <Link
          onClick={() => set_formalization_open(false)}
          className="w-full h-full flex items-center gap-[10px] pl-[13px]"
          to="/basket"
        >
          <ChevronLeft className="scale-110" />
          <h1 className="font-inter font-[500] text-[17px] leading-[22px] text-black">
            {lang === "uz"
              ? "Buyurtma"
              : lang === "en"
              ? "Order"
              : lang === "ru"
              ? "Заказ"
              : "Buyurtma"}
          </h1>
        </Link>
      </div>
      <div
        className={`w-full sm:w-[76%] sm:mt-0 mt-12 ${
          is_delivery || is_payment_variant || is_pickup ? "hidden" : "block"
        } mx-auto bg-white mb-[20px]`}
      >
        <div className="p-6 pt-[35px]">
          <h2 className="font-inter font-[600] text-[16px] leading-[22px] text-black">
            {lang === "uz"
              ? "Qabul qiluvchi"
              : lang === "en"
              ? "Receiver"
              : lang === "ru"
              ? "Получатель"
              : "Qabul qiluvchi"}
          </h2>
          {userSignIn ? (
            <div className="border border-[#D5D5D5] rounded-lg p-4 mt-[15px] sm:mt-[20px] mb-6 w-full sm:w-[40%] h-[70px] flex items-center justify-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-300 rounded-full">
                  <User className="h-[23px] w-[23px] text-gray-600" />
                </div>
                <div>
                  <p className="font-inter font-[600] text-[16px] leading-[22px] text-black">
                    {userData.name}
                  </p>
                  <p className="font-inter font-[500] text-[13px] leading-[22px] text-black">
                    {userData.phone}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <div className="border bg-[#FFDF02] border-[#D5D5D5] rounded-lg p-4 mt-[20px] mb-6 w-[40%] h-[70px] flex items-center justify-center hover:scale-[101%] active:scale-[99%] duration-300">
                <p className="font-inter font-[600] text-[24px] leading-[22px] text-black">
                  {lang === "uz"
                    ? "Kirish"
                    : lang === "en"
                    ? "Login"
                    : lang === "ru"
                    ? "Входить"
                    : "Kirish"}
                </p>
              </div>
            </Link>
          )}
          <div className="flex flex-col gap-8 mx-5 my-20">
            {basket.map(
              (item) =>
                item.selected && (
                  <div
                    key={item.id}
                    className="flex gap-[15px] sm:gap-[35px] mb-6 mt-[20px]"
                  >
                    <div className="bg-gray-100 rounded-lg w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] flex items-center justify-center">
                      <img
                        src={item.img || "/placeholder.svg"}
                        alt={item.name[lang]}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col gap-[10px] sm:gap-[50px] font-inter font-[600] text-[16px] sm:text-[24px] leading-[22px] text-black">
                      <div>
                        <h3>{item.name[lang]}</h3>
                        <p className="mt-[15px] sm:mt-[25px]">
                          {item.price}{" "}
                          {lang === "uz"
                            ? "so'm"
                            : lang === "en"
                            ? "uzs"
                            : lang === "ru"
                            ? "сум"
                            : "so'm"}
                        </p>
                      </div>
                      <p>
                        {item.quantity}{" "}
                        {lang === "uz"
                          ? "dona"
                          : lang === "en"
                          ? "piece"
                          : lang === "ru"
                          ? "шт"
                          : "dona"}
                      </p>
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="relative flex p-1 bg-gray-100 rounded-xl mt-[20px] sm:mt-[35px] mb-4 h-[40px] sm:h-[60px] w-full sm:w-[95%] mx-auto font-inter font-[500] text-[13px] sm:text-[18px] leading-[22px] text-black">
            <button
              onClick={() => set_deliver_type("pickup")}
              className={`flex-1 py-1 sm:py-2.5 text-center rounded-lg font-medium cursor-pointer ${
                deliver_type === "pickup"
                  ? "bg-white shadow-sm duration-500"
                  : "text-gray-500"
              }`}
            >
              {lang === "uz"
                ? "Olib ketish"
                : lang === "en"
                ? "Pickup"
                : lang === "ru"
                ? "Забрать"
                : "Olib ketish"}
            </button>
            <button
              onClick={() => set_deliver_type("delivery")}
              className={`flex-1 py-1 sm:py-2.5 text-center rounded-lg font-medium cursor-pointer ${
                deliver_type === "delivery"
                  ? "bg-white shadow-sm duration-500"
                  : "text-gray-500"
              }`}
            >
              {lang === "uz"
                ? "Yetkazib berish"
                : lang === "en"
                ? "Delivery"
                : lang === "ru"
                ? "Доставить"
                : "Yetkazib berish"}
            </button>
          </div>
          <div
            className={`border border-[#D5D5D5] rounded-lg mb-4 mt-[25px] sm:mt-[35px] w-[95%] mx-auto hover:scale-[1.008] active:scale-[1] duration-300 ${
              isVibrating ? "animate-[vibrate_0.3s_linear]" : ""
            }`}
          >
            <style jsx>{`
              @keyframes vibrate {
                0% {
                  transform: translateX(0);
                }
                20% {
                  transform: translateX(-2px);
                }
                40% {
                  transform: translateX(2px);
                }
                60% {
                  transform: translateX(-2px);
                }
                80% {
                  transform: translateX(2px);
                }
                100% {
                  transform: translateX(0);
                }
              }
            `}</style>
            <div
              onClick={() =>
                deliver_type === "pickup"
                  ? set_is_delivery(true)
                  : set_is_pickup(true)
              }
              className="flex items-center justify-between w-full p-2 cursor-pointer sm:p-4"
            >
              <div className="flex items-center w-full pr-[40px] gap-2 justify-between sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src={arrive_icon || "/placeholder.svg"}
                    alt="arrive"
                    className="h-[21px] w-[21px] sm:h-[25px] sm:w-[25px] object-contain"
                  />
                  <span className="text-[13px] sm:text-[18px] sm:font-medium">
                    {label_delivery}
                  </span>
                </div>
                <h1>
                  {address_inform
                    ? address_inform[`address_${lang}`]
                    : "Manzil tanlash"}
                </h1>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div
            onClick={() => {
              if (cashbackAmount < 1000) {
                setIsVibrating(true);
                setTimeout(() => setIsVibrating(false), 300);
              } else {
                set_cashback_is_using(!cashback_is_using);
              }
            }}
            className={`border overflow-hidden border-[#D5D5D5] rounded-lg mb-4 mt-[20px] sm:mt-[30px] w-[95%] mx-auto hover:scale-[1.008] active:scale-[1] duration-300 ${
              isVibrating ? "animate-[vibrate_0.3s_linear]" : ""
            }`}
          >
            <style jsx>{`
              @keyframes vibrate {
                0% {
                  transform: translateX(0);
                }
                20% {
                  transform: translateX(-2px);
                }
                40% {
                  transform: translateX(2px);
                }
                60% {
                  transform: translateX(-2px);
                }
                80% {
                  transform: translateX(2px);
                }
                100% {
                  transform: translateX(0);
                }
              }
            `}</style>
            <div className="flex items-center justify-between w-full p-2 cursor-pointer sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <img
                  src={cash_icon || "/placeholder.svg"}
                  alt="cash"
                  className="h-[21px] w-[21px] sm:h-[25px] sm:w-[25px] object-contain"
                />
                <span className="text-[13px] sm:text-[18px] sm:font-medium">
                  {lang === "uz"
                    ? "Keshbekni ishlatish"
                    : lang === "en"
                    ? "Use cashback"
                    : lang === "ru"
                    ? "Использовать кешбек"
                    : "Keshbekni ishlatish"}
                </span>
              </div>
              <div className="flex items-center gap-[13px]">
                <span
                  className={`${
                    cashback_is_using ? "translate-x-0" : "translate-x-11"
                  } text-[13px] duration-200 sm:text-[18px] sm:font-medium ${
                    cashbackAmount < 1000 ? "text-red-500 font-bold" : ""
                  }`}
                >
                  {cashbackAmount.toLocaleString()}{" "}
                  {lang === "uz"
                    ? "so'm"
                    : lang === "en"
                    ? "uzs"
                    : lang === "ru"
                    ? "сум"
                    : "so'm"}
                </span>
                <div
                  className={`${
                    cashback_is_using ? "translate-x-0" : "translate-x-11"
                  } p-1 duration-200 ${
                    cashbackAmount < 1000 ? "bg-white" : "bg-green-500"
                  } rounded-full`}
                >
                  <Check className="w-3 h-3 text-white sm:h-4 sm:w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[95%] mx-auto p-7 sm:p-4 -mt-[20px]">
          <h1 className="font-inter font-[600] text-[16px] leading-[22px] text-black mb-4">
            {lang === "uz"
              ? "To'lov usuli"
              : lang === "en"
              ? "Payment method"
              : lang === "ru"
              ? "Способ оплаты"
              : "To'lov usuli"}
          </h1>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-[#D5D5D5] w-full sm:w-[90%] rounded-lg p-4 bg-white">
              <div className="space-y-3.5 sm:space-y-4">
                <div
                  className="flex items-center justify-between p-2 cursor-pointer"
                  onClick={() => setSelectedMethod("click")}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={click || "/placeholder.svg"}
                      alt="Click"
                      className="object-contain w-7 h-7 sm:w-8 sm:h-8"
                    />
                    <span className="font-inter font-[600] text-[16px] leading-[22px] text-black">
                      Click
                    </span>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-[2px] border-[#BEA086] cursor-pointer duration-300 ${
                      selectedMethod === "click" ? "bg-[#BEA086]" : ""
                    }`}
                  >
                    {selectedMethod === "click" && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-2 cursor-pointer"
                  onClick={() => setSelectedMethod("payme")}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={pay_me || "/placeholder.svg"}
                      alt="Payme"
                      className="object-contain w-7 h-7 sm:w-8 sm:h-8"
                    />
                    <span className="font-inter font-[600] text-[16px] leading-[22px] text-black">
                      Pay me
                    </span>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-[2px] border-[#BEA086] cursor-pointer duration-300 ${
                      selectedMethod === "payme" ? "bg-[#BEA086]" : ""
                    }`}
                  >
                    {selectedMethod === "payme" && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-2 cursor-pointer"
                  onClick={() => setSelectedMethod("qabul")}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={on_arrive || "/placeholder.svg"}
                      alt="Qabul qilinganda"
                      className="object-contain w-7 h-7 sm:w-8 sm:h-8"
                    />
                    <span className="font-inter font-[600] text-[16px] leading-[22px] text-black">
                      {lang === "uz"
                        ? "Qabul qilinganda"
                        : lang === "en"
                        ? "On arrive"
                        : lang === "ru"
                        ? "При прибытии"
                        : "Qabul qilinganda"}
                    </span>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-[2px] border-[#BEA086] cursor-pointer duration-300 ${
                      selectedMethod === "qabul" ? "bg-[#BEA086]" : ""
                    }`}
                  >
                    {selectedMethod === "qabul" && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-2 rounded-md cursor-pointer"
                  onClick={() => setSelectedMethod("installment")}
                >
                  <div className="flex items-center gap-3 ">
                    <img
                      src={payment_time || "/placeholder.svg"}
                      alt="Muddatli to'lov"
                      className="w-8 h-8"
                    />
                    <span className="font-inter font-[600] text-[16px] leading-[22px] text-black">
                      {lang === "uz"
                        ? "Muddatli to'lov"
                        : lang === "en"
                        ? "Installment"
                        : lang === "ru"
                        ? "Рассрочка"
                        : "Muddatli to'lov"}
                    </span>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-[2px] border-[#BEA086] cursor-pointer duration-300 ${
                      selectedMethod === "installment" ? "bg-[#BEA086]" : ""
                    }`}
                  >
                    {selectedMethod === "installment" && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {selectedMethod === "installment" && (
              <div className="border border-[#D5D5D5] rounded-lg w-full sm:w-[90%] p-[20px] sm:p-[27px] bg-white">
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="flex flex-row gap-3">
                    <div className="w-10 h-10 object-contain rounded-[5px]">
                      <img src={open_icon} alt="open" />
                    </div>
                    <div className="flex flex-col h-[30px] -mt-[2px]">
                      <span className="font-inter font-[500] text-[14px] sm:text-[16px] leading-[22px] text-black">
                        {lang === "uz"
                          ? "Muddatli to'lov turi"
                          : lang === "en"
                          ? "Installment type"
                          : lang === "ru"
                          ? "Тип рассрочки"
                          : "Muddatli to'lov turi"}
                      </span>
                      <span className="font-inter font-[600] text-[14px] sm:text-[16px] leading-[22px] text-black">
                        Open
                      </span>
                    </div>
                  </div>
                  {/* <div
                    onClick={() => set_is_payment_variant(true)}
                    className="cursor-pointer hover:underline font-inter font-[600] text-[14px] sm:text-[16px] leading-[22px] text-[#000000BF]"
                  >
                    {lang === "uz"
                      ? "Taxrirlash"
                      : lang === "en"
                      ? "Edit"
                      : lang === "ru"
                      ? "Редактировать"
                      : "Taxrirlash"}
                  </div> */}
                </div>
                <hr className="border-[#D5D5D5] border-[1.5px] rounded-full" />
                <div className="flex flex-col mt-8 justify-between w-full py-[10px] px-[12px] h-[87px] rounded-[8px] border-[1px] border-[rgba(213,213,213,1)] bg-[rgba(242,242,241,1)]">
                  {/* Payment options */}
                  <div className="w-full h-[26px] rounded-[5px] flex justify-between gap-[3.75px] bg-[rgba(213,213,213,1)]">
                    {paymentOptions[lang].map((option, index) => (
                      <div
                        key={index}
                        className={`transition-all duration-100 flex justify-center items-center w-[80px] h-[26px] rounded-[5px] cursor-pointer ${
                          selectedPaymentIndex === index
                            ? "bg-white border-[1.5px] border-[rgba(190,160,134,1)]"
                            : ""
                        }`}
                        onClick={() => handlePaymentClick(index)}
                      >
                        <h1 className="font-inter font-[500] text-[10px] text-black">
                          {option}
                        </h1>
                      </div>
                    ))}
                  </div>

                  {/* Calculation */}
                  <div className="flex gap-[10px] items-center">
                    <h1 className="font-inter font-[500] text-[12px] text-black">
                      {totalPrice} + {plans[selectedPaymentIndex].percent}%
                    </h1>
                    <h1 className="w-[89px] h-[28px] rounded-[2.5px] bg-[rgba(254,242,157,1)] font-inter font-[500] text-[13px] leading-[22px] flex justify-center items-center">
                      {monthlyPayments[selectedPaymentIndex]} {uzs_lang}
                    </h1>
                    <h1 className="font-inter font-[500] text-[10px] leading-[22px] text-black">
                      x {plans[selectedPaymentIndex].months}{" "}
                      {lang === "uz"
                        ? "oy"
                        : lang === "en"
                        ? "month"
                        : lang === "ru"
                        ? "мес."
                        : "oy"}
                    </h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[97%] mx-auto px-6 sm:p-6">
          <div className="space-y-5 sm:space-y-10">
            <h2 className="font-inter font-[600] text-[14px] sm:text-[24px] leading-[22px] text-black">
              {lang === "uz"
                ? "Sizning buyurtmangiz"
                : lang === "en"
                ? "Your order"
                : lang === "ru"
                ? "Ваш заказ"
                : "Sizning buyurtmangiz"}
            </h2>
            <div className="space-y-5 w-[100%] text-[#000000BF] font-inter font-[500] text-[14px] sm:text-[20px] leading-[22px]">
              <div className="flex items-center justify-between">
                <span>
                  {lang === "uz"
                    ? "Maxsulotlar narxi"
                    : lang === "en"
                    ? "Products price"
                    : lang === "ru"
                    ? "Стоимость товаров"
                    : "Maxsulotlar narxi"}
                </span>
                <span>
                  {basket
                    .filter((item) => item.selected)
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toLocaleString()}{" "}
                  {lang === "uz"
                    ? "so'm"
                    : lang === "en"
                    ? "uzs"
                    : lang === "ru"
                    ? "сум"
                    : "so'm"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>
                  {lang === "uz"
                    ? "Ishlatilayotgan keshbek"
                    : lang === "en"
                    ? "Used cashback"
                    : lang === "ru"
                    ? "Использованный кешбек"
                    : "Ishlatilayotgan keshbek"}
                </span>
                <span>
                  {(cashback_is_using && cashbackAmount) || 0}
                  {` `}{" "}
                  {lang === "uz"
                    ? "so'm"
                    : lang === "en"
                    ? "uzs"
                    : lang === "ru"
                    ? "сум"
                    : "so'm"}
                </span>
              </div>
              <hr className="border-[#D5D5D5] border-[1.5px] my-[23px]" />
              <div className="flex sm:text-[20px] font-[700] text-[16px] justify-between items-center">
                <span>
                  {lang === "uz"
                    ? "Jami"
                    : lang === "en"
                    ? "Total"
                    : lang === "ru"
                    ? "Итого"
                    : "Jami"}
                </span>
                <span>
                  {(cashback_is_using && payable.toLocaleString()) ||
                    totalPrice}{" "}
                  {lang === "uz"
                    ? "so'm"
                    : lang === "en"
                    ? "uzs"
                    : lang === "ru"
                    ? "сум"
                    : "so'm"}
                </span>
              </div>
            </div>
            <Link
              to={selectedMethod === "installment" ? "/installment" : ""}
              onClick={
                selectedMethod === "installment"
                  ? handleInstallment
                  : handleOrderCreation
              }
            >
              <button className="w-[100%] py-4 sm:py-6 bg-[#DCC38B] font-inter mt-5 sm:mt-2 font-[600] text-[16px] sm:text-[22px] leading-[22px] text-black rounded-[10px] cursor-pointer hover:scale-[101%] active:scale-[99%] duration-300">
                {lang === "uz"
                  ? "Xaridni rasmiylashtirish"
                  : lang === "en"
                  ? "Purchase clearance"
                  : lang === "ru"
                  ? "Подтверждение покупки"
                  : "Xaridni rasmiylashtirish"}
              </button>
            </Link>
            <div className="text-center font-inter font-[400] mt-8 text-[13px] sm:text-[18px] leading-[19px] sm:leading-[33px]">
              {lang === "uz"
                ? "Buyurtmani tasdiqlash orqali men "
                : lang === "en"
                ? "By confirming the order, I accept the "
                : lang === "ru"
                ? "Подтверждая заказ, я принимаю "
                : ""}
              <Link to="/terms" className="text-purple-600 hover:underline">
                {lang === "uz"
                  ? "foydalanuvchi shartnomasini"
                  : lang === "en"
                  ? "the user agreement"
                  : lang === "ru"
                  ? "пользовательское соглашение"
                  : "foydalanuvchi shartnomasini"}
              </Link>{" "}
              {lang === "uz"
                ? "shartlarini qabul qilaman."
                : lang === "en"
                ? "terms."
                : lang === "ru"
                ? "и условия."
                : "shartlarini qabul qilaman."}
            </div>
          </div>
        </div>
        <Modal
          is_modal_open={is_modal_open}
          set_is_modal_open={set_is_modal_open}
          method={modal_method}
        />
      </div>
      <Delivery
        setSelectedLocation={setSelectedLocation}
        set_is_delivery={set_is_delivery}
        is_delivery={is_delivery}
        is_another_nav={is_another_nav}
        set_address_inform={set_address_inform}
      />
      <Payment_variant
        is_payment_variant={is_payment_variant}
        set_is_payment_variant={set_is_payment_variant}
        set_address_inform={set_address_inform}
      />
      <Pickup_address
        is_pickup={is_pickup}
        set_is_pickup={set_is_pickup}
        set_address_inform={set_address_inform}
      />
    </div>
  );
};

export default Formalization_main;
