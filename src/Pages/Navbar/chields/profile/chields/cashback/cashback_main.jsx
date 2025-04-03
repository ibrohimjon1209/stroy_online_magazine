import React, { useState } from "react";

const Cashback_main = ({ lang }) => {
  const [cashback_list, set_cashback_list] = useState([
    {
      order_id: "63224636",
      arrive_date: {
        uz: "Juma 10 yanvar",
        en: "Wednesday 10 January",
        ru: "Четверг 10 января",
      },
      delivery_date: {
        uz: "Juma 10 yanvar",
        en: "Wednesday 10 January",
        ru: "Четверг 10 января",
      },
      product_amount: 1,
      amount: "126,650",
      cashback_amount: "12,437",
    },
    {
      order_id: "3123",
      arrive_date: {
        uz: "Juma 10 yanvar",
        en: "Wednesday 10 January",
        ru: "Четверг 10 января",
      },
      delivery_date: {
        uz: "Juma 10 yanvar",
        en: "Wednesday 10 January",
        ru: "Четверг 10 января",
      },
      product_amount: 1,
      amount: "126,650",
      cashback_amount: "12,437",
    },
  ]);
  const [common_cashback, set_common_cashback] = useState(
    cashback_list.reduce(
      (sum, item) => sum + parseFloat(item.cashback_amount.replace(",", "")),
      0
    )
  );

  const [paid, set_paid] = useState(10000);
  const uzs_lang =
    lang == "uz"
      ? "so'm"
      : lang == "en"
      ? "uzs"
      : lang == "ru"
      ? "сум"
      : "so'm";

  return (
    <div className="w-[100%] sm:w-[40%] mt-6 sm:mt-0 mx-auto bg-white rounded-lg">
      <div className="flex justify-between mb-1 sm:mb-4 font-inter font-[600] text-[18px] sm:text-[20px] leading-[22px] text-black">
        <div>
          {common_cashback} {uzs_lang}
        </div>
        <div>{paid} {uzs_lang}</div>
      </div>

      <div className="flex justify-between text-sm mb-10 sm:mb-6 font-inter font-[600] text-[14px] sm:text-[15px] leading-[22px] text-black">
        <div>
          {lang == "uz"
            ? "Umumiy keshbek"
            : lang == "en"
            ? "Common Cashback"
            : lang == "ru"
            ? "Общий кешбек"
            : "Umumiy keshbek"}
        </div>
        <div>
          {lang == "uz"
            ? "Yechilgan"
            : lang == "en"
            ? "Paid"
            : lang == "ru"
            ? "Оплачено"
            : "Yechilgan"}
        </div>
      </div>

      {cashback_list.map((item, i) => (
        <div>
          <hr className="border-[#0000008C] mb-6" />
          <div className="mb-4 sm:mb-6">
            <div className="font-inter font-[600] text-[15px] leading-[22px] text-black">
              {lang == "uz"
                ? `${item.order_id}-sonli buyurtma`
                : lang == "en"
                ? `Order № ${item.order_id}`
                : lang == "ru"
                ? `Заказ № ${item.order_id}`
                : `${item.order_id}-sonli buyurtma`}
            </div>
          </div>

          <div className="mb-3 space-y-2 sm:mb-4">
            <div className="flex justify-between font-inter font-[500] text-[15px] leading-[22px] text-black">
              <div>
                {lang == "uz"
                  ? "Yetkazish sanasi"
                  : lang == "en"
                  ? "Delivery date"
                  : lang == "ru"
                  ? "Дата доставки"
                  : "Yetkazish sanasi"}
              </div>
              <div>{item.arrive_date[lang]}</div>
            </div>
            <div className="flex justify-between font-inter font-[500] text-[15px] leading-[22px] text-black">
              <div>
                {lang == "uz"
                  ? "Rasmiylashtirish sanasi"
                  : lang == "en"
                  ? "Date of registration"
                  : lang == "ru"
                  ? "Дата оформления"
                  : "Rasmiylashtirish sanasi"}
              </div>
              <div>{item.delivery_date[lang]}</div>
            </div>
          </div>

          <div className="space-y-2 mb-6 font-inter font-[600] text-[15px] leading-[22px] text-black">
            <div className="flex justify-between">
              <div>
                {item.product_amount}{" "}
                {lang == "uz"
                  ? "dona mahsulot"
                  : lang == "en"
                  ? "piece of product"
                  : lang == "ru"
                  ? "штук товара"
                  : "dona mahsulot"}
              </div>
              <div>
                {item.amount}{" "}
                {lang == "uz"
                  ? "so'm"
                  : lang == "en"
                  ? "uzs"
                  : lang == "ru"
                  ? "сум"
                  : "so'm"}
              </div>
            </div>
            <div className="flex justify-between text-[#12CF38]">
              <div>{lang == "uz" ? "Keshbek" : lang == "en" ? "Cashback" : lang == "ru" ? "Кэшбэк" : "Keshbek"}</div>
              <div>{item.cashback_amount} {uzs_lang}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cashback_main;
