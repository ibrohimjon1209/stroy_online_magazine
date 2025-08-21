import React, { useState, useEffect } from "react";
import { get_user_cash } from "../../../../../../Services/get_cashback";
import { order_get } from "../../../../../../Services/order/get_my";

const Cashback_main = ({ lang }) => {
  const [cashback_list, set_cashback_list] = useState([]);
  const [common_cashback, set_common_cashback] = useState(0);
  const [paid, set_paid] = useState(0);
  const [userCashback, set_userCashback] = useState(0);

  const userId = localStorage.getItem("userId"); // LocalStorage'dan user id olish

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
    const accessToken = localStorage.getItem("accessToken");

    get_user_cash(userId, accessToken).then((data) => { 
      const balance = data?.cashback_balance ?? 0;
      const userBalance = parseFloat(balance) || 0;

      set_userCashback(userBalance);
      order_get(accessToken).then((orders) => {
        set_cashback_list(orders);

        // cashback_used summasi
        const used = orders.reduce(
          (sum, order) => sum + (parseFloat(order.cashback_used) || 0),
          0
        );

        set_paid(used); // jami ishlatilgan cashback
      });
    });
  }
}, [userId]);

  return (
    <div className="w-[100%] sm:w-[40%] mt-6 sm:mt-0 pb-10 mx-auto bg-white rounded-lg">
      <div className="flex flex-row justify-between mb-12">
        <div className="flex flex-col gap-4 text-sm font-inter font-[600] text-[14px] sm:text-[18px] leading-[22px] text-black">
        <div>
          {lang === "uz"
            ? "Umumiy keshbek"
            : lang === "en"
            ? "Common Cashback"
            : "Общий кэшбек"}
        </div>
        <div>
          {lang === "uz" ? "Jami ishlatilgan" : lang === "en" ? "Paid" : "Оплачено"}
        </div>
      </div>
        <div className="flex flex-col gap-4 font-inter font-[600] text-[18px] sm:text-[20px] leading-[22px] text-black">
        <div>
          {common_cashback + userCashback} {uzs_lang} {/* Keshbekni qo'shish */}
        </div>
        <div>
          {paid} {uzs_lang}
        </div>
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

          <div className="mb-4 space-y-2 sm:mb-6">
            <div className="flex justify-between font-inter font-[500] text-[15px] leading-[22px] text-black">
              <div>
                {lang === "uz"
                  ? "Yetkazish sanasi"
                  : lang === "en"
                  ? "Delivery date"
                  : "Дата доставки"}
              </div>
              <div>
                {item.created_at
                  ? new Date(item.created_at).toLocaleString("uz-UZ", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"}
              </div>
            </div>
            <div className="flex justify-between font-inter font-[500] text-[15px] leading-[22px] text-black">
              <div>
                {item.items.length}{" "}
                {lang === "uz"
                  ? "dona mahsulot"
                  : lang === "en"
                  ? "pcs of product"
                  : "шт товара"}
              </div>
              <div>
                {item.total_amount} {uzs_lang}
              </div>
            </div>
            <div className="flex justify-between font-inter font-[500] text-[15px] leading-[22px] text-black">
              <div>
                {item.items.length}{" "}
                {lang === "uz"
                  ? "Ishlatilgan keshbek"
                  : lang === "en"
                  ? "Used cashback"
                  : "Использованный кэшбек"}
              </div>
              <div>
                {item.cashback_used} {uzs_lang}
              </div>
            </div>
            <div className="flex justify-between font-inter font-[500] text-[15px] leading-[22px] text-black">
              <div>
                {item.items.length}{" "}
                {lang === "uz"
                  ? "Ishlab olingan keshbek"
                  : lang === "en"
                  ? "Earned cashback"
                  : "Заработанный кэшбек"}
              </div>
              <div>
                {item.cashback_earned} {uzs_lang}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cashback_main;
