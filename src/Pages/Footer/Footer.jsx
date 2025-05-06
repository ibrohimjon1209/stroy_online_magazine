import React, { useEffect, useState } from "react";
import app_store from "./Images/app_store.jpg";
import google_play from "./Images/google_play.png";
import logo from "./Images/logo.png";
import telegram from "./Images/telegram.svg";
import youtube from "./Images/youtube.svg";
import apple from "./Images/apple.png";
import play from "./Images/play.png";
import instagram from "./Images/instagram.svg";
import { support_get } from "../../Services/general/support";

const Footer = ({ lang = "uz" }) => {
  const [media, set_media] = useState(null);
  const [support, set_support] = useState([]);
  const sl_option_id =
    localStorage.getItem("sl_option_nav") === "Stroy Baza №1"
      ? 0
      : localStorage.getItem("sl_option_nav") === "Giaz Mebel"
      ? 1
      : 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await support_get();
        const filtered = res.filter((item) => {
          return item.branch == sl_option_id;
        });
        set_support(filtered.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {
      console.error("Cleanup function ishladi");
    };
  }, []);

  useEffect(() => {
    fetch("https://back.stroybazan1.uz/api/api/social-media/latest/")
      .then((res) => res.json())
      .then((json) => {
        set_media(
          json.filter((item) => {
            return item.branch == sl_option_id;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const translations = {
    categories: {
      uz: "Kategoriyalar",
      en: "Category",
      ru: "Категории",
    },
    apps: {
      uz: "Ilovalar",
      en: "Apps",
      ru: "Приложения",
    },
    socialMedia: {
      uz: "Ijtimoiy tarmoqlar",
      en: "Social Media",
      ru: "Социальные сети",
    },
    haveQuestion: {
      uz: "Savolingiz bormi? Qo‘ng‘iroq qiling",
      en: "Have a question? Call us",
      ru: "Есть вопросы? Звоните",
    },
    menu: {
      home: { uz: "Bosh sahifa", en: "Home", ru: "Главная" },
      search: { uz: "Qidiruv", en: "Search", ru: "Поиск" },
      order: { uz: "Buyurtma", en: "Order", ru: "Заказ" },
      cart: { uz: "Savat", en: "Cart", ru: "Корзина" },
      profile: { uz: "Profil", en: "Profile", ru: "Профиль" },
      likes: { uz: "Yoqqanlar", en: "Likes", ru: "Избранное" },
    },
    payment: {
      installment: { uz: "Nasiya savdo", en: "Installment", ru: "Рассрочка" },
      about_product: {
        uz: "Maxsulot boyicha",
        en: "About the product",
        ru: "О товаре",
      },
      about_app: {
        uz: "Ilova bo'yicha",
        en: "About the app",
        ru: "О приложении",
      },
    },
  };

  return (
    <div className="w-full h-[315px] hidden sm:block bg-[#262928] pt-[40px] pl-[49px]">
      <div className="flex">
        <div className="flex gap-[90px]">
          <img src={logo} className="w-[77px] h-[54px]" alt="Logo" />
          <div className="flex flex-col gap-[20px]">
            <h1 className="font-inter font-[700] text-[20px] leading-[30px] text-[#FFFFFF]">
              {translations.categories[lang]}
            </h1>
            <div className="flex gap-[10px] text-[rgba(255,255,255,0.41)]">
              <div className="flex flex-col gap-[9px]">
                <h1>{translations.menu.home[lang]}</h1>
                <h1>{translations.menu.search[lang]}</h1>
                <h1>{translations.menu.order[lang]}</h1>
              </div>
              <div className="flex flex-col gap-[9px]">
                <h1>{translations.menu.cart[lang]}</h1>
                <h1>{translations.menu.profile[lang]}</h1>
                <h1>{translations.menu.likes[lang]}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-[70px]">
          <h1 className="font-inter font-[700] text-[20px] text-white">
            {translations.apps[lang]}
          </h1>
          <div className="flex flex-col gap-[27px] mt-[20px]">
            {[
              { img: apple, store: "App Store" },
              { img: play, store: "Google Play" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#111111] w-[151px] h-[37px] flex rounded-[3px] pt-[6px] pl-[10px]"
              >
                <img
                  src={item.img}
                  className="w-[20px] h-[21px] object-fill"
                  alt={item.store}
                />
                <div>
                  <h1 className="text-white text-[6px] ml-0.5">
                    {lang === "uz"
                      ? "Yuklab olish"
                      : lang === "en"
                      ? "Download"
                      : lang === "ru"
                      ? "Скачать"
                      : "Yuklab olish"}
                  </h1>
                  <h1 className="text-white text-[11px]">{item.store}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ml-[70px] flex flex-col gap-[20px]">
          <h1 className="font-inter font-[700] text-[20px] text-white">
            {translations.socialMedia[lang]}
          </h1>
          <div className="flex gap-[11px]">
            <img
              src={instagram}
              onClick={() => {
                window.open(media[0].instagram)
                
              }}
              className="cursor-pointer w-[37px] h-[37px] p-1 bg-[#111111] rounded-[3px]"
              alt="Social Icon"
            />
            <img
              src={telegram}
              onClick={() => {
                window.open(media[0].telegram)
              }}
              className="cursor-pointer w-[37px] h-[37px] p-1 bg-[#111111] rounded-[3px]"
              alt="Social Icon"
            />
            <img
              src={youtube}
              onClick={() => {
                window.open(media[0].youtube)
              }}
              className="cursor-pointer w-[37px] h-[37px] p-1 bg-[#111111] rounded-[3px]"
              alt="Social Icon"
            />
          </div>
        </div>
        <div className="ml-[111px] flex flex-col gap-[35px]">
          <h1 className="font-inter font-[700] text-[24px] text-[#FFFFFF]">
            {translations.haveQuestion[lang]}
          </h1>
          <div className="flex flex-col gap-[16px]">
            {support.map((item) => (
              <div
                key={item.id}
                className="flex flex-row justify-between items-center mr-15 gap-[35px]"
              >
                <h1 className="text-[#FFFFFF]">{item[`title_${lang}`]} :</h1>
                <h1 className="text-[#FFFFFF]">{item.phone_number}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[50px] w-full h-[53px] flex flex-col px-[76px]">
        <div className="h-[2px] bg-[rgba(118,109,109,0.57)] w-full"></div>
        <div className="flex items-center justify-center h-full">
          <h1 className="text-[rgba(255,255,255,0.81)]">
            © 2024 - 2025 STROY BAZA №1 (
            <a href="https://t.me/nsd_corporation" className="text-blue-400">
              Powered by NSD Co.
            </a>
            ) v1.00.0
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
