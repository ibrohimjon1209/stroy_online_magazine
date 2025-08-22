import instance from "../base";
import { refresh } from "../auth/refresh_access";

const create_favorites = async (productId, userId) => {
  try {
    let token = localStorage.getItem("accessToken");

    const response = await instance.post(
      "/api/api/favorites/create/",
      {
        product: productId,
        user: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    // Agar token eskirgan bo'lsa
    if (err.response && err.response.status === 401) {
      console.warn("Access token eskirgan! Yangi token olinmoqda...");

      try {
        const newToken = await refresh(localStorage.getItem("refreshToken"));

        if (newToken && newToken.access) {
          localStorage.setItem("accessToken", newToken.access);

          // Yangilangan token bilan qayta urinish
          const retryResponse = await instance.post(
            "/api/api/favorites/create/",
            {
              product: productId,
              user: userId,
            },
            {
              headers: {
                Authorization: `Bearer ${newToken.access}`,
                "Content-Type": "application/json",
              },
            }
          );

          return retryResponse.data;
        } else {
          console.error("Yangi token olinmadi, foydalanuvchi tizimdan chiqarildi.");
          return null;
        }
      } catch (refreshError) {
        console.error("Token yangilashda xatolik:", refreshError);
        return null;
      }
    }

    // Agar boshqa xato bo'lsa
    console.error("Error:", err.response?.data || err.message);
    throw err;
  }
};

export default create_favorites;
