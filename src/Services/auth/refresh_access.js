import instance from "../base";

export const refresh = async (refresh) => {
  try {
    const response = await instance.post("/api/api/token/refresh/", {
      refresh
    });
    return response.data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};
