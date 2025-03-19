"use client"

import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import logo from "./Images/logo_mobile.svg"
import Carusel from "./Carusel"
import { Search, CirclePlus, History, X } from "lucide-react"
import photo from "./Images/photo.png"
import cart_icon from "./Images/cart_icon.svg"
import like_icon from "./Images/like_icon.svg"
import liked_icon from "./Images/liked_icon.svg"

// {api imports}
import { products_get } from "../../Services/products_get"

const fetchProducts = () => {
    return new Promise((resolve) => {
        const products = Array.from({ length: 222 }, (_, index) => ({
            id: index + 1,
            name: `Product ${index + 1}`,
            price: "9.999 UZS",
            image: photo,
            liked: false,
        }))
        resolve(products)
    })
}





function Home() {

    useEffect(() => {
        products_get()
            .then((response) => {
                const data = response.data
                console.log(data)
            })
            .catch((err) => console.error("Error: ", err))


    })  
    const inputRef = useRef(null)
    const [is_search_open, set_is_search_open] = useState(false)
    const [searchAnimation, setSearchAnimation] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts()
            setProducts(data)
        }
        getProducts()
    }, [])

    const handleLikeToggle = (id) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => (product.id === id ? { ...product, liked: !product.liked } : product)),
        )
    }

    const handleSearchClick = () => {
        if (is_search_open) {
            setSearchAnimation(false)
            setTimeout(() => {
                set_is_search_open(false)
            }, 300)
        } else {
            set_is_search_open(true)
            setTimeout(() => {
                setSearchAnimation(true)
            }, 10)
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }
    }

    const clearInput = () => {
        setSearchText("")
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const handleSelectTopic = (name) => {
        setSearchText(name)
        setSearchAnimation(false)
        setTimeout(() => {
            set_is_search_open(false)
        }, 300)
    }

    const handleClickOutside_search = () => {
        setSearchAnimation(false)
        setTimeout(() => {
            set_is_search_open(false)
        }, 300)
    }

    const search_topics = [{ name: "Olma" }, { name: "Behi" }, { name: "Anor" }, { name: "Ko'ylak" }, { name: "Bazalt" }]

    return (
        <div className="sd">
            <style jsx>
                {`
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
        }`}
            </style>

            <div className="w-full h-[150px] flex flex-col items-center bg-[#DCC38B] block sm:hidden">
                <img src={logo || "/placeholder.svg"} className="w-[77px] h-[71px] mt-[10px]" />

                {/* Search input for mobile */}
                <div className="w-[90%] h-[40px] pl-[23.5px] bg-[#FFFFFF] rounded-[10px] flex items-center mt-4">
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
                        <CirclePlus className="rotate-[45deg] mr-[15px] cursor-pointer" strokeWidth={1.75} onClick={clearInput} />
                    )}
                </div>
            </div>
            
            <div className="px-[22px] w-full h-[90px] flex block sm:hidden justify-center items-center">
                <div className="w-full h-[50px] bg-white border-[0.5px] border-[#8879798C] rounded-[10px] flex items-center justify-evenly">
                    <h1 className="font-inter font-[500] text-[15px] leading-[22px] text-[#DA9700]">Stroy Baza №1</h1>
                    <h1 className="font-inter font-[500] text-[15px] leading-[22px] text-black">Mebel</h1>
                    <h1 className="font-inter font-[500] text-[15px] leading-[22px] text-black">Gold Klinker</h1>
                </div>
            </div>

            <div className="flex block sm:hidden justify-center items-center w-full h-[184px] bg-[#F9C527]">
                <h1>Carusel</h1>
            </div>

            <div className="hidden sm:block">
                <Carusel />
            </div>

            {/* Search dropdown */}
            {is_search_open && (
                <div
                    className="absolute top-[150px] sm:top-[80px] left-0 h-[91vh] w-full flex justify-center pt-[10px] z-50"
                    onClick={handleClickOutside_search}
                >
                    <div
                        className={`search_modal w-[90%] sm:w-[520px] h-fit mx-auto sm:ml-[160px] bg-white border-[1px] overflow-hidden border-[#6D5C5CA6] rounded-10px] shadow-xl transition-all duration-300 ${searchAnimation ? "dropdown-enter-active" : "dropdown-enter"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {search_topics.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelectTopic(item.name)}
                                className="cursor-pointer w-full h-[52px] pl-[24px] pr-[43px] flex justify-between items-center bg-transparent hover:bg-gray-100"
                            >
                                <div className="flex gap-[15px] cursor-pointer">
                                    <History strokeWidth={1.75} />
                                    <h1 className="font-inter font-[500] text-[20px] leading-[22px] text-[#0000008C]">{item.name}</h1>
                                </div>
                                <X
                                    strokeWidth={1.75}
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSearchAnimation(false)
                                        setTimeout(() => {
                                            set_is_search_open(false)
                                        }, 300)
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="block">
                <div className="popular flex flex-col w-full sm:w-[1440px] m-auto h-auto px-[15px] sm:px-[77px] mb-[100px] sm:mb-[0]">
                    <h1 className="font-inter font-[600] text-[17px] sm:text-[22px] text-black mt-6">Ommabop tavarlar</h1>

                    <div className="mt-[20px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] sm:gap-x-[20px] gap-y-[15px] sm:gap-y-[30px]">
                        {products.map((product) => (
                            <div key={product.id} className="w-full cursor-pointer hover:shadow-sm rounded-[10px] bg-white">
                                <Link to={"/product"}>
                                    <div className="w-full aspect-square rounded-[10px] bg-[#F2F2F1] flex justify-center items-center overflow-hidden group">
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            className="transition-transform duration-300 transform group-hover:scale-105 w-full h-full object-contain"
                                            alt={product.name}
                                        />
                                    </div>
                                </Link>

                                <div className="flex flex-col gap-[8px] sm:gap-[16px] p-2">
                                    <Link to={"/product"}>
                                        <div className="flex flex-col">
                                            <h1 className="font-inter font-[600] text-[12px] sm:text-[16px] text-black truncate">
                                                {product.name}
                                            </h1>
                                        </div>
                                    </Link>
                                    <div className="flex justify-between items-center">
                                        <Link to={"/product"}>
                                            <p className="font-inter font-[500] text-[12px] sm:text-[14px] text-black">
                                                Narxi: {product.price}
                                            </p>
                                        </Link>

                                        <div className="flex items-center gap-[8px]">
                                            <img
                                                className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] object-contain"
                                                src={cart_icon || "/placeholder.svg"}
                                                alt="Cart"
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
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home

