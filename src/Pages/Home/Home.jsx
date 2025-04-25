import "./style.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "./Images/logo_mobile.svg";
import Carusel from "./Carusel";
import { Search, CirclePlus, Heart } from "lucide-react";
import Download_page from "./Download";
import { products_get } from "../../Services/products_get";
import create_favorites from "../../Services/favorites/create_favorites";
import delete_favorites from "../../Services/favorites/delete_favorites";

function Home({ lang, setSearchText, searchText }) {
  const inputRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedProducts, setLikedProducts] = useState(() => {
    const savedLikes = localStorage.getItem("likedProducts");
    return savedLikes ? JSON.parse(savedLikes) : [];
  });

  const uzs_lang =
    lang === "uz"
      ? "so'm"
      : lang === "en"
      ? "uzs"
      : lang === "ru"
      ? "сум"
      : "so'm";

  const sl_option_id =
    localStorage.getItem("sl_option_nav") === "Story Baza №1"
      ? 0
      : localStorage.getItem("sl_option_nav") === "Mebel"
      ? 1
      : 2;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await products_get(sl_option_id);
        setProducts(response || []);
        setFilteredProducts(response || []); // initially, no filtering
      } catch (error) {
        console.error("API xatosi:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // Filter products based on searchText
  useEffect(() => {
    if (searchText.trim()) {
      const filtered = products.filter((product) =>
        product[`name_${lang}`]
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
      setLoading(true);
      setTimeout(()=>{
        setFilteredProducts(filtered);
        setLoading(false);
      }, 1000)
    } else {
      setLoading(true);
      setTimeout(()=>{
        setFilteredProducts(products);
        setLoading(false);
      },1000)
    }
  }, [searchText, products, lang]);

  const handleSearchClick = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleLikeToggle = async (productId) => {
    const userId = localStorage.getItem("userId");
    const isLiked = likedProducts.some((fav) => fav.product === productId);
  
    let updatedLikes;
  
    if (!userId) {
      // No userId: Update localStorage with only productId, no API calls
      if (isLiked) {
        updatedLikes = likedProducts.filter((fav) => fav.product !== productId);
      } else {
        updatedLikes = [...likedProducts, { product: productId }];
      }
      localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
      setLikedProducts(updatedLikes);
      return;
    }
  
    // userId exists: Proceed with API calls
    if (isLiked) {
      updatedLikes = likedProducts.filter((fav) => fav.product !== productId);
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
    } else {
      updatedLikes = [
        ...likedProducts,
        { user: parseInt(userId), product: productId },
      ];
      try {
        const newFav = await create_favorites(productId, userId);
        if (!newFav || !newFav.data || !newFav.data.product) {
          console.error("POST xatosi: Yangi like qo'shishda xatolik");
          return;
        }
      } catch (error) {
        console.error("POST xatosi:", error);
        return;
      }
    }
  
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
    setLikedProducts(updatedLikes);
  };

  return (
    <div>
      <div className="w-full h-[150px] flex flex-col items-center bg-[#DCC38B] sm:hidden">
        <img src={logo} className="w-[77px] h-[71px] mt-[10px]" alt="Logo" />
        <div className="w-[90%] h-[40px] pl-[23.5px] bg-[#FFFFFF] rounded-[10px] flex items-center mt-4">
          <Search className="cursor-pointer" onClick={handleSearchClick} />
          <input
            type="text"
            placeholder="Search"
            className="w-full border-none pl-[15px] pr-[20px] focus:outline-none"
            ref={inputRef}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && (
            <CirclePlus
              className="rotate-[45deg] mr-[15px] cursor-pointer"
              strokeWidth={1.75}
              onClick={() => setSearchText("")}
            />
          )}
        </div>
      </div>

      <Carusel />

      <div className="popular w-full px-[15px] sm:px-[77px] mb-[100px]">
        <h1 className="text-[17px] sm:text-[22px] font-semibold mt-3">
          {lang === "uz"
            ? "Ommabop tavarlar"
            : lang === "en"
            ? "Popular products"
            : lang === "ru"
            ? "Популярные товары"
            : "Ommabop tavarlar"}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] gap-y-[20px] mt-3">
          {loading ? (
            <div className="flex justify-center mx-auto items-center scale-[70%] sm:scale-[100%] w-[200%] h-[130px] sm:w-[500%] sm:h-[400px]">
              <div className="loader"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className="cursor-pointer">
                <Link to={`/product/${product.id}`}>
                  <div className="rounded-[10px] w-[160px] h-[160px] sm:w-[245px] sm:h-[245px] bg-[#F2F2F1] overflow-hidden group">
                    <img
                      src={`https://back.stroybazan1.uz/${product.image}`}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      alt={product[`name_${lang}`]}
                    />
                  </div>
                  <div className="flex flex-row items-end w-[165px] sm:w-[245px] justify-between mt-1.5 px-3">
                    <div className="flex flex-col sm:gap-1">
                      <h1 className="text-black truncate font-semibold text-[14px] sm:text-[16px]">
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
                            }: ${parseFloat(product.variants[0].price).toFixed(
                              2
                            )} ${uzs_lang}`
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
                      fill={likedProducts.some((fav) => fav.product === product.id)
                        ? "#FF0000"
                        : "none"}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLikeToggle(product.id);
                      }}
                    />
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              {lang === "uz"
                ? "Ma'lumot topilmadi."
                : lang === "en"
                ? "No data found."
                : lang === "ru"
                ? "Данные не найдены."
                : "Ma'lumot topilmadi."}
            </p>
          )}
        </div>
      </div>

      <Download_page />
    </div>
  );
}

export default Home;
