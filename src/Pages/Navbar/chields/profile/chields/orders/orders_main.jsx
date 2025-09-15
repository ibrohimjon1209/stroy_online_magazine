import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, X } from "lucide-react";
import { order_get } from "../../../../../../Services/order/get_my";

const Orders_main_profile = () => {
  const lang = localStorage.getItem("lang");
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [orders, set_orders] = useState([]);
  const [filteredOrders, set_filteredOrders] = useState([]);
  const uzs_lang =
    lang === "uz" ? "so'm" : lang === "en" ? "uzs" : lang === "ru" ? "сум" : "so'm";
  const [loading, setLoading] = useState(true);

  const toggleProductView = (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter((id) => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
      fetchProductsForOrder(orderId);
    }
  };

  const get_product = async (id) => {
    try {
      const res = await fetch(`https://backkk.stroybazan1.uz/api/api/products/${id}/`);
      if (!res.ok) throw new Error("Serverda xatolik: " + res.status);
      return await res.json();
    } catch (err) {
      console.error("Mahsulot ma'lumotida xatolik:", err.message);
    }
  };

  const fetchProductsForOrder = async (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    const productPromises = order.items.map(async (item) => {
      const productData = await get_product(item.product_variant.id);
      return { id: item.product_variant.id, data: productData };
    });

    try {
      const products = await Promise.all(productPromises);
      const productMap = {};
      products.forEach((product) => {
        if (product.data) productMap[product.id] = product.data;
      });
      setProductDetails((prev) => ({ ...prev, [orderId]: productMap }));
    } catch (error) {
      console.error("Mahsulot ma'lumotlarini olishda xatolik:", error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await order_get(localStorage.getItem("accessToken"));
        if (res) {
          set_orders(res);
        }
      } catch (err) {
        console.error("Order olishda xatolik:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!orders) return;
    set_filteredOrders(
      orders.filter(
        (order) => !["ee", "eee", "pending", "in_payment"].includes(order.status)
      )
    );
  }, [orders]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-[200px]">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="w-[70%] mx-auto">
      {filteredOrders.length === 0 ? (
        <div className="mt-10 text-center text-gray-500">
          {lang === "uz"
            ? "Buyurtmalaringiz yo'q"
            : lang === "en"
              ? "No orders found"
              : "Заказы не найдены"}
        </div>
      ) : (
        filteredOrders.map((order) => (
          <div key={order.id} className="p-6 mb-6 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[18px] font-medium">
                {lang === "uz"
                  ? `${order.id}-sonli buyurtma`
                  : lang === "en"
                    ? `Order № ${order.id}`
                    : `Заказ № ${order.id}`}
              </div>
              <div
                className={`px-[15px] py-[6px] rounded-full whitespace-nowrap text-[16px] font-medium
                  ${order.status === "delivered" ? "text-green-700 bg-green-100" : ""}
                  ${order.status === "processing" ? "text-yellow-700 bg-yellow-100" : ""}
                  ${order.status === "shipped" ? "text-blue-700 bg-blue-100" : ""}
                  ${order.status === "cancelled" ? "text-red-700 bg-red-100" : ""}`}
              >
                {order.status === "delivered"
                  ? lang === "uz"
                    ? "Yetkazilgan"
                    : lang === "en"
                      ? "Delivered"
                      : lang === "ru"
                        ? "Доставлен"
                        : "Yetkazilgan"
                  : ""}
                {order.status === "processing"
                  ? lang === "uz"
                    ? "Jarayonda"
                    : lang === "en"
                      ? "In progress"
                      : lang === "ru"
                        ? "В процессе"
                        : "Jarayonda"
                  : ""}
                {order.status === "shipped"
                  ? lang === "uz"
                    ? "Yetkazilmoqda"
                    : lang === "en"
                      ? "Delivering"
                      : lang === "ru"
                        ? "Доставляется"
                        : "Yetkazilmoqda"
                  : ""}
                {order.status === "cancelled"
                  ? lang === "uz"
                    ? "Bekor qilingan"
                    : lang === "en"
                      ? "Cancelled"
                      : lang === "ru"
                        ? "Отменен"
                        : "Bekor qilingan"
                  : ""}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-base">
                <span className="text-gray-600">
                  {lang === "uz"
                    ? "Yaratilgan sanasi"
                    : lang === "en"
                      ? "Created date"
                      : lang === "ru"
                        ? "Дата создания"
                        : "Yaratilgan sanasi"}
                </span>
                <span className="font-medium text-gray-900">
                  {new Date(order.created_at).toLocaleString(
                    lang === "uz" ? "uz-UZ" : lang === "en" ? "en-US" : "ru-RU",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">
                  {lang === "uz"
                    ? "Yetkazib berish manzili"
                    : lang === "en"
                      ? "Delivery address"
                      : lang === "ru"
                        ? "Адрес доставки"
                        : "Yetkazib berish manzili"}
                </span>
                <span className="font-medium text-gray-900">{order.delivery_address}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">
                  {lang === "uz"
                    ? "To'lov usuli"
                    : lang === "en"
                      ? "Payment method"
                      : lang === "ru"
                        ? "Способ оплаты"
                        : "To'lov usuli"}
                </span>
                <span className="font-medium text-gray-900">
                  {order.payment_method === "cash"
                    ? lang === "uz"
                      ? "Naqd"
                      : lang === "en"
                        ? "Cash"
                        : lang === "ru"
                          ? "Наличные"
                          : "Naqd"
                    : order.payment_method === "payme"
                      ? "Payme"
                      : order.payment_method === "click"
                        ? "Click"
                        : order.payment_method === "installments_payment"
                          ? lang === "uz"
                            ? "Nasiya to'lov"
                            : lang === "en"
                              ? "Installment payment"
                              : lang === "ru"
                                ? "Рассрочка"
                                : "Nasiya to'lov"
                          : ""}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">
                  {order.items.length}{" "}
                  {lang === "uz"
                    ? "dona mahsulot"
                    : lang === "en"
                      ? "piece of product"
                      : lang === "ru"
                        ? "штук товара"
                        : "dona mahsulot"}
                </span>
                <span className="font-medium text-gray-900">
                  {order.total_amount} {uzs_lang}
                </span>
              </div>
            </div>

            {expandedOrders.includes(order.id) && (
              <div className="pt-3 mt-4 space-y-3 border-t">
                {order.items.map((product) => {
                  const productData = productDetails[order.id]?.[product.product_variant.id];
                  return (
                    <div
                      key={product.product_variant.id}
                      className="flex items-center gap-3 p-2 rounded bg-gray-50"
                    >
                      <img
                        src={`https://backkk.stroybazan1.uz/${product.product_variant.image}`}
                        alt={productData?.[`name_${lang}`] || "product"}
                        className="object-contain w-10 h-10 rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium">
                          {productData
                            ? productData[`name_${lang}`] || productData.name
                            : lang === "uz"
                              ? "Yuklanmoqda..."
                              : lang === "en"
                                ? "Loading..."
                                : "Загрузка..."}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {product.quantity}{" "}
                          {lang === "uz" ? "dona" : lang === "en" ? "pcs" : "шт."}
                        </div>
                      </div>
                      <div className="font-medium">
                        {product.price} {uzs_lang}
                      </div>
                    </div>
                  );
                })}
                <button
                  onClick={() => toggleProductView(order.id)}
                  className="w-full py-1 mt-2 text-sm text-center text-white bg-orange-500 rounded hover:bg-orange-600"
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
                {lang === "uz"
                  ? "Maxsulotlarni ko'rsatish"
                  : lang === "en"
                    ? "View products"
                    : "Просмотр товаров"}
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders_main_profile;