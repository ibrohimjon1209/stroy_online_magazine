import { Link } from "react-router-dom";
import image from "./photo.png";
import { ChevronLeft } from "lucide-react";

const Orders_main = ({ lang }) => {
  const orders = [
    {
      id: "63224636",
      status: {
        uz: "Xaridorga Berilgan",
        en: "Delivered",
        ru: "Доставлен",
      },
      statusColor: "green",
      deliveryDate: {
        uz: "Juma 10 yanvar",
        en: "Wednesday 10 January",
        ru: "Четверг 10 января",
      },
      processDate: {
        uz: "Juma 10 yanvar",
        en: "Wednesday 10 January",
        ru: "Четверг 10 января",
      },
      quantity: 1,
      totalPrice: "126.650",
      product: {
        name: "PENOPLEX COMFORT",
        price: "125.650",
        seller: "1,599 sotuvchi / 12oy",
        image: image,
      },
    },
    {
      id: "63224636",
      status: {
        uz: "Jarayonda",
        en: "In progress",
        ru: "В процессе",
      },
      statusColor: "yellow",
      deliveryDate: {
        uz: "Juma 10 yanvar",
        en: "Wednesday 10 January",
        ru: "Четверг 10 января",
      },
      processDate: {
        uz: "Juma 10 yanvar",
        en: "Wednesday 10 January",
        ru: "Четверг 10 января",
      },
      quantity: 1,
      totalPrice: "126.650",
      product: {
        name: "PENOPLEX COMFORT",
        price: "125.650",
        seller: "1,599 sotuvchi / 12oy",
        image: image,
      },
    },
    {
      id: "63224636",
      status: {
        uz: "Bekor qilingan",
        en: "Canceled",
        ru: "Отменен",
      },
      statusColor: "red",
      deliveryDate: {
        uz: "Juma 10 yanvar",
        en: "Wednesday 10 January",
        ru: "Четверг 10 января",
      },
      processDate: {
        uz: "Juma 10 yanvar",
        en: "Wednesday 10 January",
        ru: "Четверг 10 января",
      },
      quantity: 1,
      totalPrice: "126.650",
      product: {
        name: "PENOPLEX COMFORT",
        price: "125.650",
        seller: "1,599 sotuvchi / 12oy",
        image: image,
      },
    },
  ];
  const uzs_lang =
    lang == "uz"
      ? "so'm"
      : lang == "en"
      ? "uzs"
      : lang == "ru"
      ? "сум"
      : "so'm";
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full fixed z-50 h-[65px] bg-[#DCC38B] sm:hidden block">
        <Link
          className="w-full h-full flex items-center gap-[10px] pl-[13px]"
          to={"/"}
        >
          <ChevronLeft className="scale-110" />
          <h1 className="font-inter font-[500] text-[17px] leading-[22px] text-black">
            {lang === "uz"
              ? "Buyurtmalar"
              : lang === "ru"
              ? "Заказы"
              : "Orders"}
          </h1>
        </Link>
      </div>
      <div className="container p-4 mx-auto my-4 mt-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 space-y-4 border rounded-lg shadow-md"
              style={{ borderStyle: "dashed" }}
            >
              <div className="flex items-start justify-between">
                <div className="text-lg font-bold text-gray-900 sm:text-xl">
                  {lang == "uz"
                    ? `${order.id}-sonli buyurtma`
                    : lang == "en"
                    ? `Order № ${order.id}`
                    : lang == "ru"
                    ? `Заказ № ${order.id}`
                    : `${order.id}-sonli buyurtma`}
                </div>
                <div
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium
                  ${
                    order.statusColor === "green"
                      ? "text-green-700 bg-green-100"
                      : ""
                  }
                  ${
                    order.statusColor === "yellow"
                      ? "text-yellow-700 bg-yellow-100"
                      : ""
                  }
                  ${
                    order.statusColor === "blue"
                      ? "text-blue-700 bg-blue-100"
                      : ""
                  }
                  ${
                    order.statusColor === "red" ? "text-red-700 bg-red-100" : ""
                  }
  `}
                >
                  {order.status[lang]}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">
                    {lang == "uz"
                      ? "Yetkazish sanasi"
                      : lang == "en"
                      ? "Delivery date"
                      : lang == "ru"
                      ? "Дата доставки"
                      : "Yetkazish sanasi"}
                  </span>
                  <span className="font-medium text-gray-900">
                    {order.deliveryDate[lang]}
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">
                    {lang == "uz"
                      ? "dona mahsulot"
                      : lang == "en"
                      ? "piece of product"
                      : lang == "ru"
                      ? "штук товара"
                      : "dona mahsulot"}
                  </span>
                  <span className="font-medium text-gray-900">
                    {order.processDate[lang]}
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">
                    {order.quantity}{" "}
                    {lang == "uz"
                      ? "dona mahsulot"
                      : lang == "en"
                      ? "piece of product"
                      : lang == "ru"
                      ? "штук товара"
                      : "dona mahsulot"}
                  </span>
                  <span className="font-medium text-gray-900">
                    {order.totalPrice} {uzs_lang}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={order.product.image}
                  alt={order.product.name}
                  width={70}
                  height={70}
                  className="object-contain rounded"
                />
                <div>
                  <div className="text-lg font-bold">{order.product.name}</div>
                  <div className="font-medium text-gray-900">
                    {order.product.price} {uzs_lang}
                  </div>
                </div>
              </div>
              <button className="text-base font-medium text-orange-500 cursor-pointer hover:underline">
                {lang == "uz"
                  ? "Maxsulotni ko'rsatish"
                  : lang == "en"
                  ? "View product"
                  : lang == "ru"
                  ? "Просмотр товара"
                  : "Maxsulotni ko'rsatish"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders_main;
