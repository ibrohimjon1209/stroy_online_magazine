"use client"

import { useState, useEffect } from "react"

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    // Sample placeholder slides (replace with actual images later)
    const slides = [
        { id: 1, color: "bg-yellow-400" },
        { id: 2, color: "bg-green-500" },
        { id: 3, color: "bg-red-500" },
        { id: 4, color: "bg-blue-500" },
    ]

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        }, 7000)

        return () => clearInterval(interval)
    }, [slides.length])

    // Calculate visible slides
    const getVisibleSlides = () => {
        const slidesArray = [...slides]
        // Add last slide to beginning and first slide to end for infinite effect
        return [...slidesArray.slice(-1), ...slidesArray, ...slidesArray.slice(0, 1)]
    }

    const visibleSlides = getVisibleSlides()
    const containerWidth = 1444 // Container width
    const slideWidth = 900 // Main slide width
    const peekAmount = (containerWidth - slideWidth) / 2 // Amount of adjacent slides to show

    return (
        <div className="w-full h-[500px] bg-yellow-500 mt-[30px]">
            {/* <div className="relative w-full overflow-hidden h-[450px] m-auto">
                <div
                    className="absolute left-[700px] right-1/2 -translate-x-1/2 flex transition-transform duration-1000 ease-in-out h-full"
                    style={{
                        width: `${visibleSlides.length * slideWidth}px`,
                        transform: `translateX(${-(currentSlide + 1) * slideWidth + peekAmount}px)`,
                    }}
                >
                    {visibleSlides.map((slide, index) => (
                        <div
                            key={`${slide.id}-${index}`}
                            className="relative h-full shrink-0"
                            style={{
                                width: `${slideWidth}px`,
                            }}
                        >
                            <div className={`absolute inset-4 rounded-2xl ${slide.color} shadow-lg`}>
                                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                                    <div className="bg-yellow-100 rounded-xl p-4 mb-4 w-full">
                                        <p className="text-black font-bold text-xl">STROY BAZA bilan uy qurush yanada oson</p>
                                    </div>
                                    <div className="bg-red-600 rounded-xl p-4 mb-4 w-full">
                                        <p className="text-white font-bold">Sizning qadriyatlaringiz maskani !</p>
                                    </div>
                                    <div className="bg-yellow-100 rounded-xl p-3 w-auto">
                                        <p className="text-black">Faqat 16-17-18-yanvar</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>


            </div> */}
        </div>
    )
}

export default Carousel

