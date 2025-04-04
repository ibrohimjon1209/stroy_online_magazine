import "./style.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "./Images/logo_mobile.svg";
import Carusel from "./Carusel";
import { Search, CirclePlus, History, X, Heart } from "lucide-react";
import Download_page from "./Download";

function Home() {
  const inputRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTopics, setSearchTopics] = useState(() => {
    return localStorage.getItem("searchTopics") || [];
  });
  const [likedProducts, setLikedProducts] = useState(() => {
    return localStorage.getItem("likedProducts") || [];
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://back.stroybazan1.uz/api/api/products/?branch=0",
          {
            headers: {
              accept: "application/json",
              "X-CSRFTOKEN": "B8UmaQE4P3RrkjHA8QHRPrl0hvSU4yProbsYerUqficnXhefiWFxkqRVvGVL7Ws5",
            },
          }
        );
        setProducts(response.data || []);
      } catch (error) {
        console.error("API xatosi:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleSearchClick = () => {
    if (searchText) {
      const updatedTopics = [...searchTopics, searchText];
      setSearchTopics(updatedTopics);
      localStorage.setItem("searchTopics", JSON.stringify(updatedTopics));
      setSearchText("");
    }
    setIsSearchOpen((prev) => !prev);
  };

  const handleLikeToggle = (id) => {
    const updatedLikes = likedProducts.includes(id)
      ? likedProducts.filter((item) => item !== id)
      : [...likedProducts, id];
    setLikedProducts(updatedLikes);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
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

      {isSearchOpen && (
        <div className="absolute top-[150px] left-0 h-[91vh] w-full flex justify-center pt-[10px] z-50">
          {searchTopics.map((item, index) => (
            <div key={index} className="cursor-pointer w-full h-[52px] flex justify-between items-center bg-transparent hover:bg-gray-100">
              <div className="flex gap-[15px]">
                <History strokeWidth={1.75} />
                <h1 className="text-black opacity-80">{item}</h1>
              </div>
              <X strokeWidth={1.75} className="cursor-pointer" onClick={() => setIsSearchOpen(false)} />
            </div>
          ))}
        </div>
      )}

      <div className="popular w-full px-[15px] sm:px-[77px] mb-[100px]">
        <h1 className="text-[17px] sm:text-[22px] font-semibold mt-6">Ommabop tavarlar</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] gap-y-[15px]">
          {loading ? (
            <div className="flex justify-center items-center w-full h-[200px]">
              <div className="loader"></div>
            </div>
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="cursor-pointer">
                <Link to={`/product/${product.id}`}>
                  <div className="rounded-[10px] bg-[#F2F2F1] overflow-hidden group">
                    <img
                      src={`https://back.stroybazan1.uz/${product.image}`}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      alt={product.name_uz}
                    />
                  </div>
                  <h1 className="text-black truncate font-semibold text-[14px] sm:text-[16px]">{product.name_uz}</h1>
                  <p className="text-black text-[12px] sm:text-[14px]">
                    {product.variants?.[0]?.price ? `Narxi: ${parseFloat(product.variants[0].price).toFixed(2)} UZS` : "Narxi mavjud emas"}
                  </p>
                </Link>
                <Heart
                  className="w-[16px] sm:w-[25px] text-[#FF0000] cursor-pointer"
                  fill={likedProducts.includes(product.id) ? "#FF0000" : "none"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLikeToggle(product.id);
                  }}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Ma'lumot topilmadi.</p>
          )}
        </div>
      </div>

      <Download_page />
    </div>
  );
}

export default Home;
