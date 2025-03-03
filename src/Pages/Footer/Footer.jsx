import React from 'react'
import app_store from './Images/app_store.jpg'
import google_play from './Images/google_play.png'
import instagram from './Images/instagram.png'
import logo from './Images/logo.png'
import telegram from './Images/telegram.png'
import youtube from './Images/youtube.png'
import apple from './Images/apple.png'
import play from './Images/play.png'

const Footer = () => {
    return (
        <div className='w-full h-[315px] hidden sm:block bg-[#262928] pt-[40px] pl-[49px] '>

            <div className='flex'>

                <div className='flex gap-[90px]'>
                    <img src={logo} className='w-[77px] h-[54px]' />
                    <div className='flex flex-col gap-[20px]'>
                        <h1 className='font-inter font-[700] text-[20px] leading-[30px] text-[#FFFFFF]'>Category :</h1>
                        <div className='flex gap-[10px]'>
                            <div className='flex flex-col gap-[9px]'>
                                <h1 className='w-[102px] h-[27px] font-inter font-[700] text-[20px] leading-[25px] text-[rgba(255,255,255,0.41)]'>Home</h1>
                                <h1 className='w-[102px] h-[27px] font-inter font-[700] text-[20px] leading-[25px] text-[rgba(255,255,255,0.41)]'>Search</h1>
                                <h1 className='w-[102px] h-[27px] font-inter font-[700] text-[20px] leading-[25px] text-[rgba(255,255,255,0.41)]'>Order</h1>
                            </div>
                            <div className='flex flex-col gap-[9px]'>
                                <h1 className='w-[102px] h-[27px] font-inter font-[700] text-[20px] leading-[25px] text-[rgba(255,255,255,0.41)]'>Cart</h1>
                                <h1 className='w-[102px] h-[27px] font-inter font-[700] text-[20px] leading-[25px] text-[rgba(255,255,255,0.41)]'>Profile</h1>
                                <h1 className='w-[102px] h-[27px] font-inter font-[700] text-[20px] leading-[25px] text-[rgba(255,255,255,0.41)]'>Likes</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='ml-[70px]'>
                    <h1 className='font-inter font-[700] text-[20px] leading-[30px] text-[rgba(255,255,255,1)]'>Apps :</h1>
                    <div className='flex flex-col gap-[27px] mt-[20px]'>
                        <div className='ml-[-1px] bg-[#111111] w-[151px] h-[37px] flex  rounded-[3px] pt-[6px] pl-[10px] '>
                            <img src={apple} className='w-[20px] h-[21px] object-fill' />\
                            <div>
                                <h1 className='font-poppins font-[500] text-[6px] leading-[9px] text-white'>Download</h1>
                                <h1 className='font-inter font-[700] text-[11px] leading-[16.5px] text-white'>App Store</h1>
                            </div>
                        </div>
                        <div className='ml-[-1px] bg-[#111111] w-[151px] h-[37px] flex  rounded-[3px] pt-[6px] pl-[10px] '>
                            <img src={play} className='w-[20px] h-[21px] object-fill' />\
                            <div>
                                <h1 className='font-poppins font-[500] text-[6px] leading-[9px] text-white'>Download</h1>
                                <h1 className='font-inter font-[700] text-[11px] leading-[16.5px] text-white'>Google Play</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='ml-[70px] flex flex-col gap-[20px]'>
                    <h1 className='font-inter font-[700] text-[20px] leading-[30px] text-white '>Social Media :</h1>
                    <div className='flex gap-[11px]'>
                        <div className='cursor-pointer w-[37px] h-[37px] flex justify-center items-center rounded-[3px] bg-[#111111]'>
                            <img src={instagram} />
                        </div>
                        <div className='cursor-pointer w-[37px] h-[37px] flex justify-center items-center rounded-[3px] bg-[#111111]'>
                            <img src={telegram} />
                        </div>
                        <div className='cursor-pointer w-[37px] h-[37px] flex justify-center items-center rounded-[3px] bg-[#111111]'>
                            <img src={youtube} />
                        </div>
                    </div>
                </div>

                <div className='ml-[111px] flex flex-col gap-[35px]'>
                    <h1 className='font-inter font-[700] text-[24px] leading-[29.05px] text-[#FFFFFF]'>Savolingiz bormi? Qo‘ng‘iroq qiling</h1>
                    <div className='flex gap-[35px]'>
                        <div className='flex flex-col gap-[16px]'>
                            <h1 className='w-[193px] h-[24px] font-inter font-[500] text-[16px] leading-[24px] text-[#FFFFFF]'>Nasiya savdo :</h1>
                            <h1 className='w-[193px] h-[24px] font-inter font-[500] text-[16px] leading-[24px] text-[#FFFFFF]'>Maxsulot bo’yicha:</h1>
                            <h1 className='w-[193px] h-[24px] font-inter font-[500] text-[16px] leading-[24px] text-[#FFFFFF]'>Ilova bo’yicha:</h1>
                        </div>
                        <div className='flex flex-col gap-[16px]'>
                            <h1 className='w-[193px] h-[24px] font-inter font-[700] text-[20px] leading-[24px] text-[#FFFFFF]'>+998 71 123 45 67</h1>
                            <h1 className='w-[193px] h-[24px] font-inter font-[700] text-[20px] leading-[24px] text-[#FFFFFF]'>+998 71 123 45 67</h1>
                            <h1 className='w-[193px] h-[24px] font-inter font-[700] text-[20px] leading-[24px] text-[#FFFFFF]'>+998 71 123 45 67</h1>
                        </div>
                    </div>
                </div>


            </div>

            <div className='mt-[50px] w-full h-[53px] flex flex-col -ml-[25px] px-[76px]'>
                <div className='h-[2px] bg-[rgba(118,109,109,0.57)] w-full'>

                </div>
                <div className='flex justify-center h-full items-center'>
                    <h1 className='font-inter font-[700] text-[16px] leading-[19.36px] text-[rgba(255,255,255,0.81)]'>© 2024 - 2025 STROY BAZA №1 (Powered by NSD Co.) v1.00.0</h1>

                </div>
            </div>


        </div>
    )
}

export default Footer