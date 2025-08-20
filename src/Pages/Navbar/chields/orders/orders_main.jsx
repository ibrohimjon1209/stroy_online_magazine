"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, X } from "lucide-react"
import { order_get } from "../../../../Services/order/get_my"
import no_orders_image from './image.png'

const Orders_main = ({ lang }) => {
  const [expandedOrders, setExpandedOrders] = useState([])
  const [productDetails, setProductDetails] = useState({})
  const [orders, set_orders] = useState([])
  const uzs_lang = lang == "uz" ? "so'm" : lang == "en" ? "uzs" : lang == "ru" ? "сум" : "so'm"
  const [loading, setLoading] = useState(true)

  const toggleProductView = (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter((id) => id !== orderId))
    } else {
      setExpandedOrders([...expandedOrders, orderId])
      fetchProductsForOrder(orderId)
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await order_get(localStorage.getItem("accessToken"))
        if (res) set_orders(res)
      } catch (err) {
        console.error("Order olishda xatolik:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const get_product = async (id) => {
    try {
      const res = await fetch(`https://backkk.stroybazan1.uz/api/api/products/${id}/`)
      if (!res.ok) throw new Error("Serverda xatolik: " + res.status)
      return await res.json()
    } catch (err) {
      console.error("Xatolik:", err.message)
    }
  }

  const fetchProductsForOrder = async (orderId) => {
    const order = orders.find((o) => o.id === orderId)
    if (!order) return

    const productPromises = order.items.map(async (item) => {
      const productData = await get_product(item.product_variant.id)
      return { id: item.product_variant.id, data: productData }
    })

    try {
      const products = await Promise.all(productPromises)
      const productMap = {}
      products.forEach((product) => {
        if (product.data) productMap[product.id] = product.data
      })
      setProductDetails((prev) => ({ ...prev, [orderId]: productMap }))
    } catch (error) {
      console.error("Mahsulot ma'lumotlarini olishda xatolik:", error)
    }
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full fixed z-50 h-[65px] bg-[#DCC38B] sm:hidden block">
        <Link className="w-full h-full flex items-center gap-[10px] pl-[13px]" to={"/"}>
          <ChevronLeft className="scale-110" />
          <h1 className="font-inter font-[500] text-[17px] leading-[22px] text-black">
            {lang === "uz" ? "Buyurtmalar" : lang === "ru" ? "Заказы" : "Orders"}
          </h1>
        </Link>
      </div>

      <div className="container p-4 mx-auto my-4 mt-16">
        {loading ? (
          <div className="flex justify-center items-center w-full h-[200px]">
            <div className="loader"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="w-full mt-[50px] flex flex-col justify-center items-center">
            <img
              src={no_orders_image}
              alt="No orders"
              className="w-[400px] hover:scale-[103%] transition-all duration-[0.3s]"
            />
            <h1 className="w-full mt-[10px] text-[25px] text-center text-gray-800 font-[600] font-inter">
              {lang === "uz"
                ? "Buyurtmalaringiz yo'q"
                : lang === "en"
                  ? "No orders found"
                  : lang === "ru"
                    ? "Заказы не найдены"
                    : "Buyurtmalaringiz yo'q"}
            </h1>
            <h1 className="w-full mt-[10px] text-[18px] text-center text-gray-700 font-[500] font-inter">
              {lang === "uz"
                ? "Siz hali hech qanday buyurtma bermagansiz"
                : lang === "en"
                  ? "You haven't placed any orders yet"
                  : lang === "ru"
                    ? "Вы еще не сделали ни одного заказа"
                    : "Siz hali hech qanday buyurtma bermagansiz"}
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-6 space-y-4 border rounded-lg shadow-md"
                style={{ borderStyle: "dashed" }}
              >
                {/* Order header */}
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
                    ${order.status === "delivered" ? "text-green-700 bg-green-100" : ""}
                    ${order.status === "processing" || order.status === "in_payment" || order.status === "pending"
                      ? "text-yellow-700 bg-yellow-100"
                      : ""}
                    ${order.status === "shipped" ? "text-blue-700 bg-blue-100" : ""}
                    ${order.status === "cancelled" ? "text-red-700 bg-red-100" : ""}
                  `}
                  >
                    {order.status === "delivered"
                      ? lang == "uz"
                        ? "Yetkazilgan"
                        : lang == "en"
                          ? "Delivered"
                          : lang == "ru"
                            ? "Доставлен"
                            : "Yetkazilgan"
                      : ""}
                    {["processing", "in_payment", "pending"].includes(order.status)
                      ? lang == "uz"
                        ? "Jarayonda"
                        : lang == "en"
                          ? "In progress"
                          : lang == "ru"
                            ? "В процессе"
                            : "Jarayonda"
                      : ""}
                    {order.status === "shipped"
                      ? lang == "uz"
                        ? "Yetkazilmoqda"
                        : lang == "en"
                          ? "Delivering"
                          : lang == "ru"
                            ? "Доставляется"
                            : "Yetkazilmoqda"
                      : ""}
                  </div>
                </div>

                {/* Order info */}
                <div className="space-y-3">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">
                      {lang == "uz"
                        ? "Yaratilgan sanasi"
                        : lang == "en"
                          ? "Created date"
                          : lang == "ru"
                            ? "Дата создания"
                            : "Yaratilgan sanasi"}
                    </span>
                    <span className="font-medium text-gray-900">
                      {new Date(order.created_at).toLocaleString(
                        lang === "uz" ? "uz-UZ" : lang === "en" ? "en-US" : "ru-RU",
                        { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">
                      {lang == "uz"
                        ? "Yetkazib berish manzili"
                        : lang == "en"
                          ? "Delivery address"
                          : lang == "ru"
                            ? "Адрес доставки"
                            : "Yetkazib berish manzili"}
                    </span>
                    <span className="font-medium text-gray-900">{order.delivery_address}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">
                      {lang == "uz"
                        ? "To'lov usuli"
                        : lang == "en"
                          ? "Payment method"
                          : lang == "ru"
                            ? "Способ оплаты"
                            : ""}
                    </span>
                    <span className="font-medium text-gray-900">
                      {order.payment_method === "cash"
                        ? lang === "uz"
                          ? "Naqd"
                          : lang === "en"
                            ? "Cash"
                            : "Наличные"
                        : ""}
                      {order.payment_method === "payme" && "Payme"}
                      {order.payment_method === "click" && "Click"}
                      {order.payment_method === "installments_payment"
                        ? lang === "uz"
                          ? "Nasiya to'lov"
                          : lang === "en"
                            ? "Installment payment"
                            : "Рассрочка"
                        : ""}
                    </span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">
                      {order.items.length}{" "}
                      {lang == "uz"
                        ? "dona mahsulot"
                        : lang == "en"
                          ? "piece of product"
                          : lang == "ru"
                            ? "штук товара"
                            : "dona mahsulot"}
                    </span>
                    <span className="font-medium text-gray-900">
                      {order.total_amount} {uzs_lang}
                    </span>
                  </div>
                </div>

                {/* Expanded products */}
                {expandedOrders.includes(order.id) && (
                  <div className="pt-4 mt-4 space-y-4 border-t">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">
                        {lang == "uz"
                          ? "Mahsulotlar ro'yxati"
                          : lang == "en"
                            ? "Product list"
                            : lang == "ru"
                              ? "Список товаров"
                              : "Mahsulotlar ro'yxati"}
                      </h3>
                      <button
                        onClick={() => toggleProductView(order.id)}
                        className="text-gray-500 cursor-pointer hover:text-gray-700 focus:outline-none"
                        aria-label="Close"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((product) => {
                        const productData = productDetails[order.id]?.[product.product_variant.id]
                        return (
                          <div
                            key={product.product_variant.id}
                            className="flex items-center justify-between p-3 rounded-md bg-gray-50"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={`https://backkk.stroybazan1.uz/${product.product_variant.image}`}
                                width={50}
                                height={50}
                                className="object-contain rounded"
                              />
                              <div>
                                <div className="font-medium">
                                  {productData
                                    ? productData[`name_${lang}`] || productData.name || "Mahsulot nomi"
                                    : lang === "uz"
                                      ? "Yuklanmoqda..."
                                      : lang === "en"
                                        ? "Loading..."
                                        : "Загрузка..."}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {product.quantity} {lang == "uz" ? "dona" : lang == "en" ? "pcs" : "шт."}
                                </div>
                              </div>
                            </div>
                            <div className="font-medium">
                              {product.price} {uzs_lang}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <button
                      onClick={() => toggleProductView(order.id)}
                      className="w-full py-2 text-center text-white transition-colors bg-orange-500 rounded-md cursor-pointer hover:bg-orange-600"
                    >
                      {lang == "uz" ? "Yopish" : lang == "en" ? "Close" : lang == "ru" ? "Закрыть" : "Yopish"}
                    </button>
                  </div>
                )}

                {!expandedOrders.includes(order.id) && (
                  <button
                    onClick={() => toggleProductView(order.id)}
                    className="text-base font-medium text-orange-500 cursor-pointer hover:underline"
                  >
                    {lang == "uz"
                      ? "Maxsulotlarni ko'rsatish"
                      : lang == "en"
                        ? "View products"
                        : lang == "ru"
                          ? "Просмотр товаров"
                          : "Maxsulotlarni ko'rsatish"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders_main
