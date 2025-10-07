"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";
import get_categories from "../../Services/category/get_categories";
import { products_get } from "../../Services/products_get";
import delete_favorites from "../../Services/favorites/delete_favorites";
import create_favorites from "../../Services/favorites/create_favorites";

const Category = ({ searchText }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [notification, setNotification] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const lang = window.localStorage.getItem("lang");
  const [category_data, set_category_data] = useState(null);
  const category_id = useLocation().pathname.split("/")[2];

  const loader_style = {
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #DCC38B",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      animation: "spin 1s linear infinite",
      margin: "0 auto",
    }

  const [likedProducts, setLikedProducts] = useState(() => {
    try {
      const stored = localStorage.getItem("likedProducts");
      return stored && stored !== "undefined" ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error parsing likedProducts from localStorage:", error);
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
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoryData, productsData] = await Promise.all([
          get_categories(category_id),
          products_get(sl_option_id),
        ]);
        set_category_data(categoryData);
        const categoryProducts = productsData.filter(
          (item) => item.category == category_id
        );
        console.log("categoryProducts", categoryProducts);
        setProducts(categoryProducts.filter((item) => item.is_available === true));
        setFilteredProducts(categoryProducts.filter((item) => item.is_available === true));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category_id, sl_option_id]);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product[`name_${lang}`]
          ?.toLowerCase()
          .includes(searchText.toLowerCase())
      );
      setLoading(true);
      setTimeout(() => {
        setFilteredProducts(filtered);
        setLoading(false);
      }, 1000);
    }
  }, [searchText, products, lang]);

  const handleAddToCart = () => {
    setNotification("Mahsulot savatga qo'shildi");
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  const uzs_lang =
    lang === "uz"
      ? "so'm"
      : lang === "en"
      ? "uzs"
      : lang === "ru"
      ? "сум"
      : "so'm";

  const handleLikeToggle = async (productId) => {
    const userId = localStorage.getItem("userId");
    const isLiked = likedProducts.some((fav) => fav.product === productId);

    let updatedLikes;

    if (!userId) {
      if (isLiked) {
        updatedLikes = likedProducts.filter((fav) => fav.product !== productId);
      } else {
        updatedLikes = [...likedProducts, { product: productId }];
      }
      localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
      setLikedProducts(updatedLikes);
      return;
    }

    if (isLiked) {
      updatedLikes = likedProducts.filter((fav) => fav.product !== productId);
      const favorite = likedProducts.find(
        (fav) => fav.product === productId && fav.user.toString() === userId
      );
      if (favorite) {
        try {
          await delete_favorites(favorite.id);
        } catch (error) {
          console.error("DELETE xatosi:", error);
        }
      }
    } else {
      updatedLikes = [
        ...likedProducts,
        { user: Number.parseInt(userId), product: productId },
      ];
      try {
        const newFav = await create_favorites(productId, Number.parseInt(userId));
      } catch (error) {
        console.error("POST xatosi:", error);
        return;
      }
    }

    localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
    setLikedProducts(updatedLikes);
  };

  return (
    <div className="w-full mb-[0px] sm:mb-[100px] flex flex-col items-center">
      <div className="mt-[0px] sm:mt-[50px] flex flex-col w-full sm:w-[1440px] m-auto h-auto sm:px-[77px] mb-[100px] sm:mb-[0]">
        <div className="hidden sm:block">
          <Link className="w-full flex items-center gap-[10px]" to={"/"}>
            <ChevronLeft className="scale-110" />
            <h1 className="font-inter font-[500] text-[32px] leading-[45px] text-black">
              {category_data?.[`name_${lang}`] || (lang == "uz" ? "Yuklanmoqda..." : lang == "en" ? "Loading..." : lang == "ru" ? "Загрузка..." : "Yuklanmoqda...")}
            </h1>
          </Link>
        </div>

        <div className="sticky top-0 z-50 block sm:hidden">
          <div className="w-full h-[65px] bg-[#DCC38B]">
            <Link
              className="w-full h-full flex items-center gap-[10px] pl-[13px]"
              to={"/search"}
            >
              <ChevronLeft className="scale-110" />
              <h1 className="font-inter font-[500] text-[15px] leading-[22px] text-black">
                {category_data?.[`name_${lang}`] || (lang == "uz" ? "Yuklanmoqda..." : lang == "en" ? "Loading..." : lang == "ru" ? "Загрузка..." : "Yuklanmoqda...")}
              </h1>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center mx-auto items-center scale-[70%] sm:scale-[100%] w-[200%] h-[130px] sm:w-[500%] sm:h-[400px]">
                <div style={loader_style}></div>
              </div>
        ) : filteredProducts.length > 0 ? (
          <div className="mt-[20px] px-[15px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] sm:gap-x-[20px] gap-y-[15px] sm:gap-y-[30px]">
            {filteredProducts.map((product, index) => (
              <div key={index} className="cursor-pointer">
                <Link to={`/product/${product.id}`}>
                  <div className="rounded-[10px] w-[160px] h-[160px] sm:w-[245px] sm:h-[245px] bg-[#F2F2F1] overflow-hidden group">
                    <img
                      src={`https://backkk.stroybazan1.uz/${product.image}`}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      alt={product[`name_${lang}`]}
                    />
                  </div>
                  <div className="flex flex-row items-end w-[165px] sm:w-[245px] justify-between mt-1.5 px-3">
                    <div className="flex flex-col sm:gap-1">
                      <h1 className="text-black max-w-[120px] sm:max-w-[180px] truncate font-semibold text-[14px] sm:text-[16px]">
                        {product[`name_${lang}`]}
                      </h1>
                      <p className="text-black text-[12px] sm:text-[14px]">
                        {product.variants?.[0]?.price
                          ? `${
                              lang === "uz"
                                ? "Narxi"
                                : lang === "en"
                                ? "Price"
                                : lang === "ru"
                                ? "Цена"
                                : "Narxi"
                            }: ${Number.parseFloat(
                              product.variants[0].price
                            ).toFixed(2)} ${uzs_lang}`
                          : lang === "uz"
                          ? "Narxi mavjud emas"
                          : lang === "en"
                          ? "Price not available"
                          : lang === "ru"
                          ? "Цена не доступна"
                          : "Narxi mavjud emas"}
                      </p>
                    </div>
                    <Heart
                      className="w-[19px] h-[19px] sm:w-[28px] sm:h-[28px] text-[#FF0000] cursor-pointer mb-0.5"
                      fill={
                        likedProducts.some((fav) => fav.product === product.id)
                          ? "#FF0000"
                          : "none"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        handleLikeToggle(product.id);
                      }}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center mx-auto items-center scale-[70%] sm:scale-[100%] w-[200%] h-[130px] sm:w-[500%] sm:h-[400px]">
            <div style={loader_style}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
