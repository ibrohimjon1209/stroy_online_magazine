import { Link } from "react-router-dom";
import image from "./photo.png";
import { ChevronLeft } from "lucide-react";

const Orders_main = () => {
  const orders = [
    {
      id: "63224636",
      status: "Xaridorga Berilgan",
      statusColor: "green",
      deliveryDate: "Juma 10 yanvar",
      processDate: "Juma 10 yanvar",
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
      id: "63224637",
      status: "Jarayonda",
      statusColor: "yellow",
      deliveryDate: "Shanba 11 yanvar",
      processDate: "Juma 10 yanvar",
      quantity: 2,
      totalPrice: "253.300",
      product: {
        name: "PENOPLEX COMFORT",
        price: "125.650",
        seller: "1,599 sotuvchi / 12oy",
        image: image,
      },
    },
    {
      id: "63224638",
      status: "Yetkazilmoqda",
      statusColor: "blue",
      deliveryDate: "Yakshanba 12 yanvar",
      processDate: "Shanba 11 yanvar",
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
      id: "63224639",
      status: "Bekor qilindi",
      statusColor: "red",
      deliveryDate: "Dushanba 13 yanvar",
      processDate: "Yakshanba 12 yanvar",
      quantity: 3,
      totalPrice: "379.950",
      product: {
        name: "PENOPLEX COMFORT",
        price: "125.650",
        seller: "1,599 sotuvchi / 12oy",
        image: image,
      },
    },
    {
      id: "63224639",
      status: "Bekor qilindi",
      statusColor: "red",
      deliveryDate: "Dushanba 13 yanvar",
      processDate: "Yakshanba 12 yanvar",
      quantity: 3,
      totalPrice: "379.950",
      product: {
        name: "PENOPLEX COMFORT",
        price: "125.650",
        seller: "1,599 sotuvchi / 12oy",
        image: image,
      },
    },
    {
      id: "63224639",
      status: "Bekor qilindi",
      statusColor: "red",
      deliveryDate: "Dushanba 13 yanvar",
      processDate: "Yakshanba 12 yanvar",
      quantity: 3,
      totalPrice: "379.950",
      product: {
        name: "PENOPLEX COMFORT",
        price: "125.650",
        seller: "1,599 sotuvchi / 12oy",
        image: image,
      },
    },
    {
      id: "63224639",
      status: "Bekor qilindi",
      statusColor: "red",
      deliveryDate: "Dushanba 13 yanvar",
      processDate: "Yakshanba 12 yanvar",
      quantity: 3,
      totalPrice: "379.950",
      product: {
        name: "PENOPLEX COMFORT",
        price: "125.650",
        seller: "1,599 sotuvchi / 12oy",
        image: image,
      },
    },
  ];
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full fixed z-50 h-[65px] bg-[#DCC38B] sm:hidden block">
        <Link
          className="w-full h-full flex items-center gap-[10px] pl-[13px]"
          to={"/"}
        >
          <ChevronLeft className="scale-110" />
          <h1 className="font-inter font-[500] text-[17px] leading-[22px] text-black">
            Buyurtmalar
          </h1>
        </Link>
      </div>
      <div className="container mx-auto p-4 my-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-6 space-y-4 shadow-md"
              style={{ borderStyle: "dashed" }}
            >
              <div className="flex justify-between items-start">
                <div className="sm:text-xl text-lg font-bold text-gray-900"> 
                  {order.id}-sonli buyurtma
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
                  {order.status}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Yetkazish sanasi</span>
                  <span className="text-gray-900 font-medium">
                    {order.deliveryDate}
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Rasmiylashtirish sanasi</span>
                  <span className="text-gray-900 font-medium">
                    {order.processDate}
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">
                    {order.quantity} dona maxsulot
                  </span>
                  <span className="text-gray-900 font-medium">
                    {order.totalPrice} so'm
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
                  <div className="font-bold text-lg">{order.product.name}</div>
                  <div className="text-gray-900 font-medium">
                    {order.product.price} so'm
                  </div>
                </div>
              </div>

              <button className="text-orange-500 text-base font-medium hover:underline cursor-pointer">
                Maxsulotni ko'rsatish
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders_main;
