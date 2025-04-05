import React, { useEffect } from "react";
import photo_1 from "./Images/photo_1.png";
import photo_2 from "./Images/photo_2.png";
import photo_3 from "./Images/photo_3.png";
import { Link } from "react-router-dom";

const category = [
  {
    name: "Mebel",
    photo: photo_1,
  },
  {
    name: "Story Baza №1",
    photo: photo_2,
  },
  {
    name: "Gold Klinker",
    photo: photo_3,
  },
];

const Category = ({ set_is_found }) => {
  useEffect(() => {
    set_is_found(false);
  }, []);
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <div className="flex flex-col gap-[31px] scale-70 sm:scale-100">
        {category.map((item, index) => (
          <button
            onClick={() => {
              localStorage.setItem("sl_option_nav", item.name)
              localStorage.setItem("is_entered", "true")
            }}
            className="w-[487px] h-[92px] cursor-pointer pl-[34px] hover:bg-[#DCC38B] hover:text-white hover:font-[600] transition-all duration-200 active:bg-[#aa9263] active:scale-[99%] hover:scale-[101%] rounded-[10px] border-[1.5px] border-[#DCC38B] bg-[#FFFFFF]  font-inter font-500 text-[28px] leading-[22px] text-black"
          >
            <Link to="/" className="flex items-center gap-[70px] w-full h-full">
              <img src={item.photo} />
              <h1>{item.name}</h1>
            </Link>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
