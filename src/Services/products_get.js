import instance from "./base";

export const products_get = async (branch) => {
  try {
    const response = await instance.get(`/api/api/products/?branch=${branch}`, {
      headers: {
        accept: "application/json",
        "X-CSRFTOKEN":
          "B8UmaQE4P3RrkjHA8QHRPrl0hvSU4yProbsYerUqficnXhefiWFxkqRVvGVL7Ws5",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error:", err);
  }
};
