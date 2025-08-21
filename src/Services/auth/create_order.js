import instance from "../base";
import { refresh } from "./refresh_access";

export const order_create = async (
  access_token,
  {
    basket,
    address_inform,
    selectedMethod,
    cashback_is_using,
    sl_option_id,
    deliver_type,
  }
) => {
  try {
    const response = await instance.post(
      "/api/api/order/create/",
      {
        cart_items: basket
          .filter((item) => item.selected)
          .map((item) => ({
            variant_id: item.variant_id,
            quantity: item.quantity,
            product_id: item.id,
          })),
        delivery_address: address_inform.address_uz,
        payment_method:
          selectedMethod === "click"
            ? "click"
            : selectedMethod === "payme"
            ? "payme"
            : selectedMethod === "qabul"
            ? "cash"
            : null,
        use_cashback: cashback_is_using,
        branch_id: address_inform?.id || null,
        part: sl_option_id,
        status: "pending",
        delivery_method: deliver_type,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    // agar access token muddati o'tgan bo'lsa
    if (err.response && err.response.status === 401) {
      console.warn("Access token eskirgan! Yangi token olinmoqda...");
      try {
        const newToken = await refresh(localStorage.getItem("refreshToken"));
        if (newToken && newToken.access) {
          localStorage.setItem("accessToken", newToken.access);
          return order_create(newToken.access, {
            basket,
            address_inform,
            selectedMethod,
            cashback_is_using,
            sl_option_id,
            deliver_type,
          });
        } else {
          console.error(
            "Yangi token olinmadi, foydalanuvchi tizimdan chiqarildi."
          );
          return null;
        }
      } catch (refreshError) {
        console.error("Token yangilashda xatolik:", refreshError);
        return null;
      }
    } else {
      console.error("Buyurtma yaratishda xatolik:", err);
      return null;
    }
  }
};
