import instance from "../base";

const get_favorites = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await instance.get("/api/api/favorites/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error:", err);
  }
};

export default get_favorites;
