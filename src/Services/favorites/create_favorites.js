import instance from "../base";

const create_favorites = async (productId, userId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await instance.post("/api/api/favorites/create/", {
      product: productId,
      user: userId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    throw err;
  }
};

export default create_favorites;
