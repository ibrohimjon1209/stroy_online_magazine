import React from 'react'

const City = [
  {
    name: "Toshkent shahri"
  },
  {
    name: "Andijon shahri"
  },
  {
    name: "Farg'ona shahri"
  },
  {
    name: "Namangan shahri"
  },
]

const Borrow = () => {
  return (
    <div className='w-full h-screen'>

      <div className='w-full h-[82px] bg-[#DCC38B] flex items-center pl-[50px]'>
        <h1 className='font-inter font-[600] text-[20px] leading-[22px] text-black'>Yetkazib berish shahrini tanlang</h1>
      </div>


      <div className='w-full h-auto flex flex-col pt-[43px]'>

        {City.map((city, index) => (
          <div className='w-full h-[122px] flex items-center pl-[50px] bg-transparent transition-all duration-150 cursor-pointer hover:bg-gray-100'>
            <h1 className='font-inter font-[600] text-[24px] leading-[22px] text-black'>{city.name}</h1>
          </div>
        ))}

      </div>

    </div>
  )
}

export default Borrow