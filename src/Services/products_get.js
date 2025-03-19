import instance from "./base";

export const products_get = async () => {
    try {
        const response = await instance.get("/api/products/");
        if (response.status == "ok") {
            return response.data
        }
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
};
