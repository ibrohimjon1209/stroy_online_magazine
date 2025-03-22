import instance from "../base";

export const login = async (phone_number) => {
  try {
    const response = await instance.post("/api/api/login/phone/", {
      phone_number,
      source: "web"
    });
    return response.data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};
