import { useState, useEffect, useCallback } from "react";
import banner1 from "./Images/banner1.png";
import banner2 from "./Images/banner2.png";
import banner3 from "./Images/banner1.png";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function KitchenCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: banner1,
    },
    {
      image: banner2,
    },
    {
      image: banner3,
    }
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
    <div className="relative w-full h-[360px] mx-auto overflow-hidden mt-[30px]">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(calc(-${(currentSlide + 1) * 80}% + 10%))`,
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div
            key={index}
            className="w-full md:w-4/5 flex-shrink-0 relative px-2"
          >
            <img src={slide.image} alt="" />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "cursor-pointer w-3 h-3 rounded-full transition-all",
              currentSlide === index ? "bg-[#DCC38B] w-8" : "bg-[#D5D5D5]"
            )}
          />
        ))}
      </div>
    </div>
  );
}
