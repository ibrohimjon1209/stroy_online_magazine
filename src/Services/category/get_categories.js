import instance from "../base";

const get_categories = async (id) => {
    try {
        const response = await instance.get(`/api/api/categories/${id ? id : ""}`);
        return response.data;
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
};

export default get_categories;