import React from 'react'
import product from './Images/product.png'


const Product = () => {
    return (
        <div className='w-full h-auto mt-[50px] px-[190px] mb-[111px]'>

            <h1 className='font-inter font-[600] text-[20px] leading-[22px] text-black'>PENOPLESK</h1>
            <div className='flex gap-[20px]'>
                <div className='product-div'>

                    <div className='mt-[20px] flex gap-[19px]'>
                        <div className='flex flex-col gap-[18px]'>
                            <div className='overflow-hidden w-[158px] h-[156px] bg-[rgba(242,242,241,1)] rounded-[15px] flex justify-center items-center'><img src={product} className='w-[158px] h-[156px] object-fill' /></div>
                            <div className='overflow-hidden w-[158px] h-[156px] bg-[rgba(242,242,241,1)] rounded-[15px] flex justify-center items-center'><img src={product} className='w-[158px] h-[156px] object-fill' /></div>
                            <div className='overflow-hidden w-[158px] h-[156px] bg-[rgba(242,242,241,1)] rounded-[15px] flex justify-center items-center'><img src={product} className='w-[158px] h-[156px] object-fill' /></div>
                        </div>
                        <div className='w-[504px] h-[504px] overflow-hidden bg-[rgba(242,242,241,1)] rounded-[15px]'>
                            <img src={product} className='w-[504px] h-[504px] object-fill' />
                        </div>
                    </div>

                    <div className='mt-[40px] flex flex-col gap-[28px] w-[681px]'>
                        <h1 className='font-inter font-[600] text-[28px] leading-[22px] text-black'>Tasnif</h1>
                        <p className='font-inter font-[500] text-[16px] leading-[22px] text-black'>Lorem Ipsum matbaa va matn terish sanoatining oddiygina soxta matnidir. Lorem Ipsum 1500-yillardan beri sanoatning standart qo'g'irchoq matni bo'lib kelgan, o'shandan beri noma'lum printer galleyni olib, kitob namunasini yaratish uchun shifrlagan. U nafaqat besh asr davomida, balki elektron terishga sakrashdan ham omon qoldi va deyarli o'zgarishsiz qoldi. U 1960-yillarda Lorem Ipsum parchalarini oʻz ichiga olgan Letraset varaqlarining chiqarilishi va yaqinda Aldus PageMaker kabi ish stoli nashriyot dasturlari, shu jumladan Lorem Ipsum versiyalari bilan ommalashgan. Lorem Ipsum matbaa va matn terish sanoatining oddiygina soxta matnidir. Lorem Ipsum 1500-yillardan beri sanoatning standart qo'g'irchoq matni bo'lib kelgan, o'shandan beri noma'lum printer galleyni olib, kitob namunasini yaratish uchun shifrlagan. Lorem Ipsum matbaa va matn terish sanoatining oddiygina soxta matnidir. Lorem Ipsum 1500-yillardan beri sanoatning standart qo'g'irchoq matni bo'lib kelgan, o'shandan beri noma'lum printer galleyni olib, kitob namunasini yaratish uchun shifrlagan. </p>
                    </div>
                </div>


                <div className='product-details mt-[20px]'>
                    <div className='flex flex-col gap-[10px]'>
                        <h5 className='font-inter font-[600] text-[16px] leading-[22px] text-[rgba(66,206,94,1)]'>Mavjud</h5>
                        <h1 className='font-inter font-[600] text-[24px] leading-[22px] text-black'>Penoplex Komfort</h1>
                    </div>
                    <div className='color-div mt-[7px] flex flex-col gap-[6px]'>
                        <h1 className='font-inter font-[400] text-[13px] leading-[22px] text-black'>Rang : <span className='font-[500]'>Ko’k</span></h1>
                        <div className='flex gap-[10px]'>
                            <div className='overflow-hidden w-[62px] h-[80px] border-[1.5px] bg-[rgba(247,247,246,1)] border-[rgba(190,160,134,1)] rounded-[5px]'><img src={product} className='w-[62px] h-[80px] object-fill' /></div>
                            <div className='overflow-hidden w-[62px] h-[80px] bg-[rgba(247,247,246,1)] border-[rgba(190,160,134,1)] rounded-[5px]'><img src={product} className='w-[62px] h-[80px] object-fill' /></div>
                            <div className='overflow-hidden w-[62px] h-[80px] bg-[rgba(247,247,246,1)] border-[rgba(190,160,134,1)] rounded-[5px]'><img src={product} className='w-[62px] h-[80px] object-fill' /></div>
                            <div className='overflow-hidden w-[62px] h-[80px] bg-[rgba(247,247,246,1)] border-[rgba(190,160,134,1)] rounded-[5px]'><img src={product} className='w-[62px] h-[80px] object-fill' /></div>
                        </div>
                    </div>

                    <div className="size-div mt-[20px]">
                        <h1 className='font-inter font-[400] text-[13px] leading-[22px] text-[rgba(0,0,0,1)]'>O’lchami (Metr²): 4x6 </h1>
                        <div className='sizes flex gap-[10px] mt-[7px]'>
                            <div className='flex justify-center items-center w-[62px] h-[62px] rounded-[5px] border-[rgba(190,160,134,1)] bg-[rgba(247,247,246,1)] border-[1.5px]'><h1 className='font-inter font-[400] text-[16px] leading-[22px] text-black'>4x6</h1></div>
                            <div className='flex justify-center items-center w-[62px] h-[62px] rounded-[5px] border-[rgba(190,160,134,1)] bg-[rgba(247,247,246,1)]'><h1 className='font-inter font-[400] text-[16px] leading-[22px] text-black'>4x6</h1></div>
                            <div className='flex justify-center items-center w-[62px] h-[62px] rounded-[5px] border-[rgba(190,160,134,1)] bg-[rgba(247,247,246,1)]'><h1 className='font-inter font-[400] text-[16px] leading-[22px] text-black'>4x6</h1></div>
                            <div className='flex justify-center items-center w-[62px] h-[62px] rounded-[5px] border-[rgba(190,160,134,1)] bg-[rgba(247,247,246,1)]'><h1 className='font-inter font-[400] text-[16px] leading-[22px] text-black'>4x6</h1></div>
                        </div>
                    </div>


                    <div className='mt-[20px]'><h1 className='font-inter font-[700] text-[20px] leading-[22px] text-[rgba(0,0,0,1)]'>1.116.000 so’m</h1></div>


                    <div className='term-payment mt-[20px]'>

                        <div className='flex flex-col justify-between w-[358px] py-[10px] px-[12px] h-[87px] rounded-[8px] border-[1px] border-[rgba(213,213,213,1)] bg-[rgba(242,242,241,1)]'>
                            <div className='w-[335px] h-[26px] rounded-[5px] flex justify-between gap-[3.75px] bg-[rgba(213,213,213,1)]'>
                                <div className='flex justify-center items-center w-[80px] h-[26px] rounded-[5px] '><h1 className='font-inter font-[500] text-[10px] text-[rgba(0,0,0,1)]'>3 oy</h1></div>
                                <div className='flex justify-center items-center w-[80px] h-[26px] rounded-[5px] '><h1 className='font-inter font-[500] text-[10px] text-[rgba(0,0,0,1)]'>6 oy</h1></div>
                                <div className='flex justify-center items-center w-[80px] h-[26px] rounded-[5px] '><h1 className='font-inter font-[500] text-[10px] text-[rgba(0,0,0,1)]'>12 oy</h1></div>
                                <div className='flex justify-center items-center w-[80px] h-[26px] rounded-[5px] bg-white'><h1 className='font-inter font-[500] text-[10px] text-[rgba(0,0,0,1)]'>24 oy</h1></div>
                            </div>

                            <div className='flex gap-[10px] items-center'>
                                <h1 className='w-[89px] h-[28px] rounded-[2.5px] bg-[rgba(254,242,157,1)] font-inter font-[500] text-[13px] leading-[22px] flex justify-center items-center'>135.652 so’m</h1>
                                <h1 className='font-inter font-[500] text-[10px] leaading-[22px] text-[rgba(0,0,0,1)]'>x 24oy</h1>
                            </div>
                        </div>

                        <p className='mt-[10px] w-[318px] font-inter font-[500] text-[12px] leading-[22px] text-[rgba(0,0,0,0.75)]'>Siz buyurtmani 3 oydan 24 oygacha muddatli to’lov evaziga xarid qilishingiz mumkin.</p>

                        <div className='payment-options p-[20px] mt-[20px] w-[358px] h-[297px] rounded-[10px] border-[1px] border-[rgba(213,213,213,1)] '>
                            <h1 className='font-inter font-[500] text-[12px] leading-[22px] text-[rgba(0,0,0,0.75)]'>Yetkazib berish <span className='font-inter font-[800]'>1 kun</span> ichida
                                Agar <span className='font-inter font-[800]'>5mln</span> so’mdan ortiq mahsulotga buyurtma bersangiz yetkazib berish VODIY bo’ylab be’pul.</h1>
                            <div className='mt-[20px] w-[318px] h-[1px] bg-[rgba(213,213,213,1)]'></div>
                            <h1 className='mt-[20px] font-inter font-[500] text-[12px] leading-[22px] text-[rgba(0,0,0,0.75)]'>Muddatli to’lovni rasmiylashtirayotganingizda bizdan va hamkorlarimizdan eng ma’qul takliflarga ega bo’lishingiz mumkin .</h1>

                            <div className='flex gap-[15px] mt-[20px]'>
                                <div className='w-[68px] h-[65px] rounded-[10px] bg-green-300'></div>
                                <div className='w-[68px] h-[65px] rounded-[10px] bg-green-300'></div>
                                <div className='w-[68px] h-[65px] rounded-[10px] bg-green-300'></div>
                                <div className='w-[68px] h-[65px] rounded-[10px] bg-green-300'></div>
                            </div>
                        </div>

                        <button className='mt-[20px] w-[358px] h-[60px] rounded-[10px] bg-[rgba(220,195,139,1)] cursor-pointer  hover:bg-[#e9d8b2] transition-all duration-200 font-inter font-[600] text-[15px] leading-[22px] text-[rgba(0,0,0,1)]'>Savatchaga qo’shish</button>


                    </div>



                </div>
            </div>

        </div>
    )
}

export default Product