import React from 'react'
import photo from './Images/photo.png'

const Home = () => {
    return (
        <div className='w-full h-auto flex flex-col'>

            <div className='w-full h-[450px] bg-yellow-300 mt-[30px]'></div>
            <div className='w-[90px] h-[16px] rounded-[20px] bg-black mt-[20px] ml-[46%]'></div>

            <div className='popular flex flex-col w-[1440px] m-auto h-auto px-[87px] mt-[20px]'>
                <h1 className='font-inter font-[600] text-[28px] text-black'>Ommabop tavarlar</h1>

                <div className='w-[1266px] h-screen bg--100'>

                    <div className='w-[283px] h-[383px] border-[1px]'>
                        <div className='w-[283px] h-[283px] rounded-[10px] bg-[#F2F2F1] flex justify-center items-center'>
                            <img src={photo} className='overflow-hidden ' />
                        </div>

                        <h1 className='font-inter font-[600] text-[20px] text-black mt-[20px]'>PENOPLESK</h1>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Home