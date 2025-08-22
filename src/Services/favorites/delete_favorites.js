import instance from "../base";
import { refresh } from "../auth/refresh_access";

const delete_favorites = async (id) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await instance.delete(`/api/api/favorites/${id}/delete/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 400)) {
      console.warn("Access token eskirgan! Yangi token olinmoqda...");

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const newToken = await refresh(refreshToken);

        if (newToken && newToken.access) {
          localStorage.setItem("accessToken", newToken.access);

          // qayta delete so‘rovi
          const retryResponse = await instance.delete(
            `/api/api/favorites/${id}/delete/`,
            {
              headers: {
                Authorization: `Bearer ${newToken.access}`,
              },
            }
          );

          return retryResponse.data;
        } else {
          console.error("Refresh token ham yaroqsiz! User tizimdan chiqariladi.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return null;
        }
      } catch (refreshError) {
        console.error("Token yangilashda xatolik:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return null;
      }
    }

    console.error("Favorites o‘chirishda xatolik:", err.response?.data || err.message);
    throw err;
  }
};

export default delete_favorites;
