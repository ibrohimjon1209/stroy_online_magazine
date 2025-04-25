import { Check, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import arrive_icon from "./imgs/arrive_icon.png";
import cash_icon from "./imgs/cash_icon.png";
import payment_time from "./imgs/payment_time.png";
import on_arrive from "./imgs/on_arrive.png";
import pay_me from "./imgs/pay_me.png";
import click from "./imgs/click.png";
import alif_icon from "./imgs/alif.png";
import Modal from "./modal";
import { useEffect, useState } from "react";
import Delivery from "../Map/map_main";
import Payment_variant from "../payment_variant/payment_main";
import Pickup_address from "../pickup_address/pickup_address_main";
import { get_user } from "../../Services/auth/get_user";

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
}) => {
  const [userData, setUserData] = useState({
    name: "...",
    phone: "...",
  });
  const [deliver_type, set_deliver_type] = useState("bring");
  const [selectedMethod, setSelectedMethod] = useState("installment");
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [is_delivery, set_is_delivery] = useState(false);
  const [is_pickup, set_is_pickup] = useState(false);
  const [is_payment_variant, set_is_payment_variant] = useState(false);
  const [cashback_is_using, set_cashback_is_using] = useState(false);
  const [address_inform, set_address_inform] = useState(null);
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

        if (!user_data) {
          return;
        }

        setUserData({
          name: user_data.first_name
            ? `${user_data.first_name} ${user_data.last_name}`
            : lang == "uz"
            ? "Foydalanuvchi"
            : lang == "en"
            ? "User"
            : lang == "ru"
            ? "Пользователь"
            : "Foydalanuvchi",
          phone: user_data.phone_number || "...",
        });
      } catch (err) {
        console.error(err);
      }
    };

    if (userSignIn) {
      fetchUserData();
    }
  }, [userSignIn]);

  const uzs_lang =
    lang == "uz"
      ? "so'm"
      : lang == "en"
      ? "uzs"
      : lang == "ru"
      ? "сум"
      : "so'm";

  const label_delivery =
    deliver_type === "bring"
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
  return (
    <div className="flex flex-col w-full h-full mb-17 sm:mb-0">
      <div className="w-full fixed z-50 h-[65px] bg-[#DCC38B] sm:hidden block">
        <Link
          onClick={() => set_formalization_open(false)}
          className="w-full h-full flex items-center gap-[10px] pl-[13px]"
          to="/basket"
        >
          <ChevronLeft className="scale-110" />
          <h1 className="font-inter font-[500] text-[17px] leading-[22px] text-black">
            {lang == "uz"
              ? "Buyurtma"
              : lang == "en"
              ? "Order"
              : lang == "ru"
              ? "Заказ"
              : "Buyurtma"}
          </h1>
        </Link>
      </div>
      <div
        className={`w-full sm:w-[76%] sm:mt-0 mt-12 ${
          is_delivery ? "hidden" : "block"
        }
        ${is_payment_variant ? "hidden" : "block"}
        ${is_pickup ? "hidden" : "block"}
         mx-auto bg-white mb-[20px]`}
      >
        <div className="p-6 pt-[35px]">
          <h2 className="font-inter font-[600] text-[15px] leading-[22px] text-black">
            {lang == "uz"
              ? "Qabul qiluvchi"
              : lang == "en"
              ? "Receiver"
              : lang == "ru"
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
                  <p className="font-inter font-[600] text-[15px] leading-[22px] text-black">
                    {userData?.name || lang == "uz"
                      ? "Foydalanuvchi"
                      : lang == "en"
                      ? "User"
                      : lang == "ru"
                      ? "Пользователь"
                      : "Foydalanuvchi"}
                  </p>
                  <p className="font-inter font-[500] text-[13px] leading-[22px] text-black">
                    {userData?.phone || "..."}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login">
              {setUserSignIn(false)}
              <div className="border bg-[#FFDF02] border-[#D5D5D5] rounded-lg p-4 mt-[20px] mb-6 w-[40%] h-[70px] flex items-center justify-center hover:scale-[101%] active:scale-[99%] duration-300">
                <p className="font-inter font-[600] text-[24px] leading-[22px] text-black">
                  {lang == "uz"
                    ? "Kirish"
                    : lang == "en"
                    ? "Login"
                    : lang == "ru"
                    ? "Входить"
                    : "Kirish"}
                </p>
              </div>
            </Link>
          )}

          <div className="flex flex-col gap-8 mx-5 my-20">
            {console.log(basket)}
            {basket.map((item) => {
              if (item.selected) {
                return (
                  <div className="flex gap-[15px] sm:gap-[35px] mb-6 mt-[20px]">
                    <div className="bg-gray-100 rounded-lg w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] flex items-center justify-center">
                      <img
                        src={item.img}
                        alt={item.name[lang]}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col gap-[10px] sm:gap-[50px] font-inter font-[600] text-[15px] sm:text-[24px] leading-[22px] text-black">
                      <div>
                        <h3>{item.name[lang]}</h3>
                        <p className="mt-[15px] sm:mt-[25px]">
                          {item.price} {` `} {uzs_lang}
                        </p>
                      </div>
                      <p>
                        {item.quantity} {` `}{" "}
                        {lang == "uz"
                          ? "dona"
                          : lang == "en"
                          ? "piece"
                          : lang == "ru"
                          ? "шт"
                          : "dona"}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          <div className="relative flex p-1 bg-gray-100 rounded-xl mt-[20px] sm:mt-[35px] mb-4 h-[40px] sm:h-[60px] w-full sm:w-[95%] mx-auto font-inter font-[500] text-[13px] sm:text-[18px] leading-[22px] text-black">
            <button
              onClick={() => set_deliver_type("bring")}
              className={`flex-1 py-1 sm:py-2.5 text-center rounded-lg font-medium cursor-pointer ${
                deliver_type === "bring"
                  ? "bg-white shadow-sm duration-500"
                  : "text-gray-500"
              }`}
            >
              {lang == "uz"
                ? "Olib ketish"
                : lang == "en"
                ? "Pickup"
                : lang == "ru"
                ? "Забрать"
                : "Olib ketish"}
            </button>
            <button
              onClick={() => set_deliver_type("deliver")}
              className={`flex-1 py-1 sm:py-2.5 text-center rounded-lg font-medium cursor-pointer ${
                deliver_type === "deliver"
                  ? "bg-white shadow-sm duration-500"
                  : "text-gray-500"
              }`}
            >
              {lang == "uz"
                ? "Yetkazib berish"
                : lang == "en"
                ? "Delivery"
                : lang == "ru"
                ? "Доставить"
                : "Yetkazib berish"}
            </button>
          </div>

          <div className="border border-[#D5D5D5] rounded-lg mb-4 mt-[25px] sm:mt-[35px] w-[95%] mx-auto hover:scale-[1.008] active:scale-[1] duration-300">
            <div
              onClick={() => {
                deliver_type === "bring"
                  ? set_is_delivery(true)
                  : set_is_pickup(true);
              }}
              className="flex items-center justify-between w-full p-2 cursor-pointer sm:p-4"
            >
              <div className="flex items-center w-full pr-[40px] gap-2 justify-between sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src={arrive_icon}
                    alt="arrive"
                    className="h-[21px] w-[21px] sm:h-[25px] sm:w-[25px] object-contain"
                  />
                  <span className="text-[13px] sm:text-[18px] sm:font-medium">
                    {label_delivery}
                  </span>
                </div>

                <h1>{address_inform ? address_inform[`address_${lang}`] : "Manzil tanlash"}</h1>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div
            onClick={() => set_cashback_is_using(!cashback_is_using)}
            className="border overflow-hidden border-[#D5D5D5] rounded-lg mb-4 mt-[20px] sm:mt-[30px] w-[95%] mx-auto hover:scale-[1.008] active:scale-[1] duration-300"
          >
            <div className="flex items-center justify-between w-full p-2 cursor-pointer sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <img
                  src={cash_icon}
                  alt="cash"
                  className="h-[21px] w-[21px] sm:h-[25px] sm:w-[25px] object-contain"
                />
                <span className="text-[13px] sm:text-[18px] sm:font-medium">
                  {lang == "uz"
                    ? "Keshbekni ishlatish"
                    : lang == "en"
                    ? "Use cashback"
                    : lang == "ru"
                    ? "Использовать кешбек"
                    : "Keshbekni ishlatish"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`${
                    cashback_is_using ? "translate-x-0" : "translate-x-10"
                  } text-[13px] duration-200 sm:text-[18px] sm:font-medium`}
                >
                  15.000 {` `} {uzs_lang}
                </span>
                <div
                  className={`${
                    cashback_is_using ? "translate-x-0" : "translate-x-10"
                  } p-1 duration-200 bg-green-500 rounded-full`}
                >
                  <Check className="w-3 h-3 text-white sm:h-4 sm:w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[95%] mx-auto p-7 sm:p-4 -mt-[20px]">
          <h1 className="font-inter font-[600] text-[15px] leading-[22px] text-black mb-4">
            {lang == "uz"
              ? "To'lov usuli"
              : lang == "en"
              ? "Payment method"
              : lang == "ru"
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
                      src={click}
                      alt="Click"
                      className="object-contain w-7 h-7 sm:w-8 sm:h-8"
                    />
                    <span className="font-inter font-[600] text-[15px] leading-[22px] text-black">
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
                      src={pay_me}
                      className="object-contain w-7 h-7 sm:w-8 sm:h-8"
                      alt="Payme"
                    />
                    <span className="font-inter font-[600] text-[15px] leading-[22px] text-black">
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
                      src={on_arrive}
                      alt="Qabul qilinganda"
                      className="object-contain w-7 h-7 sm:w-8 sm:h-8"
                    />
                    <span className="font-inter font-[600] text-[15px] leading-[22px] text-black">
                      {lang == "uz"
                        ? "Qabul qilinganda"
                        : lang == "en"
                        ? "On arrive"
                        : lang == "ru"
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
                  <div className="flex items-center gap-3">
                    <img
                      src={payment_time}
                      alt="Muddatli to'lov"
                      className="w-8 h-8"
                    />
                    <span className="font-inter font-[600] text-[15px] leading-[22px] text-black">
                      {lang == "uz"
                        ? "Muddatli to'lov"
                        : lang == "en"
                        ? "Installment"
                        : lang == "ru"
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
                    <img
                      src={alif_icon}
                      className="w-10 h-10 object-contain rounded-[5px]"
                      alt=""
                    />
                    <div className="flex flex-col h-[30px] -mt-[2px]">
                      <span className="font-inter font-[500] text-[14px] sm:text-[16px] leading-[22px] text-black">
                        {lang == "uz"
                          ? "Muddatli to'lov turi"
                          : lang == "en"
                          ? "Installment type"
                          : lang == "ru"
                          ? "Тип рассрочки"
                          : "Muddatli to'lov turi"}
                      </span>
                      <span className="font-inter font-[600] text-[14px] sm:text-[16px] leading-[22px] text-black">
                        Alif
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={() => set_is_payment_variant(true)}
                    className="cursor-pointer hover:underline font-inter font-[600] text-[14px] sm:text-[16px] leading-[22px] text-[#000000BF]"
                  >
                    {lang == "uz"
                      ? "Taxrirlash"
                      : lang == "en"
                      ? "Edit"
                      : lang == "ru"
                      ? "Редактировать"
                      : "Taxrirlash"}
                  </div>
                </div>
                <hr className="border-[#D5D5D5]" />
                <div className="mt-4 sm:mt-5 flex flex-col gap-5 sm:gap-[46px] font-inter font-[600] text-[16px] leading-[22px] text-[#000000BF]">
                  <div className="flex flex-col gap-5">
                    <div className="flex justify-between">
                      <span>
                        {lang == "uz"
                          ? "Oylik to'lov"
                          : lang == "en"
                          ? "Monthly payment"
                          : lang == "ru"
                          ? "Ежемесячный платеж"
                          : "Oylik to'lov"}
                      </span>
                      <span>
                        119.250 {` `}
                        {uzs_lang}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>
                        {lang == "uz"
                          ? "Muddatli to'lov"
                          : lang == "en"
                          ? "Installment"
                          : lang == "ru"
                          ? "Рассрочка"
                          : "Muddatli to'lov"}
                      </span>
                      <span>
                        {lang == "uz"
                          ? "12 oy"
                          : lang == "en"
                          ? "12 months"
                          : lang == "ru"
                          ? "12 месяцев"
                          : "12 oy"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      {lang == "uz"
                        ? "Jami"
                        : lang == "en"
                        ? "Total"
                        : lang == "ru"
                        ? "Итого"
                        : "Jami"}
                    </span>
                    <span>
                      1.431.000{` `}
                      {uzs_lang}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[97%] mx-auto px-6 sm:p-6">
          <div className="space-y-5 sm:space-y-10">
            <h2 className="font-inter font-[600] text-[14px] sm:text-[24px] leading-[22px] text-black">
              {lang == "uz"
                ? "Sizning buyurtmangiz"
                : lang == "en"
                ? "Your order"
                : lang == "ru"
                ? "Ваш заказ"
                : "Sizning buyurtmangiz"}
            </h2>

            <div className="space-y-5 w-[100%] text-[#000000BF] font-inter font-[500] text-[14px] sm:text-[20px] leading-[22px]">
              <div className="flex items-center justify-between">
                <span>
                  {lang == "uz"
                    ? "1 ta maxsulot narxi"
                    : lang == "en"
                    ? "1 product price"
                    : lang == "ru"
                    ? "Стоимость 1 товара"
                    : "1 ta maxsulot narxi"}
                </span>
                <span>
                  1.431.000{` `}
                  {uzs_lang}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>
                  {lang == "uz"
                    ? "Muddatli to'lov"
                    : lang == "en"
                    ? "Installment"
                    : lang == "ru"
                    ? "Рассрочка"
                    : "Muddatli to'lov"}
                </span>
                <span>
                  {lang == "uz"
                    ? "12 oy"
                    : lang == "en"
                    ? "12 months"
                    : lang == "ru"
                    ? "12 месяцев"
                    : "12 oy"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>
                  {lang == "uz"
                    ? "Muddatli to'lov"
                    : lang == "en"
                    ? "Installment"
                    : lang == "ru"
                    ? "Рассрочка"
                    : "Muddatli to'lov"}
                </span>
                <span>
                  119.250{` `}
                  {uzs_lang}
                </span>
              </div>

              <hr className="border-[#D5D5D5] border-[1.5px] my-[23px]" />

              <div className="flex sm:text-[20px] font-[700] text-[16px] justify-between items-center">
                <span>
                  {" "}
                  {lang == "uz"
                    ? "Jami"
                    : lang == "en"
                    ? "Total"
                    : lang == "ru"
                    ? "Итого"
                    : "Jami"}
                </span>
                <span>
                  1.431.000{` `}
                  {uzs_lang}
                </span>
              </div>
            </div>

            <button
              onClick={() => set_is_modal_open(true)}
              className="w-full py-4 sm:py-6 bg-[#DCC38B] font-inter mt-8 sm:mt-5 font-[600] text-[16px] sm:text-[22px] leading-[22px] text-black rounded-[10px] cursor-pointer hover:scale-[101%] active:scale-[99%] duration-300"
            >
              {lang === "uz"
                ? "Xaridni rasmiylashtirish"
                : lang === "en"
                ? "Purchase clearance"
                : lang === "ru"
                ? "Подтверждение покупки"
                : "Xaridni rasmiylashtirish"}
            </button>

            <div className="text-center font-inter font-[400] text-[13px] sm:text-[18px] leading-[19px] sm:leading-[33px]">
              {lang === "uz" ? "Buyurtmani tasdiqlash orqali men " : ""}
              {lang === "en" ? "By confirming the order, I accept the " : ""}
              {lang === "ru" ? "Подтверждая заказ, я принимаю " : ""}
              <Link to="/terms" className="text-purple-600 hover:underline">
                {lang === "uz" ? "foydalanuvchi" : ""}
                {lang === "en" ? "the user" : ""}
                {lang === "ru" ? "пользовательское" : ""}
                <br />
                {lang === "uz" ? "shartnomasini" : ""}
                {lang === "en" ? "agreement" : ""}
                {lang === "ru" ? "соглашение" : ""}
              </Link>{" "}
              {lang === "uz" ? "shartlarini qabul qilaman." : ""}
              {lang === "en" ? "terms." : ""}
              {lang === "ru" ? "и условия." : ""}
            </div>
          </div>
        </div>
        <Modal
          is_modal_open={is_modal_open}
          set_is_modal_open={set_is_modal_open}
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
      <Pickup_address is_pickup={is_pickup} set_is_pickup={set_is_pickup} />
    </div>
  );
};

export default Formalization_main;
