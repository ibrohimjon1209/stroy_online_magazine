import { useState, useRef, useEffect } from "react";
import logo1 from "./Images/logo.svg";
import logo2 from "../Enter/Images/photo_1.png";
import logo3 from "../Enter/Images/photo_3.png";
import cube from "./Images/orders.svg";
import cube_a from "./Images/orders_a.svg";
import like from "./Images/like.svg";
import like_a from "./Images/like_a.svg";
import basket_i from "./Images/basket.svg";
import basket_a from "./Images/basket_a.svg";
import profile from "./Images/profile.svg";
import profile_a from "./Images/profile_a.svg";
import vector from "./Images/vector.png";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown,
  CirclePlus,
  History,
  Home,
  Menu,
  Package,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import get_categories from "../../Services/category/get_categories";

const getStoredTopics = () => {
  try {
    return JSON.parse(localStorage.getItem("searchTopics")) || [];
  } catch (error) {
    return [];
  }
};

const Navbar = ({ lang, setSearchText, searchText }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [is_category_open, set_is_category_open] = useState(false);
  const [is_search_open, set_is_search_open] = useState(false);
  const [is_likes_hovered, set_is_likes_hovered] = useState(false);
  const [is_orders_hovered, set_is_orders_hovered] = useState(false);
  const [is_basket_hovered, set_is_basket_hovered] = useState(false);
  const [is_profile_hovered, set_is_profile_hovered] = useState(false);
  const location = useLocation().pathname.split("/")[1];
  const [categoryAnimation, setCategoryAnimation] = useState(false);
  const [searchAnimation, setSearchAnimation] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search_topics, setSearchTopics] = useState(getStoredTopics());
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [basket, set_basket] = useState([]);
  const sl_option_id =
    localStorage.getItem("sl_option_nav") == "Stroy Baza №1"
      ? 0
      : localStorage.getItem("sl_option_nav") == "Giaz Mebel"
        ? 1
        : 2;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await get_categories();
        if (!response) {
          throw new Error("Failed to fetch categories");
        }
        setCategories(
          response.filter((item) => {
            return item.branch == sl_option_id;
          })
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    set_basket(JSON.parse(localStorage.getItem("basket")));
  }, [localStorage.getItem("basket")]);

  const handleDeleteTopic = (index) => {
    const updatedTopics = [...search_topics];
    updatedTopics.splice(index, 1);
    setSearchTopics(updatedTopics);
    localStorage.setItem("searchTopics", JSON.stringify(updatedTopics));
  };

  const handleCategoryClick = () => {
    if (is_category_open) {
      setCategoryAnimation(false);
      setTimeout(() => {
        set_is_category_open(false);
      }, 300);
    } else {
      set_is_category_open(true);
      setTimeout(() => {
        setCategoryAnimation(true);
      }, 10);
      set_is_search_open(false);
      setSearchAnimation(false);
    }
  };

  const handleSearchClick = () => {
    const includes = search_topics.includes(searchText);
    if (is_search_open) {
      setSearchAnimation(false);
      setTimeout(() => {
        set_is_search_open(false);
      }, 300);
    } else {
      if (searchText && !includes) {
        const updatedTopics = [...search_topics, searchText];
        setSearchTopics(updatedTopics);
        localStorage.setItem("searchTopics", JSON.stringify(updatedTopics));
      }
      set_is_search_open(true);
      setTimeout(() => {
        setSearchAnimation(true);
      }, 10);
      set_is_category_open(false);
      setCategoryAnimation(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const clearInput = () => {
    setSearchText("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSelectTopic = (name) => {
    setSearchText(name);
    setSearchAnimation(false);
    setTimeout(() => {
      set_is_search_open(false);
    }, 300);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const points = [
    { name: "Stroy Baza №1", id: 0 },
    { name: "Giaz Mebel", id: 1 },
    { name: "Gold Klinker", id: 2 },
  ];

  const sl_option = localStorage.getItem("sl_option_nav");
  const [selectedOption, setSelectedOption] = useState(
    { name: sl_option } || points[0]
  );

  const handleOptionClick = (option, id) => {
    setSelectedOption(option);
    localStorage.setItem("sl_option_nav", option.name);
    setIsOpen(false);
    window.location.href = "/";
  };

  const handleClickOutside_category = () => {
    setCategoryAnimation(false);
    setTimeout(() => {
      set_is_category_open(false);
    }, 300); // Match this to the animation duration
  };

  const handleClickOutside_search = () => {
    setSearchAnimation(false);
    setTimeout(() => {
      set_is_search_open(false);
    }, 300); // Match this to the animation duration
  };

  const to_home = () => (window.location.href = "/");

  const handleCategoryItemClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
    setCategoryAnimation(false);
    setTimeout(() => {
      set_is_category_open(false);
    }, 300);
  };


  const get_basket_len = () => {
    basket.filter((item) => item.branch_id == sl_option_id)
  }

  return (
    <>
      <div className="hidden sm:block">
        <div className="w-full h-auto md:h-[80px] flex flex-col  md:flex-row justify-between gap-[20px] z-50 items-center px-[4.2%] sticky mt-[5px] rounded-[15px] bg-[#DCC38B] py-4 md:py-0">
          <style jsx="true">{`
            .dropdown-enter {
              opacity: 0;
              transform: translateY(-20px);
              max-height: 0;
              overflow: hidden;
            }

            .dropdown-enter-active {
              opacity: 1;
              transform: translateY(0);
              max-height: 500px;
              transition: opacity 300ms, transform 300ms, max-height 300ms;
            }

            .dropdown-exit {
              opacity: 1;
              transform: translateY(0);
              max-height: 500px;
            }

            .dropdown-exit-active {
              opacity: 0;
              transform: translateY(-20px);
              max-height: 0;
              transition: opacity 300ms, transform 300ms, max-height 300ms;
              overflow: hidden;
            }
          `}</style>

          <div className="flex items-center justify-between w-full md:hidden">
            <div className="flex items-center gap-[5px]">
              <img
                src={
                  sl_option == "Stroy Baza №1"
                    ? logo1
                    : sl_option == "Giaz Mebel"
                      ? logo2
                      : logo3
                }
                alt="Logo"
                className="cursor-pointer w-7 h-7"
                onClick={to_home}
              />
              <h1
                className="font-inter font-[600] text-[16px] cursor-pointer leading-[22px] text-black"
                onClick={to_home}
              >
                {sl_option}
              </h1>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-white md:hidden"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="w-full md:w-[247px] h-full hidden md:flex items-center gap-[5px]">
            <img
              src={
                sl_option == "Stroy Baza №1"
                  ? logo1
                  : sl_option == "Giaz Mebel"
                    ? logo2
                    : logo3
              }
              alt="Logo"
              className="cursor-pointer"
              onClick={to_home}
            />
            {(sl_option === "Stroy Baza №1" || sl_option === "Giaz Mebel") && (
              <h1
                className="font-inter font-[600] text-[20px] cursor-pointer leading-[22px] text-black"
                onClick={to_home}
              >
                {sl_option}
              </h1>
            )}

          </div>

          <div
            className={`${isMobileMenuOpen ? "flex" : "hidden"
              } md:hidden flex-col w-full gap-4 mt-4`}
          >
            <div className="flex items-center justify-between gap-2">
              <div
                onClick={handleCategoryClick}
                className="border-[3px] border-white drop-shadow-xl hover:opacity-75 cursor-pointer w-[100px] h-[40px] bg-transparent flex justify-center items-center rounded-[5px] gap-[5px]"
              >
                <Menu strokeWidth={1.5} color="white" />
                <h1 className="font-inter font-[500] text-[13px] text-white uppercase">
                  Katolog
                </h1>
              </div>

              <div className="relative w-[calc(100%-120px)]">
                <div
                  className={`w-full h-[40px] bg-white ${isOpen ? "rounded-t-[5px]" : "rounded-[5px]"
                    } flex items-center justify-between pl-2 pr-2 cursor-pointer`}
                  onClick={toggleDropdown}
                >
                  <span className="truncate">{selectedOption.name}</span>
                  <ChevronDown
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </div>
                {isOpen && (
                  <div className="absolute top-[100%] left-0 w-full bg-white rounded-b-[5px] shadow-lg transition-all duration-500 z-50">
                    {points.map((option, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleOptionClick(option, option.id)}
                      >
                        {option.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full h-[40px] pl-[23.5px] bg-[#FFFFFF] rounded-[5px] flex items-center">
              <Search className="cursor-pointer" onClick={handleSearchClick} />
              <input
                type="text"
                placeholder={
                  lang == "uz"
                    ? "Qidiruv"
                    : lang == "en"
                      ? "Search"
                      : lang == "ru"
                        ? "Поиск"
                        : "Qidiruv"
                }
                className="w-full placeholder:font-inter placeholder:font-[500] placeholder:text-[15px] placeholder:text-[#737373] border-none pl-[15px] pr-[20px] focus:outline-none focus:ring-0 font-inter font-[500] text-[15px]"
                ref={inputRef}
                value={searchText}
                onClick={handleSearchClick}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText && (
                <CirclePlus
                  className="rotate-[45deg] mr-[15px] cursor-pointer"
                  strokeWidth={1.75}
                  onClick={clearInput}
                />
              )}
            </div>
          </div>

          {/* Desktop search and dropdown section */}
          <div className="w-full md:w-[653px] hidden md:flex gap-[20px]">
            {/* Katalog bo'limi */}
            <div>
              <div
                onClick={handleCategoryClick}
                className="border-[3px] border-white drop-shadow-xl hover:opacity-75 cursor-pointer w-[100px] h-[40px] bg-transparent flex justify-center items-center rounded-[5px] gap-[5px]"
              >
                <Menu strokeWidth={1.5} color="white" />
                <h1 className="font-inter font-[500] text-[13px] text-white uppercase">
                  {
                    lang == "uz"
                      ? "Katalog"
                      : lang == "en"
                        ? "Category"
                        : lang == "ru"
                          ? "Каталог"
                          : "Katalog"
                  }
                </h1>
              </div>

              {is_category_open && (
                <div
                  className="absolute top-[100%] left-0 h-[91vh] w-full flex justify-center pr-[50px] pt-[10px]"
                  onClick={handleClickOutside_category}
                >
                  <div
                    className={`search_modal w-[600px] h-[450px] bg-white border-[1px] overflow-auto border-[#6D5C5CA6] rounded-[5px] shadow-xl transition-all duration-300 ${categoryAnimation
                      ? "dropdown-enter-active"
                      : "dropdown-enter"
                      }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isLoading ? (
                      <div className="w-full h-[100px] flex justify-center items-center">
                        <div className="w-8 h-8 border-4 border-t-4 border-t-[#DCC38B] border-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : categories.length > 0 ? (
                      categories.map((category) => (
                        <div
                          key={category.id}
                          onClick={() => handleCategoryItemClick(category.id)}
                          className="w-full h-[52px] pl-[34px] pr-[43px] flex justify-between items-center bg-transparent hover:bg-gray-100 cursor-pointer"
                        >
                          <h1 className="font-inter font-[500] text-[20px] leading-[22px] text-[#0000008C]">
                            {category[`name_${lang}`]}
                          </h1>
                          <img
                            src={vector || "/placeholder.svg"}
                            className="rotate-[270deg]"
                            alt="arrow"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="w-full h-[100px] flex justify-center items-center">
                        <h1 className="font-inter font-[500] text-[16px] text-gray-500">
                          Kategoriyalar mavjud emas
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="w-[427px] h-[40px] pl-[23.5px] bg-[#FFFFFF] rounded-[5px] flex items-center">
              <Search className="cursor-pointer" onClick={handleSearchClick} />
              <input
                type="text"
                placeholder={
                  lang == "uz"
                    ? "Qidiruv"
                    : lang == "en"
                      ? "Search"
                      : lang == "ru"
                        ? "Поиск"
                        : "Qidiruv"
                }
                className="w-full placeholder:font-inter placeholder:font-[500] placeholder:text-[15px] placeholder:text-[#737373] border-none pl-[15px] pr-[20px] focus:outline-none focus:ring-0 font-inter font-[500] text-[15px]"
                ref={inputRef}
                value={searchText}
                onClick={handleSearchClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchClick();
                  }
                }}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText && (
                <CirclePlus
                  className="rotate-[45deg] mr-[15px] cursor-pointer"
                  strokeWidth={1.75}
                  onClick={clearInput}
                />
              )}
            </div>
            {is_search_open && (
              <div
                className="absolute top-[100%] left-0 h-[91vh] w-full flex justify-center pr-[50px] pt-[10px]"
                onClick={handleClickOutside_search}
              >
                <div
                  className={`search_modal w-[520px] h-fit ml-[160px] bg-white border-[1px] overflow-hidden border-[#6D5C5CA6] rounded-[5px] shadow-xl transition-all duration-300 ${searchAnimation ? "dropdown-enter-active" : "dropdown-enter"
                    }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {search_topics.length > 0 ? (
                    search_topics.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectTopic(item)}
                        className="cursor-pointer w-full h-[52px] pl-[24px] pr-[43px] flex justify-between items-center bg-transparent hover:bg-gray-100"
                      >
                        <div className="flex gap-[15px] cursor-pointer">
                          <History strokeWidth={1.75} />
                          <h1 className="font-inter font-[500] text-[20px] leading-[22px] text-[#0000008C]">
                            {item}
                          </h1>
                        </div>
                        <X
                          strokeWidth={1.75}
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTopic(index);
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="w-full h-[52px] pl-[24px] flex items-center">
                      <h1 className="font-inter font-[500] text-[16px] text-gray-500">
                        {lang == "uz"
                          ? "Qidiruv tarixi bo'm bo'sh"
                          : lang == "en"
                            ? "Search history is empty"
                            : lang == "ru"
                              ? "История поиска пуста"
                              : "Qidiruv tarixi bo'm bo'sh"}
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="relative w-[206px]">
              <div
                className={`w-full h-[40px] bg-white ${isOpen ? "rounded-t-[5px]" : "rounded-[5px]"
                  } flex items-center justify-between pl-2 pr-2 cursor-pointer`}
                onClick={toggleDropdown}
              >
                <span>{selectedOption.name}</span>
                <ChevronDown
                  className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                    }`}
                />
              </div>
              {isOpen && (
                <div className="absolute top-[100%] left-0 w-full bg-white rounded-b-[5px] shadow-lg transition-all duration-500 z-50">
                  {points.map((option, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="icons w-full md:w-[242px] h-[40px] hidden md:flex items-center justify-start gap-[48px]">
            <Link to="/likes">
              <img
                className="object-contain transition-shadow duration-100 hover:drop-shadow-md hover:shadow-xl"
                src={location == "likes" || is_likes_hovered ? like_a : like}
                onMouseEnter={() => set_is_likes_hovered(true)}
                onMouseLeave={() => set_is_likes_hovered(false)}
                alt="likes"
              />
            </Link>
            <Link to="/orders">
              <div className="relative">
                <img
                  className="object-contain transition-shadow duration-100 hover:drop-shadow-md hover:shadow-xl"
                  src={
                    location == "orders" || is_orders_hovered ? cube_a : cube
                  }
                  onMouseEnter={() => set_is_orders_hovered(true)}
                  onMouseLeave={() => set_is_orders_hovered(false)}
                  alt="orders"
                />
                {localStorage.getItem("order_created") == "true" && (
                  <span className="absolute flex items-center justify-center w-4.5 h-4.5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                    1
                  </span>
                )}
              </div>
            </Link>
            <Link to="/basket">
              <div className="relative">
                <img
                  className="object-contain transition-shadow duration-100 hover:drop-shadow-md hover:shadow-xl"
                  src={
                    location == "basket" || is_basket_hovered
                      ? basket_a
                      : basket_i
                  }
                  onMouseEnter={() => set_is_basket_hovered(true)}
                  onMouseLeave={() => set_is_basket_hovered(false)}
                  alt="basket"
                />
                {get_basket_len()?.length > 0 && (
                  <span className="absolute flex items-center justify-center w-4.5 h-4.5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                    {get_basket_len()}
                  </span>)}
              </div>
            </Link>

            <Link to="/profile/orders">
              <img
                className="object-contain transition-shadow duration-100 hover:drop-shadow-md hover:shadow-xl"
                src={
                  location == "profile" || is_profile_hovered
                    ? profile_a
                    : profile
                }
                onMouseEnter={() => set_is_profile_hovered(true)}
                onMouseLeave={() => set_is_profile_hovered(false)}
                alt="profile"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed -bottom-[calc(2vh-10px)] left-0 right-0 bg-[#BEA086] flex justify-around items-center h-[85px] z-50 rounded-t-[15px]">
        <Link to="/" className="flex flex-col items-center justify-center">
          <Home
            size={28}
            strokeWidth={2}
            color={location === "" ? "#ffffff" : "#DFCFC2"}
          />
        </Link>
        <Link
          to="/search"
          className="flex flex-col items-center justify-center"
        >
          <Search
            size={28}
            strokeWidth={2}
            color={location === "search" ? "#ffffff" : "#DFCFC2"}
          />
        </Link>
        <Link
          to="/orders"
          className="flex flex-col items-center justify-center"
        >
          <Package
            size={28}
            strokeWidth={2}
            color={location === "orders" ? "#ffffff" : "#DFCFC2"}
          />
        </Link>
        <Link
          to="/basket"
          className="flex flex-col items-center justify-center"
        >
          <ShoppingCart
            size={28}
            strokeWidth={2}
            color={location === "basket" ? "#ffffff" : "#DFCFC2"}
          />
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center justify-center"
        >
          <User
            size={28}
            strokeWidth={2}
            color={location === "profile" ? "#ffffff" : "#DFCFC2"}
          />
        </Link>
      </div>
      <div className="md:hid  den h-[0px]"></div>
    </>
  );
};

export default Navbar;
