import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "./Images/location_icon.png";
import region_get from "../../Services/cities/region";

const Region = ({ set_is_found, lang }) => {
  useEffect(() => {
    set_is_found(false);
  }, []);

  const [cities, set_cities] = useState([]);
  const [loading, set_loading] = useState(true); // Add loading state

  useEffect(() => {
    const get_cities = async () => {
      try {
        const response = await region_get();
        set_cities(response);
        set_loading(false); // Set loading to false when data is fetched
      } catch (err) {
        console.error("Error:", err);
        set_loading(false); // Handle error case
      }
    };
    get_cities();
  }, []);

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Render nothing or a fallback if cities is empty
  if (!cities.length) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p>No cities available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col items-center justify-center w-full h-screen scale-80 sm:scale-100">
        <img src={image} className="w-[192px] h-[174px]" alt="Location Icon" />
        <h1 className="mt-[60px] font-inter font-[500] text-[24px] leading-[22px]">
          {lang === "uz"
            ? `Siz ${cities[0][`name_${lang}`] || ""} danmisiz?`
            : lang === "en"
            ? `Are you from ${cities[0][`name_${lang}`] || ""}?`
            : lang === "ru"
            ? `Вы из ${cities[0][`name_${lang}`] || ""}?`
            : `Siz ${cities[0][`name_${lang}`] || ""} danmisiz?`}
        </h1>
        <p className="mt-[30px] font-inter font-[500] w-[425px] h-[44px] text-[20px] text-center leading-[22px]">
          {lang === "uz"
            ? "Tanlangan hududga qarab yetkazib berish usuli va mahsulot mavjudligi belgilanadi."
            : lang === "en"
            ? "Depending on the selected area, the method of delivery and the availability of products are determined."
            : lang === "ru"
            ? "В зависимости от выбранной области определяется способ доставки и доступность продукта."
            : "Tanlangan hududga qarab yetkazib berish usuli va mahsulot mavjudligi belgilanadi."}
        </p>

        <div className="mt-[73px] flex gap-[21px]">
          <Link to="/enter/borrow">
            <button className="w-[178px] h-[59px] cursor-pointer hover:font-[600] transition-all duration-200 active:bg-[#aaa8a3] active:scale-[99%] hover:scale-[101%] rounded-[5px] bg-[#E4E4E1] font-inter font-[600] text-[16px] leading-[22px] text-black">
              {lang === "uz" ? "Yo'q, o'zgartirish" : lang === "en" ? "No, change" : lang === "ru" ? "Нет, изменить" : "Yo'q, o'zgartirish"}
            </button>
          </Link>
          <Link to="/enter/category">
            <button onClick={localStorage.setItem("region", JSON.stringify(cities[0]))} className="w-[178px] h-[59px] cursor-pointer hover:bg-[#DCC38B] hover:font-[600] transition-all duration-200 active:bg-[#aa9263] active:scale-[99%] hover:scale-[101%] rounded-[5px] bg-[#DCC38B] font-inter font-[600] text-[16px] leading-[22px] text-black">
              {lang === "uz" ? "Ha" : lang === "en" ? "Yes" : lang === "ru" ? "Да" : "Ha"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Region;