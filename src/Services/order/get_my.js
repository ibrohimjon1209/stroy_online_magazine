import instance from "../base";
import { refresh } from "../auth/refresh_access";

export const order_get = async (access_token) => {
  try {
    const response = await instance.get('/api/api/orders/my/', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
          console.warn("Access token eskirgan! Yangi token olinmoqda...");
          try {
            const newToken = await refresh(localStorage.getItem("refreshToken"));
            if (newToken && newToken.access) {
              localStorage.setItem("accessToken", newToken.access);
              return order_get(newToken.access);
            } else {
              console.error("Yangi token olinmadi, foydalanuvchi tizimdan chiqarildi.");
              return null;
            }
          } catch (refreshError) {
            console.error("Token yangilashda xatolik:", refreshError);
            return null;
          }
        } else {
          console.error("Foydalanuvchi buyurtmalarining ma'lumotlarini olishda xatolik:", err);
          return null;
        }
  }
};
