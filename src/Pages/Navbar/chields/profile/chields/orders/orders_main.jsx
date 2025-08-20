"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, X } from "lucide-react"

const Orders_main_profile = ({ lang }) => {
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

  // --- API functions ---
  const order_get = async (access_token) => {
    try {
      const response = await instance.get("/api/api/orders/my/", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      return response.data
    } catch (err) {
      if (err.response && err.response.status === 401) {
        try {
          const refreshToken = localStorage.getItem("refreshToken")
          const refreshRes = await instance.post("/api/auth/refresh/", { refresh: refreshToken })
          const newToken = refreshRes.data.access
          localStorage.setItem("accessToken", newToken)
          return order_get(newToken)
        } catch (refreshErr) {
          console.error("Token yangilashda xatolik:", refreshErr)
          return null
        }
      } else {
        console.error("Buyurtmalarni olishda xatolik:", err)
        return null
      }
    }
  }

  const get_product = async (id) => {
    try {
      const res = await fetch(`https://backkk.stroybazan1.uz/api/api/products/${id}/`)
      if (!res.ok) throw new Error("Serverda xatolik: " + res.status)
      return await res.json()
    } catch (err) {
      console.error("Mahsulot ma'lumotida xatolik:", err.message)
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

  if (loading) {
    return <div className="flex justify-center items-center w-full h-[200px]"><div className="loader"></div></div>
  }

  return (
    <div className="w-[90%] mx-auto">
      {orders.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          {lang === "uz" ? "Buyurtmalaringiz yo'q" : lang === "en" ? "No orders found" : "Заказы не найдены"}
        </div>
      )}

      {orders.map((order) => (
        <div key={order.id} className="rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-medium">
              {lang == "uz"
                ? `${order.id}-sonli buyurtma`
                : lang == "en"
                  ? `Order № ${order.id}`
                  : `Заказ № ${order.id}`}
            </div>
            <div className={`text-sm font-medium ${
              order.status === "delivered" ? "text-green-500" : "text-amber-500"
            }`}>
              {order.status === "delivered"
                ? lang === "uz" ? "Xaridorga berilgan" : lang === "en" ? "Delivered" : "Выдано покупателю"
                : lang === "uz" ? "Jarayonda" : lang === "en" ? "In progress" : "В процессе"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500 mb-1">{lang == "uz" ? "Yetkazish sanasi" : lang == "en" ? "Delivery date" : "Дата доставки"}</div>
              <div>{new Date(order.delivery_date).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">{lang == "uz" ? "Rasmiylashtirish sanasi" : lang == "en" ? "Order date" : "Дата оформления"}</div>
              <div>{new Date(order.created_at).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="flex justify-between mt-4 text-sm">
            <div>{order.items.length} {lang == "uz" ? "dona maxsulot" : lang == "en" ? "pcs" : "шт."}</div>
            <div className="font-medium">{order.total_amount} {uzs_lang}</div>
          </div>

          {expandedOrders.includes(order.id) && (
            <div className="mt-4 space-y-3 border-t pt-3">
              {order.items.map((product) => {
                const productData = productDetails[order.id]?.[product.product_variant.id]
                return (
                  <div key={product.product_variant.id} className="flex items-center gap-3 bg-gray-50 p-2 rounded">
                    <img
                      src={`https://backkk.stroybazan1.uz/${product.product_variant.image}`}
                      alt={productData?.[`name_${lang}`] || "product"}
                      className="w-10 h-10 object-contain rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{productData ? productData[`name_${lang}`] || productData.name : lang === "uz" ? "Yuklanmoqda..." : lang === "en" ? "Loading..." : "Загрузка..."}</div>
                      <div className="text-xs text-gray-500 mt-1">{product.quantity} {lang === "uz" ? "dona" : lang === "en" ? "pcs" : "шт."}</div>
                    </div>
                    <div className="font-medium">{product.price} {uzs_lang}</div>
                  </div>
                )
              })}
              <button
                onClick={() => toggleProductView(order.id)}
                className="w-full mt-2 py-1 text-sm text-center text-white bg-orange-500 rounded hover:bg-orange-600"
              >
                {lang === "uz" ? "Yopish" : lang === "en" ? "Close" : "Закрыть"}
              </button>
            </div>
          )}

          {!expandedOrders.includes(order.id) && (
            <button
              onClick={() => toggleProductView(order.id)}
              className="w-full mt-3 text-sm text-amber-500 hover:underline"
            >
              {lang === "uz" ? "Maxsulotlarni ko'rsatish" : lang === "en" ? "View products" : "Просмотр товаров"}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default Orders_main_profile
