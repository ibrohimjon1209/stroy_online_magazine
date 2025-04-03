import instance from "../base";

const city_get = async () => {
  try {
    const response = await instance.get("/api/api/cities/");
    return response.data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

export default city_get;
