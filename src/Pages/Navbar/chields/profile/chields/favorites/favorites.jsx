import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Heart } from "lucide-react";

const Favorites_main = ({ lang }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedProducts, setLikedProducts] = useState([]);
  const uzs_lang =
    lang === "uz"
      ? "so'm"
      : lang === "en"
      ? "uzs"
      : lang === "ru"
      ? "сум"
      : "so'm";

  useEffect(() => {
    const storedLikes = localStorage.getItem("likedProducts");
    const likedIds = storedLikes ? JSON.parse(storedLikes) : [];

    setLikedProducts(likedIds);

    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://back.stroybazan1.uz/api/api/products/?branch=0",
          {
            headers: {
              accept: "application/json",
              "X-CSRFTOKEN":
                "B8UmaQE4P3RrkjHA8QHRPrl0hvSU4yProbsYerUqficnXhefiWFxkqRVvGVL7Ws5",
            },
          }
        );

        const likedOnly = response.data.filter((product) =>
          likedIds.includes(product.id)
        );
        setProducts(likedOnly);
      } catch (error) {
        console.error("API xatosi:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleLikeToggle = (id) => {
    // Like bosilgan mahsulotni o'chirish
    const updatedLikes = likedProducts.filter((item) => item !== id);
    setLikedProducts(updatedLikes);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));

    // Mahsulotni ro'yxatdan o'chirish
    setProducts((prevProducts) =>
      prevProducts.filter((product) => updatedLikes.includes(product.id))
    );
  };

  return (
    <div className="w-full sm:mx-15">
      {loading ? (
        <div className="flex justify-center items-center w-full h-[200px]">
          <div className="loader"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="mt-[10px] mb-[40px] w-full flex flex-wrap justify-between sm:gap-x-[40px]">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[150px] h-[235px] sm:h-[280px] cursor-pointer hover:shadow-xs"
            >
              <Link to={`/product/${product.id}`}>
                <div className="w-full h-[150px] sm:h-[150px] aspect-square rounded-[10px] bg-[#F2F2F1] flex justify-center items-center overflow-hidden group">
                  <img
                    src={`https://back.stroybazan1.uz/${product.image}`}
                    className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105"
                    alt={product.name_uz}
                  />
                </div>
              </Link>
              <div className="flex flex-col gap-[8px] sm:gap-[4px] p-2">
                <Link to={`/product/${product.id}`}>
                  <h1 className="font-inter font-[600] text-[11px] sm:text-[15px] text-black truncate">
                    {product[`name_${lang}`]}
                  </h1>
                </Link>
                <div className="flex items-center justify-between gap-3">
                  <Link to={`/product/${product.id}`}>
                    <p className="font-inter whitespace-nowrap font-[500] text-[11px] sm:text-[13px] text-black">
                      {product.variants &&
                      product.variants.length > 0 &&
                      product.variants[0].price
                        ? `${
                            lang === "uz"
                              ? "Narxi"
                              : lang === "en"
                              ? "Price"
                              : lang === "ru"
                              ? "Цена"
                              : "Narxi"
                          }: ${parseFloat(product.variants[0].price).toFixed(
                            2
                          )} ${uzs_lang}`
                        : lang == "uz"
                        ? "Narxi mavjud emas"
                        : lang == "en"
                        ? "Price not found"
                        : lang == "ru"
                        ? "Цена не найдена"
                        : "Narxi mavjud emas"}
                    </p>
                  </Link>

                  <div className="flex items-center mr-2">
                    <Heart
                      className="w-[16px] h-[16px] sm:w-[25px] text-[#FF0000] sm:h-[25px] object-contain cursor-pointer"
                      fill="#FF0000"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLikeToggle(product.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="w-full text-lg text-center text-gray-500 font-inter">
          {lang == "uz"
            ? "Sevimlilar yo'q"
            : lang == "en"
            ? "Favorites not found"
            : lang == "ru"
            ? "Избранное не найдено"
            : "Sevimlilar yo'q"}
        </p>
      )}
    </div>
  );
};

export default Favorites_main;
