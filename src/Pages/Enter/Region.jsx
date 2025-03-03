import React from 'react';
import { Link } from 'react-router-dom';
import image from './Images/location_icon.png';

const Region = () => {
  return (
    <div className='w-full h-screen'>
      <div className='w-full h-screen flex flex-col justify-center items-center'>
        <img src={image} className='w-[192px] h-[174px]' alt="Location Icon" />
        <h1 className='mt-[60px] font-inter font-[500] text-[24px] leading-[22px]'>Siz Andijon shahridanmisiz?</h1>
        <p className='mt-[30px] font-inter font-[500] w-[425px] h-[44px] text-[20px] text-center leading-[22px]'>
          Tanlangan hududga qarab yetkazib berish usuli va mahsulot mavjudligi belgilanadi.
        </p>

        <div className='mt-[43px] flex gap-[21px]'>
          <Link to="/orders">
            <button className='w-[178px] h-[59px] hover:font-[600] transition-all duration-200 active:bg-[#aaa8a3] active:scale-[99%] hover:scale-[101%] rounded-[5px] bg-[#E4E4E1] font-inter font-[600] text-[15px] leading-[22px] text-black'>
              Yo'q, o'zgartirish
            </button>
          </Link>
          <Link to="/category">
            <button className='w-[178px] h-[59px] hover:bg-[#DCC38B] hover:font-[600] transition-all duration-200 active:bg-[#aa9263] active:scale-[99%] hover:scale-[101%] rounded-[5px] bg-[#DCC38B] font-inter font-[600] text-[15px] leading-[22px] text-black'>
              Ha
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Region;
