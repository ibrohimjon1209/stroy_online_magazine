import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { products_get } from "../../../../Services/products_get";
import delete_favorites from "../../../../Services/favorites/delete_favorites";

const Likes_main = ({ lang }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedProducts, setLikedProducts] = useState(() => {
    try {
      const stored = localStorage.getItem("likedProducts");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Could not parse likedProducts from localStorage:", e);
      return [];
    }
  });

  const sl_option_id =
    localStorage.getItem("sl_option_nav") === "Stroy Baza №1"
      ? 0
      : localStorage.getItem("sl_option_nav") === "Giaz Mebel"
        ? 1
        : 2;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await products_get(sl_option_id);
        // Filter response to include only products in likedProducts
        const filteredProducts = response.filter((item) =>
          likedProducts.some((liked) => liked.product === item.id)
        );
        // Mark all filtered products as liked
        filteredProducts.forEach((item) => {
          item.liked = true;
        });
        setProducts(filteredProducts || []);
      } catch (error) {
        console.error("API xatosi:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleLikeToggle = async (productId) => {
    const userId = localStorage.getItem("userId");
    const updatedLikes = likedProducts.filter((fav) => fav.product !== productId);

    if (!userId) {
      // No userId: Update localStorage, remove from products, no API calls
      localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
      setLikedProducts(updatedLikes);
      setProducts(products.filter((product) => product.id !== productId));
      return;
    }

    // userId exists: Call delete_favorites and update state
    const favorite = likedProducts.find(
      (fav) => fav.product === productId && fav.user.toString() === userId
    );
    if (favorite) {
      try {
        await delete_favorites(favorite.id); // DELETE request
      } catch (error) {
        console.error("DELETE xatosi:", error);
      }
    }

    // Update localStorage and state
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
    setLikedProducts(updatedLikes);
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="w-full mx-3">
      <div className="mt-[40px] mb-[20px] w-full mx-auto flex flex-wrap gap-x-[40px]">
        <div className="mt-[20px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] sm:gap-x-[20px] gap-y-[15px] sm:gap-y-[30px]">
          {loading ? (
            <div className="flex justify-center items-center w-full h-[200px]">
              <div className="loader"></div>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="w-full cursor-pointer hover:shadow-sm rounded-[10px] bg-white"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="w-full aspect-square rounded-[10px] bg-[#F2F2F1] flex justify-center items-center overflow-hidden group">
                    <img
                      src={`https://back.stroybazan1.uz/${product.image}`}
                      className="object-contain w-full h-full transition-transform duration-300 transform group-hover:scale-105"
                      alt={product.name_uz}
                    />
                  </div>
                </Link>
                <div className="flex flex-col gap-[8px] sm:gap-[16px] p-2">
                  <Link to={`/product/${product.id}`}>
                    <h1 className="font-inter font-[600] text-[12px] sm:text-[16px] text-black truncate">
                      {product.name_uz}
                    </h1>
                  </Link>
                  <div className="flex items-center justify-between">
                    <Link to={`/product/${product.id}`}>
                      <p className="font-inter font-[500] text-[12px] sm:text-[14px] text-black">
                        {product.variants &&
                          product.variants.length > 0 &&
                          product.variants[0].price
                          ? `Narxi: ${parseFloat(
                            product.variants[0].price
                          ).toFixed(2)} UZS`
                          : "Narxi mavjud emas"}
                      </p>
                    </Link>
                    <div className="flex items-center mr-2">
                      <Heart
                        className="w-[16px] h-[16px] sm:w-[25px] text-[#FF0000] sm:h-[25px] object-contain cursor-pointer"
                        fill="#FF0000" // Always filled since all products are liked
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
            ))
          ) : (
            <p className="w-full text-lg text-center text-gray-500 font-inter">
              {lang === "uz"
                ? "Sevimlilar yo'q"
                : lang === "en"
                  ? "Favorites not found"
                  : lang === "ru"
                    ? "Избранное не найдено"
                    : "Sevimlilar yo'q"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Likes_main;
