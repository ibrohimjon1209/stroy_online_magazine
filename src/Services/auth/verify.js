import instance from "../base";

export const verify = async (phone_number, verification_code, method) => {
  try {
    const response = await instance.post(`${method == "register" ? "/api/api/verify/" : "/api/api/login/phone/verify/"}`, {
      phone_number,
      verification_code
    });
    return response.data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};