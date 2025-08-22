import React from "react";
import phones from "./images/phones.png";
import qr_ex from "./images/qr_ex.png";
import appstore from "./images/appstore.png";
import googleplay from "./images/googleplay.png";

const Download_page = () => {
  const lang = localStorage.getItem("lang");
  return (
    <div className="hidden flex-row sm:flex gap-[126px] w-full sm:mb-12 pl-[190px] overflow-hidden h-[500px] bg-white">
      <img src={phones} alt="" className="scale-[120%]" />
      <div>
        <h1 className="text-[36px] uppercase font-semibold mt-10">
          {lang === "uz"
            ? "ilovani yuklang !"
            : lang === "ru"
            ? "Загрузите приложение !"
            : "Download the app !"}
        </h1>
        <p className="text-[32px] leading-[36px] mt-7 ">{ lang === "uz" ? "Haridlarni uydan chiqmagan holda mobil ilova orqali amalga oshiring!" : lang === "ru" ? "Совершайте покупки через мобильное приложение, не выходя из дома!" : "Buy products from the mobile app without leaving home!"}</p>
        <div className="mt-[30px] flex flex-row justify-between w-[660px]">
            <div className="flex justify-center w-[160px] flex-col items-center border-[4px] border-[#3138ff] rounded-[10px]  pt-4">
        <img src={googleplay} alt="" className="w-[60px] h-[60px] object-contain" />
        <img src={qr_ex} alt="" className="w-[160px] h-[160px] object-contain" />
            </div>
            <p className="text-[25px] text-center mt-7">{lang === "uz" ? "" : lang === "ru" ? "Отсканируйте камеру и" : "Scan the camera and"}<br />{lang == "uz" ? "Kamerani yo‘naltiring va" : lang == "ru" ? "скачайте приложение" : "download the app"}<br /><span className="font-bold">STROY BAZA №1</span><br />{lang == "uz" && "ilovasini bepul yuklang"}</p>
            <div className="flex justify-center w-[160px] flex-col items-center border-[4px] border-black rounded-[10px]  pt-4">
        <img src={appstore} alt="" className="w-[60px] h-[60px] object-contain" />
        <img src={qr_ex} alt="" className="w-[160px] h-[160px] object-contain" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Download_page;
