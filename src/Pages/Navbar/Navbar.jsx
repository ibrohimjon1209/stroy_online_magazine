import React, { useState, useRef } from "react";
import logo from "./Images/logo.png";
import cube from "./Images/orders.svg";
import cube_a from "./Images/orders_a.svg";
import like from "./Images/like.svg";
import like_a from "./Images/like_a.svg";
import basket from "./Images/basket.svg";
import basket_a from "./Images/basket_a.svg";
import profile from "./Images/profile.svg";
import profile_a from "./Images/profile_a.svg";
import vector from "./Images/vector.png";
import { Link } from "react-router";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, CirclePlus, History, Menu, Search, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [is_category_open, set_is_category_open] = useState(false);
  const [is_search_open, set_is_search_open] = useState(false);
  const [is_likes_hovered, set_is_likes_hovered] = useState(false);
  const [is_orders_hovered, set_is_orders_hovered] = useState(false);
  const [is_basket_hovered, set_is_basket_hovered] = useState(false);
  const [is_profile_hovered, set_is_profile_hovered] = useState(false);
  const [active, set_active] = useState("");

  const [searchText, setSearchText] = useState("");

  const handleCategoryClick = () => {
    set_is_category_open(true);
    set_is_search_open(false);
  };

  const handleSearchClick = () => {
    set_is_search_open(true);
    set_is_category_open(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clearInput = () => {
    setSearchText("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Qidiruv modali tavsiyalaridan birini tanlash funksiyasi
  const handleSelectTopic = (name) => {
    setSearchText(name);
    set_is_search_open(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const category_topics = [
    { name: "Penopleks" },
    { name: "Teplesk" },
    { name: "Kley" },
    { name: "Oboy va kraskalar" },
    { name: "Bazalt" },
    { name: "Steklovata" },
    { name: "Kanauf" },
    { name: "Kanauf" },
  ];

  const search_topics = [
    { name: "Olma" },
    { name: "Behi" },
    { name: "Anor" },
    { name: "Ko'ylak" },
    { name: "Bazalt" },
  ];

  const points = [
    { name: "Stroy Baza №1" },
    { name: "Mebel" },
    { name: "Golden house" },
  ];

  const [selectedOption, setSelectedOption] = useState(points[0]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside_category = () => {
    set_is_category_open(false);
  };

  const handleClickOutside_search = () => {
    set_is_search_open(false);
  };

  const to_home = () => navigate("/");

  return (
    <div className="w-full h-[80px] flex justify-between gap-[20px] z-50 items-center px-[4.2%] fixed top-2 rounded-[15px] bg-[#DCC38B]">
      {/* Logo va bosh sahifaga yo'naltirish */}
      <div className="-[247px] h-full flex items-center gap-[5px]">
        <img src={logo} alt="Logo" className="cursor-pointer" onClick={to_home} />
        <h1 className="font-inter font-[600] text-[20px] cursor-pointer leading-[22px] text-black" onClick={to_home}>
          STROY BAZA №1
        </h1>
      </div>

      <div className="w-[653px] flex gap-[20px]">
        {/* Katalog bo'limi */}
        <div>
          <div
            onClick={handleCategoryClick}
            className="border-[3px] border-white drop-shadow-xl hover:opacity-75 cursor-pointer w-[100px] h-[40px] bg-transparent flex justify-center items-center rounded-[5px] gap-[5px]"
          >
            <Menu strokeWidth={1.50} color="white" />
            <h1 className="font-inter font-[500] text-[13px] text-white uppercase">Katolog</h1>
          </div>

          {is_category_open && (
            <div
              className="absolute top-[100%] left-0 h-[91vh] w-full flex justify-center pr-[50px] pt-[10px]"
              onClick={handleClickOutside_category}
            >
              <div className="search_modal w-[600px] h-[450px] bg-white border-[1px] overflow-hidden border-[#6D5C5CA6] rounded-[5px] shadow-xl">
                {category_topics.map((item, index) => (
                  <Link to={"/category"}>
                    <div key={index} className="w-full h-[52px] pl-[34px] pr-[43px] flex justify-between items-center bg-transparent hover:bg-gray-100">
                      <h1 className="font-inter font-[500] text-[20px] leading-[22px] text-[#0000008C]">
                        {item.name}
                      </h1>
                      <img src={vector} className="rotate-[270deg]" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Qidiruv bo'limi */}
        <div className="w-[427px] h-[40px] pl-[23.5px] bg-[#FFFFFF] rounded-[5px] flex items-center">
          <Search className="cursor-pointer" onClick={handleSearchClick} />
          <input
            type="text"
            placeholder="Search"
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

        {is_search_open && (
          <div
            className="absolute top-[100%] left-0 h-[91vh] w-full flex justify-center pr-[50px] pt-[10px]"
            onClick={handleClickOutside_search}
          >
            <div
              className="search_modal transition-transform duration-300 w-[520px] h-fit ml-[160px] bg-white border-[1px] overflow-hidden border-[#6D5C5CA6] rounded-[5px] shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {search_topics.map((item, index) => (
                <div key={index} onClick={() => handleSelectTopic(item.name)} className="cursor-pointer w-full h-[52px] pl-[24px] pr-[43px] flex justify-between items-center bg-transparent hover:bg-gray-100">
                  <div className="flex gap-[15px] cursor-pointer" >
                    <History strokeWidth={1.75} />
                    <h1 className="font-inter font-[500] text-[20px] leading-[22px] text-[#0000008C]">
                      {item.name}
                    </h1>
                  </div>
                  <X strokeWidth={1.75} className="cursor-pointer" onClick={() => set_is_search_open(false)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dropdown tanlov bo'limi */}
        <div className="relative w-[206px]">
          <div
            className={`w-full h-[40px] bg-white ${isOpen ? "rounded-t-[5px]" : "rounded-[5px]"} flex items-center justify-between pl-2 pr-2 cursor-pointer`}
            onClick={toggleDropdown}
          >
            <span>{selectedOption.name}</span>
            <ChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          </div>
          {isOpen && (
            <div className="absolute top-[100%] left-0 w-full bg-white rounded-b-[5px] shadow-lg transition-all duration-500">
              {points.map((option, index) => (
                <div
                  key={index}
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Iconlar bo'limi */}
      <div className="w-[242px] h-[40px] flex items-center gap-[48px]">
        <Link to="/likes">
          <img
            className="hover:drop-shadow-md hover:shadow-xl transition-shadow duration-100 object-contain"
            src={active === "likes" || is_likes_hovered ? like_a : like}
            onClick={() => set_active("likes")}
            onMouseEnter={() => set_is_likes_hovered(true)}
            onMouseLeave={() => set_is_likes_hovered(false)}
            alt="likes"
          />
        </Link>
        <Link to="/orders">
          <img
            className="hover:drop-shadow-md hover:shadow-xl transition-shadow duration-100 object-contain"
            src={active === "orders" || is_orders_hovered ? cube_a : cube}
            onClick={() => set_active("orders")}
            onMouseEnter={() => set_is_orders_hovered(true)}
            onMouseLeave={() => set_is_orders_hovered(false)}
            alt="orders"
          />
        </Link>
        <Link to="/basket">
          <img
            className="hover:drop-shadow-md hover:shadow-xl transition-shadow duration-100 object-contain"
            src={active === "basket" || is_basket_hovered ? basket_a : basket}
            onClick={() => set_active("basket")}
            onMouseEnter={() => set_is_basket_hovered(true)}
            onMouseLeave={() => set_is_basket_hovered(false)}
            alt="basket"
          />
        </Link>
        <Link to="/profile/orders">
          <img
            className="hover:drop-shadow-md hover:shadow-xl transition-shadow duration-100 object-contain"
            src={active === "profile" || is_profile_hovered ? profile_a : profile}
            onClick={() => set_active("profile")}
            onMouseEnter={() => set_is_profile_hovered(true)}
            onMouseLeave={() => set_is_profile_hovered(false)}
            alt="profile"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
