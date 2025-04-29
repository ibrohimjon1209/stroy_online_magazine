"use client";

import { useState, useEffect, useCallback } from "react";
import { banners_get } from "../../Services/general/banners";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function KitchenCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 768);
  const [loadedImages, setLoadedImages] = useState({});
  const sl_option_id =
    localStorage.getItem("sl_option_nav") == "Story Baza №1"
      ? 0
      : localStorage.getItem("sl_option_nav") == "Giaz Mebel"
      ? 1
      : 2;

  useEffect(() => {
    const handleResize = () => setSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await banners_get();
        if (Array.isArray(res)) {
          setSlides(res.filter((item) => {
            return item.branch == sl_option_id;
          }));
          
        } else {
          console.error("Invalid data format", res);
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };
    fetchData();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [slides, nextSlide]);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  if (slides.length === 0) return <div></div>;

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  return (
    <div className="relative w-full h-auto mx-auto overflow-hidden mt-[20px] sm:h-[425px]">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: smallScreen
            ? `translateX(calc(-${(currentSlide + 1) * 100.5}% + 4.5%))`
            : `translateX(calc(-${(currentSlide + 1) * 80}% + 10%))`,
        }}
      >
        {extendedSlides.map((item, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-full px-1 sm:w-4/5 sm:px-2"
          >
            <div className="relative w-[94%] h-[190px] sm:w-[100%] sm:h-[390px]">
              <div
                className={`absolute inset-0 bg-gray-200 rounded-[10px] sm:rounded-[0px] transition-opacity duration-300 ${
                  loadedImages[index] ? "opacity-0" : "opacity-100"
                }`}
              />

              <img
                src={`https://back.stroybazan1.uz${item.image}`}
                className="w-full h-full object-cover rounded-[10px] sm:rounded-[0px]"
                alt=""
                onLoad={() => handleImageLoad(index)}
                style={{ opacity: loadedImages[index] ? 1 : 0 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute hidden space-x-1 -translate-x-1/2 bottom-2 left-1/2 sm:flex sm:bottom-1 sm:space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "cursor-pointer w-2 h-2 rounded-full transition-all sm:w-3 sm:h-3",
              currentSlide === index
                ? "bg-[#DCC38B] w-6 sm:w-8"
                : "bg-[#D5D5D5]"
            )}
          />
        ))}
      </div>
    </div>
  );
}
