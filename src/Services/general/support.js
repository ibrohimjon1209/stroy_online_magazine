import instance from "../base";

export const support_get = async () => {
    try {
        const response = await instance.get("/api/supports/");
        return response.data;
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
};
