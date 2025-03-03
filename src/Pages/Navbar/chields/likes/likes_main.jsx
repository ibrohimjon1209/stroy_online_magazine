import React, { useState } from "react";
import cart_icon from "./imgs/cart_icon.svg";
import like_icon from "./imgs/like_icon.svg";
import liked_icon from "./imgs/liked_icon.svg";
import photo from "./imgs/photo.png";

const Likes_main = () => {
  const [products, setProducts] = useState(
    Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      name: `Product ${index + 1}`,
      price: "9.999 UZS",
      image: photo,
      liked: false,
    }))
  );
  return (
    <div className="w-full mx-20">
      <div className="mt-[40px] mb-[20px] w-full mx-auto flex flex-wrap gap-x-[40px]">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[230px] h-[330px] cursor-pointer hover:shadow-xs"
          >
            <div className="w-[200px] h-[200px] rounded-[10px] bg-[#F2F2F1] flex justify-center items-center overflow-hidden group">
              <img
                src={product.image}
                className="transition-transform duration-300 transform group-hover:scale-105 w-full h-full object-fill"
                alt={product.name}
              />
            </div>

            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-row gap-[26px] mt-[30px]">
                <h1 className="font-inter font-[600] text-[18px] text-black">
                  {product.name}
                </h1>
                <div className="flex items-center gap-[16.33px]">
                  <img
                    className="hover:scale-[105%] transition-all duration-300 w-[26px] h-[26px] object-contain"
                    src={cart_icon}
                    alt="Cart"
                  />
                  <img
                    className="hover:scale-[105%] transition-all duration-300 p-[3px] w-[26px] h-[26px] object-contain cursor-pointer"
                    src={liked_icon}
                    alt="Like"
                    onClick={() => handleLikeToggle(product.id)}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <p className="font-inter font-[500] text-[18px] leading-[22px] text-black">
                  Narxi : {product.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Likes_main;
