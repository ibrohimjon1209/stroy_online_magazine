import React from 'react'
import photo_1 from './Images/photo_1.png'
import photo_2 from './Images/photo_2.png'
import photo_3 from './Images/photo_3.png'

const category = [
  {
    name: "Mebel",
    photo: photo_1
  },
  {
    name: "Story Baza №1",
    photo: photo_2
  },
  {
    name: "Gold Klinker",
    photo: photo_3
  },
]

const Category = () => {
  return (
    <div className='w-full h-screen bg-white flex justify-center items-center'>

      <div className='flex flex-col gap-[31px]'>
        {
          category.map((item, index) => (
            <button className='w-[487px] h-[92px] pl-[34px] gap-[74px] flex items-center hover:bg-[#DCC38B] hover:text-white hover:font-[600] transition-all duration-200 active:bg-[#aa9263] active:scale-[99%] hover:scale-[101%] rounded-[10px] border-[1.5px] border-[#DCC38B] bg-[#FFFFFF]  font-inter font-500 text-[28px] leading-[22px] text-black'>
              <img src={item.photo}/>
              <h1>{item.name}</h1>
            </button>
          ))}
      </div>

    </div>
  )
}

export default Category