"use client"

import { useState, useRef } from "react"
import { Search, CirclePlus, History, X, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const Category_mobile = () => {
    const inputRef = useRef(null)
    const [is_search_open, set_is_search_open] = useState(false)
    const [searchAnimation, setSearchAnimation] = useState(false)
    const [searchText, setSearchText] = useState("")

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

    const category_topics = [
        { name: "Penopleks" },
        { name: "Teplesk" },
        { name: "Kley" },
        { name: "Oboy va kraskalar" },
        { name: "Bazalt" },
        { name: "Steklovata" },
        { name: "Kanauf" },
        { name: "Kanauf" },
    ]

    const search_topics = [{ name: "Olma" }, { name: "Behi" }, { name: "Anor" }, { name: "Ko'ylak" }, { name: "Bazalt" }]

    return (
        <div className="w-full">


            <div>
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

                <div className="w-full h-[80px] flex flex-col items-center justify-center bg-[#DCC38B]">

                    {/* Search input for mobile */}
                    <div className="w-[90%] h-[40px] pl-[23.5px] bg-[#FFFFFF] rounded-[10px] flex items-center">
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

                {/* Search dropdown */}
                {is_search_open && (
                    <div
                        className="absolute top-[80px] left-0 h-[91vh] w-full flex justify-center pt-[10px] z-50"
                        onClick={handleClickOutside_search}
                    >
                        <div
                            className={`search_modal w-[90%] h-fit mx-auto bg-white border-[1px] overflow-hidden border-[#6D5C5CA6] rounded-[10px] shadow-xl transition-all duration-300 ${searchAnimation ? "dropdown-enter-active" : "dropdown-enter"}`}
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
            </div>


            <div className="category-topics pt-[15px]">
                {
                    category_topics.map((item, index) => (
                        <Link to={'/category'} key={index}>
                            <div className="flex justify-between items-center pl-[22px] pr-[31px] w-full h-[52px]">
                                <h1 className="font-inter font-[500] text-[20px] leading-[22px] text-[#0000008C]">{item.name}</h1>
                                <ChevronRight className="text-[#737373]" />
                            </div>
                        </Link>
                    ))
                }

            </div>


        </div>
    )
}

export default Category_mobile

