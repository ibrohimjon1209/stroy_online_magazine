import instance from "../base";

export const register = async (phone_number) => {
  try {
    const response = await instance.post("/api/api/register/", {
      phone_number,
      source: "web"
    });
    return response.data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};
