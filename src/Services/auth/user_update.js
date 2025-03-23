import instance from "../base";
import { refresh } from "./refresh_access";

export const update_user = async (first_name, last_name, id, access_token) => {
  try {
    const response = await instance.put(`/api/api/users/${id}/update/`, { first_name, last_name }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      console.warn("Access token eskirgan! Yangi token olinmoqda...");
      try {
        const newToken = await refresh(localStorage.getItem("refreshToken"));

        if (newToken && newToken.access) {
          localStorage.setItem("accessToken", newToken.access);
          return update_user(first_name, last_name, id, newToken.access);
        } else {
          console.error("Yangi token olinmadi, foydalanuvchi tizimdan chiqarildi.");
          return null;
        }
      } catch (refreshError) {
        console.error("Token yangilashda xatolik:", refreshError);
        return null;
      }
    } else {
      console.error("Foydalanuvchi ma'lumotlarini yangilashda xatolik:", err);
      return null;
    }
  }
};
