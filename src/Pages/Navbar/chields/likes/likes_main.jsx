import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Likes_main = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedProducts, setLikedProducts] = useState(
    localStorage.getItem("likedProducts") || []
  );

  useEffect(() => {
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
  
        const storedLikes = JSON.parse(localStorage.getItem("likedProducts")) || [];
        const filteredProducts = (response.data || []).filter(product =>
          storedLikes.includes(product.id)
        );
  
        setProducts(filteredProducts);
        setLikedProducts(storedLikes); // LocalStorage bilan sinxronlash
      } catch (error) {
        console.error("API xatosi:", error);
      } finally {
        setLoading(false);
      }
    };
  
    getProducts();
  }, []);
  
  
  const handleLikeToggle = (id) => {
    const updatedLikes = likedProducts.includes(id)
      ? likedProducts.filter((item) => item !== id)
      : [...likedProducts, id];
  
    setLikedProducts(updatedLikes);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
  
    // Unlike qilinganda mahsulot ro'yxatdan o'chishi uchun
    setProducts(prevProducts =>
      updatedLikes.includes(id) ? prevProducts : prevProducts.filter(p => p.id !== id)
    );
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
                      className="transition-transform duration-300 transform group-hover:scale-105 w-full h-full object-contain"
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
                  <div className="flex justify-between items-center">
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
                        fill={
                          likedProducts.includes(product.id)
                            ? "#FF0000"
                            : "none"
                        }
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
            <p className="text-center w-full font-inter text-lg text-gray-500">
              Sevimli mahsulotlar yo'q.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Likes_main;