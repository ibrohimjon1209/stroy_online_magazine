import React, { useState, useEffect } from "react";

const Cashback_main = ({ lang }) => {
  const [cashback_list, set_cashback_list] = useState([]);
  const [common_cashback, set_common_cashback] = useState(0);
  const [paid, set_paid] = useState(10000);
  const [userCashback, set_userCashback] = useState(0);  // Foydalanuvchining cashback qiymati

  const userId = localStorage.getItem("userId");  // LocalStorage'dan user id olish

  const uzs_lang =
    lang === "uz"
      ? "so'm"
      : lang === "en"
      ? "uzs"
      : lang === "ru"
      ? "сум"
      : "so'm";

  useEffect(() => {
    if (userId) {
      // API'ni chaqirish uchun user ID dan foydalanish
      fetch(`https://back.stroybazan1.uz/api/api/users/${userId}/`)
        .then((response) => response.json())
        .then((data) => {
          set_userCashback(parseFloat(data.cashback_balance));  // cashback_balance ni o'qish
        });

      // Orderlar ro'yxatini olish
      fetch("https://back.stroybazan1.uz/api/api/orders/")
        .then((response) => response.json())
        .then((data) => {
          // orderlar ma'lumotlarini olish
          const orders = data.filter((order) => order.user === parseInt(userId));  // Foydalanuvchiga tegishli orderlar
          const cashbackTotal = orders.reduce((sum, order) => sum + parseFloat(order.cashback_earned), 0);
          set_cashback_list(orders);
          set_common_cashback(cashbackTotal);  // Umumiy cashbackni hisoblash
        });
    }
  }, [userId]);

  return (
    <div className="w-[100%] sm:w-[40%] mt-6 sm:mt-0 mx-auto bg-white rounded-lg">
      <div className="flex justify-between mb-1 sm:mb-4 font-inter font-[600] text-[18px] sm:text-[20px] leading-[22px] text-black">
        <div>
          {common_cashback + userCashback} {uzs_lang} {/* Keshbekni qo'shish */}
        </div>
        <div>{paid} {uzs_lang}</div>
      </div>

      <div className="flex justify-between text-sm mb-10 sm:mb-6 font-inter font-[600] text-[14px] sm:text-[15px] leading-[22px] text-black">
        <div>
          {lang === "uz" ? "Umumiy keshbek" : lang === "en" ? "Common Cashback" : "Общий кэшбек"}
        </div>
        <div>
          {lang === "uz" ? "Yechilgan" : lang === "en" ? "Paid" : "Оплачено"}
        </div>
      </div>

      {cashback_list.map((item, i) => (
        <div key={i}>
          <hr className="border-[#0000008C] mb-6" />
          <div className="mb-4 sm:mb-6">
            <div className="font-inter font-[600] text-[15px] leading-[22px] text-black">
              {lang === "uz"
                ? `${item.id}-sonli buyurtma`
                : lang === "en"
                ? `Order № ${item.id}`
                : "Заказ № " + item.id}
            </div>
          </div>

          <div className="mb-3 space-y-2 sm:mb-4">
            <div className="flex justify-between font-inter font-[500] text-[15px] leading-[22px] text-black">
              <div>{lang === "uz" ? "Yetkazish sanasi" : lang === "en" ? "Delivery date" : "Дата доставки"}</div>
              <div>{item.delivery_date ? item.delivery_date : "N/A"}</div>
            </div>
            <div className="flex justify-between font-inter font-[500] text-[15px] leading-[22px] text-black">
              <div>{lang === "uz" ? "Dona mahsulot" : lang === "en" ? "Piece of product" : "Штук товара"}</div>
              <div>{item.cashback_earned} {uzs_lang}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cashback_main;
