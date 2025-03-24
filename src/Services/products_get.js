import instance from "./base";

export const products_get = async () => {
    try {
        const response = await instance.get("/api/api/products/?branch=0");
        return response.data;
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
};
