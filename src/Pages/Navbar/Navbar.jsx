import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import logo from './Images/logo.png';
import cube from './Images/orders.png';
import cube_a from './Images/orders_a.png';
import like from './Images/like.png';
import like_a from './Images/like_a.png';
import basket from './Images/cart.png';
import basket_a from './Images/basket_a.png';
import profile from './Images/profile.png';
import profile_a from './Images/profile_a.png';
import search from './Images/search.png';
import vector from './Images/vector.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const inputRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [is_search_open, set_is_search_open] = useState(false);
    const location = useLocation();
    console.log(location.pathname);
    const handleSearchClick = () => {
        set_is_search_open(true);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const search_topics = [
        {
            name: "Penopleks"
        },
        {
            name: "Teplesk"
        },
        {
            name: "Kley"
        },
        {
            name: "Oboy va kraskalar"
        },
        {
            name: "Bazalt"
        },
        {
            name: "Steklovata"
        },
        {
            name: "Kanauf"
        },
        {
            name: "Kanauf"
        },
    ]

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

    const handleClickOutside = () => {
        set_is_search_open(false);
    };

    return (
        <div className='w-full h-[80px] flex justify-between gap-[20px] items-center px-[4.2%] sticky top-0 bg-[#DCC38B]'>
            <div className='w-[247px] h-full flex items-center gap-[5px]'>
                <img src={logo} alt="Logo" />
                <h1 className='font-inter font-[600] text-[20px] leading-[22px] text-black'>STROY BAZA №1</h1>
            </div>

            <div className='w-[653px] flex gap-[20px]'>
                <div className='w-[427px] h-[40px] pl-[23.5px] bg-[#FFFFFF] rounded-[5px] flex items-center'>
                    <img src={search} alt="Search" className="cursor-pointer" onClick={handleSearchClick} />
                    <input
                        type="text"
                        placeholder='Search'
                        className="w-full placeholder:font-inter placeholder:font-[500] placeholder:text-[15px] placeholder:text-[#737373] border-none pl-[15px] pr-[20px] focus:outline-none focus:ring-0 font-inter font-[500] text-[15px]"
                        ref={inputRef}
                        onClick={handleSearchClick}
                    />
                    {is_search_open && (
                        <div className='absolute top-[100%] left-0 h-[91vh] w-full flex justify-center pr-[50px] pt-[10px]' onClick={handleClickOutside}>
                            <div className='search_modal w-[600px] h-[450px] bg-white border-[1px] overflow-hidden border-[#6D5C5CA6] rounded-[5px] shadow-xl'>
                                {search_topics.map((item, index) =>
                                    <div className='w-full h-[52px] pl-[34px] pr-[43px] flex justify-between items-center bg-transparent hover:bg-gray-100'>
                                        <h1 className="font-inter font-[500] text-[20px] leading-[22px] text-[#0000008C]">{item.name}</h1>
                                        <img src={vector} className='rotate-[270deg]' />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className='relative w-[206px]'>
                    <div
                        className={`w-full h-[40px] bg-white ${isOpen ? 'rounded-t-[5px]' : 'rounded-[5px]'} flex items-center justify-between pl-2 pr-2 cursor-pointer `}
                        onClick={toggleDropdown}
                    >
                        <span>{selectedOption.name}</span>
                        <img src={vector} alt="Dropdown" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {isOpen && (
                        <div className='absolute top-[100%] left-0 w-full bg-white rounded-b-[5px] shadow-lg transition-all duration-500'>
                            {points.map((option, index) => (
                                <div
                                    key={index}
                                    className='py-2 px-4 hover:bg-gray-200 cursor-pointer'
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className='w-[242px] h-[40px] flex items-center gap-[48px]'>
                <Link to="/likes"><img className='hover:drop-shadow-md hover:shadow-xl transition-shadow duration-100 object-contain' src={location.pathname == '/likes' ? like_a : like}/></Link>
                <Link to="/orders"><img className='hover:drop-shadow-md hover:shadow-xl transition-shadow duration-100 object-contain' src={location.pathname == '/orders' ? cube_a : cube} /></Link>
                <Link to="/basket"><img className='hover:drop-shadow-md hover:shadow-xl transition-shadow duration-100 object-contain' src={location.pathname == '/basket' ? basket_a : basket} /></Link>
                <Link to="/profile"><img className='hover:drop-shadow-md hover:shadow-xl transition-shadow duration-100 object-contain' src={location.pathname == '/profile' ? profile_a : profile} /></Link>
            </div>
        </div>
    );
}

export default Navbar;
