import { useState, useEffect, useCallback } from "react";
import banner1 from "./Images/banner1.png";
import banner2 from "./Images/banner2.png";
import banner3 from "./Images/banner1.png";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function KitchenCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const smallScreen = window.innerWidth < 768;

  const slides = [
    {
      image: banner1,
    },
    {
      image: banner2,
    },
    {
      image: banner3,
    },
  ];

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = prev + 1;
      if (next >= slides.length) {
        return 0;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-auto mx-auto overflow-hidden sm:mt-[20px] sm:h-[360px]">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: smallScreen ? `translateX(calc(-${(currentSlide + 1) * 100.5}% + 7%))` : `translateX(calc(-${(currentSlide + 1) * 80}% + 10%))`,
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div
            key={index}
            className="w-full sm:w-4/5 flex-shrink-0 relative px-1 sm:px-2"
          >
            <img
              src={slide.image}
              className="w-[90%] h-[165px] object-cover sm:w-[100%] rounded-[10px] sm:rounded-[0px] sm:h-full"
              alt=""
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden sm:flex space-x-1 sm:bottom-4 sm:space-x-2">
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
