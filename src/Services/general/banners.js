import instance from "../base";

export const banners_get = async () => {
    try {
        const response = await instance.get("/api/api/banners/");
        return response.data;
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
};
