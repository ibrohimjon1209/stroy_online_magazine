import instance from "../base";
import { refresh } from "./refresh_access";

export const get_user = async (id, access_token, setUserSignIn) => {
  try {
    const response = await instance.get(`/api/api/users/${id}`, {
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
          return get_user(id, newToken.access, setUserSignIn);
        } else {
          console.error("Yangi token olinmadi, foydalanuvchi tizimdan chiqarildi.");
          setUserSignIn(false);
          return null;
        }
      } catch (refreshError) {
        console.error("Token yangilashda xatolik:", refreshError);
        setUserSignIn(false);
        return null;
      }
    } else {
      console.error("Foydalanuvchi ma'lumotlarini olishda xatolik:", err);
      return null;
    }
  }
};
