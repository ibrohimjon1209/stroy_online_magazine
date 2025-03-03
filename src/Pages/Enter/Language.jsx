import React from 'react';
import { Link } from 'react-router-dom';

const Language = () => {
    return (
        <div className='w-full h-screen bg-white flex justify-center items-center'>
            <div className='flex flex-col gap-[31px]'>
                <Link to="/region" className='w-[487px] h-[92px] hover:bg-[#DCC38B] hover:text-white hover:font-[600] transition-all duration-200 active:bg-[#aa9263] active:scale-[99%] hover:scale-[101%] rounded-[10px] border-[1.5px] border-[#DCC38B] bg-[#FFFFFF] font-inter font-500 text-[28px] leading-[22px] text-black text-center flex items-center justify-center'>
                    O’zbekcha
                </Link>
                <Link to="/region" className='w-[487px] h-[92px] hover:bg-[#DCC38B] hover:text-white hover:font-[600] transition-all duration-200 active:bg-[#aa9263] active:scale-[99%] hover:scale-[101%] rounded-[10px] border-[1.5px] border-[#DCC38B] bg-[#FFFFFF] font-inter font-500 text-[28px] leading-[22px] text-black text-center flex items-center justify-center'>
                    English
                </Link>
                <Link to="/region" className='w-[487px] h-[92px] hover:bg-[#DCC38B] hover:text-white hover:font-[600] transition-all duration-200 active:bg-[#aa9263] active:scale-[99%] hover:scale-[101%] rounded-[10px] border-[1.5px] border-[#DCC38B] bg-[#FFFFFF] font-inter font-500 text-[28px] leading-[22px] text-black text-center flex items-center justify-center'>
                    Русский
                </Link>
            </div>
        </div>
    );
}

export default Language;
