import React, { useState } from "react";

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
];

const City_main = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className='w-full mt-[-50px]'>
      <div className='w-full h-auto flex flex-col'>
        {City.map((city, index) => (
          <div
            key={index}
            className={`w-full h-[122px] flex items-center pl-[50px] bg-transparent transition-all duration-150 cursor-pointer hover:bg-gray-100 ${
              selected === index ? "text-[#DCC38B]" : "text-black"
            }`}
            onClick={() => setSelected(index)}
          >
            <h1 className='font-inter font-[600] text-[24px] leading-[22px]'>
              {city.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default City_main;
