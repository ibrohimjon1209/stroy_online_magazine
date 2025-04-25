import instance from "../base";

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
    console.error("Error:", err);
    throw err;
  }
};

export default delete_favorites;
