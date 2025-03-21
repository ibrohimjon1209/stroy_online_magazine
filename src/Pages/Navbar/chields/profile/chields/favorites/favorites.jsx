import React, { useState } from "react";
import cart_icon from "./imgs/cart_icon.svg";
import liked_icon from "./imgs/liked_icon.svg";
import photo from "./imgs/photo.png";
import { Link } from "react-router-dom";

const Favorites_main = () => {
  const [products, setProducts] = useState(
    Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      name: `Product ${index + 1}`,
      price: "10.000 UZS",
      image: photo,
      liked: false,
    }))
  );
  return (
    <div className="w-full sm:mx-15">
      <div className="mt-[10px] mb-[40px] w-full flex flex-wrap justify-between sm:gap-x-[40px]">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[150px] h-[235px] sm:h-[280px] cursor-pointer hover:shadow-xs"
          >
            <Link to={"/product"}>
              <div className="w-full aspect-square rounded-[10px] bg-[#F2F2F1] flex justify-center items-center overflow-hidden group">
                <img
                  src={product.image || "/placeholder.svg"}
                  className="transition-transform duration-300 transform group-hover:scale-105 w-full h-full object-contain"
                  alt={product.name}
                />
              </div>
            </Link>

            <div className="flex flex-col gap-[8px] sm:gap-[16px] p-2">
              <Link to={"/product"}>
                <div className="flex flex-col">
                  <h1 className="font-inter font-[600] text-[12px] sm:text-[16px] text-black truncate">
                    {product.name}
                  </h1>
                </div>
              </Link>
              <div className="flex justify-between items-center">
                <Link to={"/product"}>
                  <p className="font-inter font-[500] text-[12px] sm:text-[14px] text-black">
                    Narxi: {product.price}
                  </p>
                </Link>

                <div className="flex items-center gap-[8px]">
                  <img
                    className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] object-contain"
                    src={cart_icon || "/placeholder.svg"}
                    alt="Cart"
                  />
                  <img
                    className={`${
                      product.liked ? "p-[2px]" : "p-0"
                    } w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] object-contain cursor-pointer`}
                    src={liked_icon}
                    alt="Like"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleLikeToggle(product.id);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites_main;
