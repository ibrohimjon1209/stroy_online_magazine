import React from 'react'
import download from './Images/download.png'

const Download = () => {
    return (
        <div className='hidden sm:block w-[1440px] pl-[190px] overflow-hidden mt-[20px] h-[500px] bg-[#F4F4F4]'>

            <img src={download} className='cursor-text -mt-[80px] '/>
        </div>
    )
}

export default Download