import instance from "../base";

const region_get = async () => {
  try {
    const response = await instance.get("/api/api/regions/");
    return response.data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

export default region_get;
