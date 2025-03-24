import { useState, useEffect, useCallback } from "react";
import { banners_get } from "../../Services/general/banners";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function KitchenCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 768);

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
          setSlides(res);
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

  if (slides.length === 0) return <div>Loading...</div>;

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
            className="w-full sm:w-4/5 flex-shrink-0 relative px-1 sm:px-2"
          >
            <img
              src={`https://back.stroybazan1.uz${item.image}`}
              className="w-[94%] h-[190px] object-cover sm:w-[100%] rounded-[10px] sm:rounded-[0px] sm:h-[390px]"
              alt=""
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden sm:flex space-x-1 sm:bottom-1 sm:space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "cursor-pointer w-2 h-2 rounded-full transition-all sm:w-3 sm:h-3",
              currentSlide === index ? "bg-[#DCC38B] w-6 sm:w-8" : "bg-[#D5D5D5]"
            )}
          />
        ))}
      </div>
    </div>
  );
}
