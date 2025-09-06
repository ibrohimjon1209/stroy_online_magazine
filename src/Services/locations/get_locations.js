import instance from "../base";

const get_locations = async () => {
    try {
        const response = await instance.get("/api/branches/");
        return response.data;
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
};

export default get_locations;