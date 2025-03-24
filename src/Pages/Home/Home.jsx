"use client";
import './style.css'
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "./Images/logo_mobile.svg";
import Carusel from "./Carusel";
import { Search, CirclePlus, History, X } from "lucide-react";
import cart_icon from "./Images/cart_icon.svg";
import like_icon from "./Images/like_icon.svg";
import liked_icon from "./Images/liked_icon.svg";
import Download_page from "./Download";

function Home() {
    const inputRef = useRef(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchAnimation, setSearchAnimation] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get("https://back.stroybazan1.uz/api/api/products/?branch=0", {
                    headers: {
                        "accept": "application/json",
                        "X-CSRFTOKEN": "B8UmaQE4P3RrkjHA8QHRPrl0hvSU4yProbsYerUqficnXhefiWFxkqRVvGVL7Ws5"
                    }
                });

                console.log("API-dan kelgan ma'lumot:", response.data);
                setProducts(response.data || []);
            } catch (error) {
                console.error("API xatosi:", error);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    const handleAddToCart = () => {
        setNotification("Mahsulot savatga qo'shildi");
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 500000);
    };

    const handleLikeToggle = (id) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, liked: !product.liked } : product
            )
        );
    };

    const handleSearchClick = () => {
        if (isSearchOpen) {
            setSearchAnimation(false);
            setTimeout(() => setIsSearchOpen(false), 300);
        } else {
            setIsSearchOpen(true);
            setTimeout(() => setSearchAnimation(true), 10);
            inputRef.current?.focus();
        }
    };

    const clearInput = () => {
        setSearchText("");
        inputRef.current?.focus();
    };

    const handleClickOutsideSearch = () => {
        setSearchAnimation(false);
        setTimeout(() => setIsSearchOpen(false), 300);
    };

    const searchTopics = [{ name: "Olma" }, { name: "Behi" }, { name: "Anor" }, { name: "Ko'ylak" }, { name: "Bazalt" }];

    return (
        <div>
            <div className="w-full h-[150px] flex flex-col items-center bg-[#DCC38B] block sm:hidden">
                <img src={logo} className="w-[77px] h-[71px] mt-[10px]" />
                <div className="w-[90%] h-[40px] pl-[23.5px] bg-[#FFFFFF] rounded-[10px] flex items-center mt-4">
                    <Search className="cursor-pointer" onClick={handleSearchClick} />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full placeholder:font-inter placeholder:font-[500] placeholder:text-[15px] placeholder:text-[#737373] border-none pl-[15px] pr-[20px] focus:outline-none"
                        ref={inputRef}
                        value={searchText}
                        onClick={handleSearchClick}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    {searchText && (
                        <CirclePlus className="rotate-[45deg] mr-[15px] cursor-pointer" strokeWidth={1.75} onClick={clearInput} />
                    )}
                </div>
            </div>

<<<<<<< HEAD
            <div className="hidden sm:block">
=======
            <div className="px-[22px] w-full h-[90px] flex block sm:hidden justify-center items-center">
                <div className="w-full h-[50px] bg-white border-[0.5px] border-[#8879798C] rounded-[10px] flex items-center justify-evenly">
                    <h1 className="font-inter font-[500] text-[15px] leading-[22px] text-[#DA9700]">Stroy Baza №1</h1>
                    <h1 className="font-inter font-[500] text-[15px] leading-[22px] text-black">Mebel</h1>
                    <h1 className="font-inter font-[500] text-[15px] leading-[22px] text-black">Gold Klinker</h1>
                </div>
            </div>

            {/* <div className="flex block sm:hidden justify-center items-center w-full h-[184px] bg-[#F9C527]">
                <h1>Carusel</h1>
            </div> */}

            <div className="block">
>>>>>>> 8b7b6e17b58ed5b4f8a59aaa465a64e14b8e2575
                <Carusel />
            </div>

            {isSearchOpen && (
                <div
                    className="absolute top-[150px] sm:top-[80px] left-0 h-[91vh] w-full flex justify-center pt-[10px] z-50"
                    onClick={handleClickOutsideSearch}
                >
                    <div
                        className={`search_modal w-[90%] sm:w-[520px] bg-white border-[1px] border-[#6D5C5CA6] rounded-[10px] shadow-xl transition-all duration-300 ${searchAnimation ? "dropdown-enter-active" : "dropdown-enter"
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {searchTopics.map((item, index) => (
                            <div key={index} className="cursor-pointer w-full h-[52px] flex justify-between items-center bg-transparent hover:bg-gray-100">
                                <div className="flex gap-[15px]">
                                    <History strokeWidth={1.75} />
                                    <h1 className="font-inter font-[500] text-[20px] text-[#0000008C]">{item.name}</h1>
                                </div>
                                <X strokeWidth={1.75} className="cursor-pointer" onClick={handleClickOutsideSearch} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="block">
                <div className="popular flex flex-col  w-full sm:w-[1440px] m-auto min-h-[80vh] px-[15px] sm:px-[77px] mb-[100px] sm:mb-[0]">
                    <h1 className="font-inter font-[600] text-[17px] sm:text-[22px] text-black mt-6">Ommabop tavarlar</h1>

                    <div className="mt-[20px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] sm:gap-x-[20px] gap-y-[15px] sm:gap-y-[30px]">
                        {loading ? (
                            <div className="flex justify-center items-center w-full h-[200px]">
                                <div className="loader"></div>
                            </div>
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="w-full cursor-pointer hover:shadow-sm rounded-[10px] bg-white">
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
                                                    {product.variants && product.variants.length > 0 && product.variants[0].price
                                                        ? `Narxi: ${parseFloat(product.variants[0].price).toFixed(2)} UZS`
                                                        : "Narxi mavjud emas"}
                                                </p>
                                            </Link>

                                            <div className="flex items-center gap-[8px]">
                                                <img
                                                    className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] object-contain"
                                                    src={cart_icon || "/placeholder.svg"}
                                                    alt="Cart"
                                                    onClick={handleAddToCart}
                                                />
                                                <img
                                                    className={`${product.liked ? "p-[2px]" : "p-0"} w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] object-contain cursor-pointer`}
                                                    src={product.liked ? liked_icon : like_icon}
                                                    alt="Like"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                        handleLikeToggle(product.id)
                                                    }}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center w-full font-inter text-lg text-gray-500">Ma'lumot topilmadi.</p>
                        )}
                    </div>
                </div>
            </div>

            <Download_page />
        </div>
    );
}

export default Home;
