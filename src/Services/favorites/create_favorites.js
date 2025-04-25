import instance from "../base";

const create_favorites = async (product, user) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await instance.post("/api/api/favorites/create/", {
      product,
      user,
    }, {
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

export default create_favorites;
